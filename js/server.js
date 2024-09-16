// server.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'ecomuser',
  password: 'ecompassword',
  database: 'ecomdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Serve static files from 'public' directory
app.use(express.static('public'));

// API endpoint to fetch products
app.get('/api/products', (req, res) => {
  pool.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
