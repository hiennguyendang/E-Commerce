// backend/config/db.js
import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // true nếu dùng Azure
    trustServerCertificate: true,
  },
};

export async function getPool() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error("Kết nối SQL Server thất bại:", err);
  }
}
