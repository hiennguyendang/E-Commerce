const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// GET /api/admin/stats - Thống kê tổng quan hệ thống
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Tổng số users
    const [userCount] = await pool.execute(
      `SELECT COUNT(*) as total FROM user_account`
    );

    // Tổng số sellers
    const [sellerCount] = await pool.execute(
      `SELECT COUNT(*) as total FROM seller`
    );

    // Tổng số products
    const [productCount] = await pool.execute(
      `SELECT COUNT(*) as total FROM product WHERE is_active = 1`
    );

    // Tổng số orders
    const [orderCount] = await pool.execute(
      `SELECT COUNT(*) as total FROM \`order\``
    );

    // Tổng doanh thu
    const [revenue] = await pool.execute(
      `SELECT COALESCE(SUM(total_amount), 0) as total 
       FROM \`order\` 
       WHERE order_status IN ('pending', 'processing', 'shipped', 'delivered')`
    );

    // Orders theo trạng thái
    const [ordersByStatus] = await pool.execute(
      `SELECT order_status, COUNT(*) as count 
       FROM \`order\` 
       GROUP BY order_status`
    );

    res.json({
      users: userCount[0].total,
      sellers: sellerCount[0].total,
      products: productCount[0].total,
      orders: orderCount[0].total,
      revenue: revenue[0].total,
      ordersByStatus
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// GET /api/admin/users - Danh sách tất cả users
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', role = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT ua.user_id, ua.email, ua.user_name, ua.display_name, 
             ua.phone_number, ua.created_at,
             CASE 
               WHEN a.user_id IS NOT NULL THEN 'Admin'
               WHEN s.user_id IS NOT NULL THEN 'Seller'
               ELSE 'Buyer'
             END AS role,
             s.shop_name
      FROM user_account ua
      LEFT JOIN admin a ON ua.user_id = a.user_id
      LEFT JOIN seller s ON ua.user_id = s.user_id
      WHERE 1=1
    `;

    const params = [];

    if (search) {
      query += ` AND (ua.email LIKE ? OR ua.user_name LIKE ? OR ua.display_name LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (role) {
      if (role === 'Seller') {
        query += ` AND s.user_id IS NOT NULL`;
      } else if (role === 'Admin') {
        query += ` AND a.user_id IS NOT NULL`;
      } else if (role === 'Buyer') {
        query += ` AND s.user_id IS NULL AND a.user_id IS NULL`;
      }
    }

    query += ` ORDER BY ua.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [users] = await pool.execute(query, params);

    // Get total count
    let countQuery = `SELECT COUNT(*) as total FROM user_account ua
                      LEFT JOIN admin a ON ua.user_id = a.user_id
                      LEFT JOIN seller s ON ua.user_id = s.user_id
                      WHERE 1=1`;
    
    if (search) {
      countQuery += ` AND (ua.email LIKE ? OR ua.user_name LIKE ? OR ua.display_name LIKE ?)`;
    }
    
    if (role) {
      if (role === 'Seller') {
        countQuery += ` AND s.user_id IS NOT NULL`;
      } else if (role === 'Admin') {
        countQuery += ` AND a.user_id IS NOT NULL`;
      } else if (role === 'Buyer') {
        countQuery += ` AND s.user_id IS NULL AND a.user_id IS NULL`;
      }
    }

    const [totalResult] = await pool.execute(countQuery, params);

    res.json({
      users,
      total: totalResult[0].total,
      page: parseInt(page),
      totalPages: Math.ceil(totalResult[0].total / limit)
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// DELETE /api/admin/users/:id - Xóa user
router.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const userId = req.params.id;

    // Không cho xóa chính mình
    if (parseInt(userId) === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    await connection.beginTransaction();

    // Xóa seller record nếu có
    await connection.execute(`DELETE FROM seller WHERE user_id = ?`, [userId]);
    
    // Xóa admin record nếu có
    await connection.execute(`DELETE FROM admin WHERE user_id = ?`, [userId]);
    
    // Xóa buyer record nếu có
    await connection.execute(`DELETE FROM buyer WHERE user_id = ?`, [userId]);
    
    // Xóa user_account
    await connection.execute(`DELETE FROM user_account WHERE user_id = ?`, [userId]);

    await connection.commit();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  } finally {
    connection.release();
  }
});

// GET /api/admin/sellers - Danh sách sellers (có thể dùng để approve)
router.get('/sellers', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [sellers] = await pool.execute(
      `SELECT s.user_id, s.shop_name, s.business_email, s.business_phone,
              s.tax_id, s.business_license_number, s.created_at,
              ua.email, ua.user_name, ua.display_name,
              COUNT(DISTINCT p.product_id) as product_count,
              COALESCE(SUM(oi.quantity * oi.price), 0) as total_revenue
       FROM seller s
       JOIN user_account ua ON s.user_id = ua.user_id
       LEFT JOIN product p ON s.user_id = p.seller_id AND p.is_active = 1
       LEFT JOIN product_variant pv ON p.product_id = pv.product_id
       LEFT JOIN order_item oi ON pv.product_variant_id = oi.product_variant_id
       GROUP BY s.user_id
       ORDER BY s.created_at DESC`
    );

    res.json(sellers);
  } catch (error) {
    console.error('Get sellers error:', error);
    res.status(500).json({ error: 'Failed to get sellers' });
  }
});

// GET /api/admin/products - Quản lý tất cả sản phẩm
router.get('/products', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', active = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.product_id, p.product_name, p.description, p.is_active, p.created_at,
             s.shop_name, ua.display_name as seller_name,
             COUNT(DISTINCT pv.product_variant_id) as variant_count,
             MIN(pv.price) as min_price,
             MAX(pv.price) as max_price,
             SUM(pv.stock_quantity) as total_stock
      FROM product p
      JOIN seller s ON p.seller_id = s.user_id
      JOIN user_account ua ON s.user_id = ua.user_id
      LEFT JOIN product_variant pv ON p.product_id = pv.product_id
      WHERE 1=1
    `;

    const params = [];

    if (search) {
      query += ` AND p.product_name LIKE ?`;
      params.push(`%${search}%`);
    }

    if (active !== '') {
      query += ` AND p.is_active = ?`;
      params.push(active === '1' ? 1 : 0);
    }

    query += ` GROUP BY p.product_id ORDER BY p.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [products] = await pool.execute(query, params);

    res.json(products);
  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({ error: 'Failed to get products' });
  }
});

// PUT /api/admin/products/:id/toggle - Ẩn/hiện sản phẩm
router.put('/products/:id/toggle', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const productId = req.params.id;

    await pool.execute(
      `UPDATE product SET is_active = NOT is_active WHERE product_id = ?`,
      [productId]
    );

    res.json({ message: 'Product status updated' });
  } catch (error) {
    console.error('Toggle product error:', error);
    res.status(500).json({ error: 'Failed to toggle product status' });
  }
});

// DELETE /api/admin/products/:id - Xóa sản phẩm (hard delete)
router.delete('/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const productId = req.params.id;

    await connection.beginTransaction();

    // Xóa các bảng liên quan
    await connection.execute(`DELETE FROM product_image WHERE product_id = ?`, [productId]);
    await connection.execute(`DELETE FROM product_category WHERE product_id = ?`, [productId]);
    await connection.execute(`DELETE FROM product_variant WHERE product_id = ?`, [productId]);
    await connection.execute(`DELETE FROM product WHERE product_id = ?`, [productId]);

    await connection.commit();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  } finally {
    connection.release();
  }
});

// GET /api/admin/orders - Quản lý tất cả đơn hàng
router.get('/orders', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status = '', page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT o.order_id, o.total_amount, o.order_status, o.created_at,
             ua.email, ua.display_name as customer_name,
             sa.city, sa.district,
             COUNT(DISTINCT oi.order_item_id) as item_count
      FROM \`order\` o
      JOIN user_account ua ON o.user_id = ua.user_id
      LEFT JOIN shipping_address sa ON o.shipping_address_id = sa.shipping_address_id
      LEFT JOIN order_item oi ON o.order_id = oi.order_id
      WHERE 1=1
    `;

    const params = [];

    if (status) {
      query += ` AND o.order_status = ?`;
      params.push(status);
    }

    query += ` GROUP BY o.order_id ORDER BY o.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [orders] = await pool.execute(query, params);

    res.json(orders);
  } catch (error) {
    console.error('Get admin orders error:', error);
    res.status(500).json({ error: 'Failed to get orders' });
  }
});

// PUT /api/admin/orders/:id/status - Cập nhật trạng thái đơn hàng
router.put('/orders/:id/status', [
  authenticateToken,
  requireAdmin,
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const orderId = req.params.id;
    const { status } = req.body;

    await pool.execute(
      `UPDATE \`order\` SET order_status = ? WHERE order_id = ?`,
      [status, orderId]
    );

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// POST /api/admin/make-admin/:userId - Cấp quyền admin cho user
router.post('/make-admin/:userId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if user exists
    const [users] = await pool.execute(
      `SELECT user_id FROM user_account WHERE user_id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already admin
    const [admins] = await pool.execute(
      `SELECT user_id FROM admin WHERE user_id = ?`,
      [userId]
    );

    if (admins.length > 0) {
      return res.status(400).json({ error: 'User is already an admin' });
    }

    // Make admin
    await pool.execute(
      `INSERT INTO admin (user_id) VALUES (?)`,
      [userId]
    );

    res.json({ message: 'User promoted to admin successfully' });
  } catch (error) {
    console.error('Make admin error:', error);
    res.status(500).json({ error: 'Failed to make user admin' });
  }
});

module.exports = router;