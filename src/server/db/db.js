const mysql = require("mysql2");

// Sử dụng biến môi trường để cấu hình kết nối
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "thewings21092003",
  database: process.env.DB_DATABASE || "sneakerstore",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.log(`Error connecting to MySQL: ${err}`);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;



