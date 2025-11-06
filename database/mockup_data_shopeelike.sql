-- ============================================
-- MOCKUP DATA FOR SHOPEELIKE (NEW SCHEMA)
-- ============================================
USE shopeelike;

-- Shipping services (ensure at least one)
INSERT INTO shipping_service (carrier, service_name, est_days_min, est_days_max, base_fee, per_kg_fee)
VALUES ('DefaultCarrier', 'Standard', 2, 5, 0, 0)
ON DUPLICATE KEY UPDATE carrier = VALUES(carrier);

-- Categories
INSERT INTO category (name, description)
VALUES 
  ('Electronics', 'Devices and gadgets'),
  ('Fashion', 'Clothing and accessories'),
  ('Home & Living', 'Furniture and decor')
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- Create a seller account and seller profile
-- Password hash: bcrypt $2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq (same as previous seed)
INSERT INTO user_account (email, password_hash, display_name, user_name, phone_number, date_of_birth)
VALUES ('seller1@demo.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Tech Store', 'techstore', '+84901111111', '1990-01-01')
ON DUPLICATE KEY UPDATE display_name = VALUES(display_name);

-- Create seller row (auto-generate seller_id via trigger)
INSERT INTO seller (seller_id, user_id, shop_name, tax_id)
VALUES (NULL, (SELECT user_id FROM user_account WHERE email = 'seller1@demo.com'), 'Tech Store', 'TAX123456')
ON DUPLICATE KEY UPDATE tax_id = VALUES(tax_id);

-- Products for the seller
INSERT INTO product (seller_id, title, description, status)
VALUES 
  ((SELECT seller_id FROM seller WHERE shop_name = 'Tech Store'), 'Sample Phone X', 'A modern smartphone', 'Active'),
  ((SELECT seller_id FROM seller WHERE shop_name = 'Tech Store'), 'Lightweight Laptop 13"', 'Portable productivity laptop', 'Active'),
  ((SELECT seller_id FROM seller WHERE shop_name = 'Tech Store'), 'Noise-canceling Headphones', 'Immersive sound experience', 'Active');

-- Map products to categories
INSERT INTO product_category (product_id, category_id)
SELECT p.product_id, c.category_id FROM product p, category c 
WHERE p.title = 'Sample Phone X' AND c.name = 'Electronics'
ON DUPLICATE KEY UPDATE product_category.product_id = product_category.product_id;
INSERT INTO product_category (product_id, category_id)
SELECT p.product_id, c.category_id FROM product p, category c 
WHERE p.title = 'Lightweight Laptop 13"' AND c.name = 'Electronics'
ON DUPLICATE KEY UPDATE product_category.product_id = product_category.product_id;
INSERT INTO product_category (product_id, category_id)
SELECT p.product_id, c.category_id FROM product p, category c 
WHERE p.title = 'Noise-canceling Headphones' AND c.name = 'Electronics'
ON DUPLICATE KEY UPDATE product_category.product_id = product_category.product_id;

-- Variants
INSERT INTO product_variant (product_id, variant_code, sku, list_price, stock_qty, is_active)
SELECT product_id, 'DEFAULT', 'SPX-001', 5990000, 20, TRUE FROM product WHERE title = 'Sample Phone X'
ON DUPLICATE KEY UPDATE list_price = VALUES(list_price), stock_qty = VALUES(stock_qty);
INSERT INTO product_variant (product_id, variant_code, sku, list_price, stock_qty, is_active)
SELECT product_id, 'DEFAULT', 'LL13-001', 18990000, 10, TRUE FROM product WHERE title = 'Lightweight Laptop 13"'
ON DUPLICATE KEY UPDATE list_price = VALUES(list_price), stock_qty = VALUES(stock_qty);
INSERT INTO product_variant (product_id, variant_code, sku, list_price, stock_qty, is_active)
SELECT product_id, 'DEFAULT', 'NCH-001', 2990000, 30, TRUE FROM product WHERE title = 'Noise-canceling Headphones'
ON DUPLICATE KEY UPDATE list_price = VALUES(list_price), stock_qty = VALUES(stock_qty);

-- Images (primary image per product)
INSERT INTO product_image (product_id, url, caption)
SELECT product_id, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600', 'Sample Phone X' FROM product WHERE title = 'Sample Phone X';
INSERT INTO product_image (product_id, url, caption)
SELECT product_id, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600', 'Lightweight Laptop 13"' FROM product WHERE title = 'Lightweight Laptop 13"';
INSERT INTO product_image (product_id, url, caption)
SELECT product_id, 'https://images.unsplash.com/photo-1518443895914-6b0f0d6f58f2?w=600', 'Noise-canceling Headphones' FROM product WHERE title = 'Noise-canceling Headphones';

-- Optional: create demo buyer (password hash same as above). You can also simply register via API instead.
-- INSERT INTO user_account (email, password_hash, display_name, user_name, phone_number, date_of_birth)
-- VALUES ('buyer1@demo.com', '$2a$12$LQv3c1yqBw1uWFlE6qs6Zu5lUyED8VZl5.Q6A9a8BQ4QGCWw8a1nq', 'Minh Nguyen', 'minhnguyen', '+84911111111', '1992-02-02');
-- INSERT INTO buyer (user_id) SELECT user_id FROM user_account WHERE email = 'buyer1@demo.com';

-- You can also prefill a cart for the buyer above if you uncomment it.
-- INSERT INTO cart (buyer_id, status) SELECT user_id, 'Active' FROM user_account WHERE email = 'buyer1@demo.com';
-- INSERT INTO cart_item (cart_id, product_id, variant_code, qty)
-- SELECT (SELECT cart_id FROM cart WHERE buyer_id = (SELECT user_id FROM user_account WHERE email = 'buyer1@demo.com') ORDER BY cart_id DESC LIMIT 1),
--        (SELECT product_id FROM product WHERE title = 'Sample Phone X'), 'DEFAULT', 1;
