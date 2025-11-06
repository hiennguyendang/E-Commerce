require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { initDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/seller', require('./routes/seller')); // ← Seller routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'ShopeeeLike Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'E-Commerce API Server is running!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'The requested endpoint does not exist'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database connection
    await initDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log('');
      console.log('🎉 ===================================');
      console.log('🚀 SHOPEELIKE BACKEND SERVER STARTED');
      console.log('🎉 ===================================');
      console.log(`✅ Server running on port: ${PORT}`);
      console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
      console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('');
      console.log('📋 Available API Endpoints:');
      console.log('   • POST /api/auth/register - User registration');
      console.log('   • POST /api/auth/login - User login');
      console.log('   • GET  /api/auth/profile - Get user profile');
      console.log('   • GET  /api/products - Get all products');
      console.log('   • GET  /api/products/:id - Get single product');
      console.log('   • GET  /api/categories - Get all categories');
      console.log('   • GET  /api/cart - Get user cart');
      console.log('   • POST /api/cart/items - Add to cart');
      console.log('   • GET  /api/orders - Get user orders');
      console.log('   • POST /api/orders - Create new order');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;