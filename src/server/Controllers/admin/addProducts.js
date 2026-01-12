const express = require("express");
const router = express.Router();
const db = require("../../db/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addProduct = (req, res) => {
  try {
    upload.single("image1")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: "Lỗi upload ảnh" });
      } else if (err) {
        return res.status(500).json({ error: "Unknown error uploading image" });
      }

      const { name, description, price, category, unit, quantity } =
        req.body;

        
      const image1 = `/${req.file.filename}`;


      const result = db.query(
        `INSERT INTO products (name, description, price, image1, category, unit, quantity) 
        VALUES ('${name}', '${description}', ${price}, '${image1}', '${category}', '${unit}', ${quantity})`
      );

      res.status(201).json({
        message: "Thêm sản phẩm thành công!",
        productId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Thêm sản phẩm thất bại!" });
  }
};

module.exports = {
  addProduct,
};
