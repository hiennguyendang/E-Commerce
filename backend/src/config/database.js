require('dotenv').config();
const mysql = require('mysql2/promise');

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'shopeelike',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    // Debug: Log database configuration
    console.log('🔍 Database Config Debug:');
    console.log('   DB_HOST:', process.env.DB_HOST || 'NOT SET');
    console.log('   DB_USER:', process.env.DB_USER || 'NOT SET');
    console.log('   DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'NOT SET');
    console.log('   DB_NAME:', process.env.DB_NAME || 'NOT SET');
    
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database connection
const initDatabase = async () => {
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('Failed to connect to database. Please check your configuration.');
    process.exit(1);
  }
};

module.exports = {
  pool,
  testConnection,
  initDatabase
};