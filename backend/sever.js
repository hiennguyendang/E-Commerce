import express from "express";
import cors from "cors";
import { getPool } from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test kết nối
app.get("/api/test", async (req, res) => {
  const pool = await getPool();
  const result = await pool.request().query("SELECT GETDATE() AS ServerTime");
  res.json({ success: true, serverTime: result.recordset[0].ServerTime });
});

// ✅ Lấy danh sách sản phẩm
app.get("/api/products", async (req, res) => {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT TOP 20 p.product_id, p.title, p.description, v.price
    FROM product p
    LEFT JOIN product_variant v ON p.product_id = v.product_id
  `);
  res.json(result.recordset);
});

app.listen(process.env.PORT, () =>
  console.log(`✅ Server chạy tại http://localhost:${process.env.PORT}`)
);
