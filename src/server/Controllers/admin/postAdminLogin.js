const db = require("../../db/db");
const jwt = require("jsonwebtoken");
const postAdminLogin = (req, res) => {
  // Trích xuất email và mật khẩu từ phần thân yêu cầu
  const { email, password } = req.body;
  const { serialize } = require("cookie");

  db.query(
    // Truy vấn cơ sở dữ liệu để kiểm tra xem có admin với email và mật khẩu đã cung cấp không
    "SELECT * FROM admin WHERE admin_email = ? AND admin_password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error("Lỗi sai email hoặc pass: " + err);
        res.status(500).json({ message: "Lỗi truy vấn CSDL." });
        return;
      }
      // Nếu không tìm thấy admin với thông tin đăng nhập cung cấp
      if (result.length === 0) {
        return res
          .status(401)
          .json({ message: "Email hoặc mật khẩu không chính xác." });
      } else {
        // Admin với thông tin đăng nhập đúng được tìm thấy
        const admin = result[0];

        const secretKey = "your-secret-key"; // Thay thế bằng khóa bí mật thực tế của bạn để sử dụng trong production
        const expiresIn = "6h";

        const header = {
          alg: "HS256", // Thuật toán được sử dụng cho chữ ký, trong trường hợp này là HMAC SHA-256
          typ: "JWT", // Type of token
        };

        const payload = {
          adminId: admin.admin_id,
          email: admin.admin_email,
        };

        //Tạo token
        const token = jwt.sign(payload, secretKey, { expiresIn, header });

     
        //Tạo cookie và đặt giá trị là token
        // const cookieOptions = {
        //   httpOnly: true,
        //   maxAge: expiresIn,
        // };

        // const cookieSerialized = serialize("token", token, cookieOptions);

        // Trả token trực tiếp trong phản hồi JSON
        res.status(200).json({ token, message: "Thành công" });
      }
    }
  );
};

module.exports = {
  postAdminLogin,
};
