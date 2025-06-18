const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shop_system",
});

app.get("/api/products", (req, res) => {
  const table = req.query.table;
  const type = req.query.type;
  const subtype = req.query.subtype;
  const allowedTables = ["products"];
  if (!allowedTables.includes(table)) {
    return res.json([]);
  }

  let sql = `SELECT id, name, price, img, type, subtype FROM \`${table}\``;
  const params = [];
  if (type && subtype) {
    sql += " WHERE type = ? AND subtype = ?";
    params.push(type, subtype);
  } else if (type) {
    sql += " WHERE type = ?";
    params.push(type);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.json([]);
    res.json(results);
  });
});

app.get("/api/favorites", (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.json([]);
  db.query(
    `SELECT f.product_id as id, p.name, p.img
     FROM favorites f
     JOIN products p ON f.product_id = p.id
     WHERE f.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

app.post("/api/favorites", (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) return res.status(400).json({ error: "缺少參數" });
  db.query(
    "INSERT INTO favorites (user_id, product_id) VALUES (?, ?)",
    [userId, productId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
    }
  );
});

app.delete("/api/favorites", (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId)
    return res.json({ success: false, error: "缺少參數" });
  db.query(
    "DELETE FROM favorites WHERE user_id = ? AND product_id = ?",
    [userId, productId],
    (err, result) => {
      if (err) return res.json({ success: false, error: err });
      res.json({ success: true });
    }
  );
});

app.get("/api/cart", (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.json([]);
  db.query(
    `SELECT c.product_id as id, p.name, p.img, p.price
     FROM cart_items c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

app.post("/api/cart", (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) return res.status(400).json({ error: "缺少參數" });
  db.query(
    `INSERT INTO cart_items (user_id, product_id) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE product_id = product_id`,
    [userId, productId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
    }
  );
});

app.delete("/api/cart", (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId)
    return res.json({ success: false, error: "缺少參數" });
  db.query(
    "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
    [userId, productId],
    (err, result) => {
      if (err) return res.json({ success: false, error: err });
      res.json({ success: true });
    }
  );
});

app.listen(3000, () => console.log("Server running on port 3000"));
