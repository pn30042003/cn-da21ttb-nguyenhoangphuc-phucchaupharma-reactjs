const { sendEmail } = require("../email/emailService");
const db = require("../db/db");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");
const moment = require("moment-timezone");

const postOrder = (req, res) => {
  const orderData = req.body;
  db.beginTransaction((err) => {
    if (err) {
      handleError(res, "Lỗi khi bắt đầu giao dịch: " + err, 500);
      return;
    }
    handleCustomer(orderData, res);
  });
};
// XỬ LÍ THÔNG TIN KHÁCH HÀNG //
const handleCustomer = (orderData, res) => {
  const Address = `${orderData.customerInfo.ward}, ${orderData.customerInfo.district}, ${orderData.customerInfo.province}`;
  let customerId;

  db.query(
    "SELECT customer_id FROM customer WHERE fullname = ? AND email = ? AND phone_number = ? AND address = ?",
    [
      orderData.customerInfo.fullName,
      orderData.customerInfo.email,
      orderData.customerInfo.phone,
      Address,
    ],
    (err, results) => {
      if (err) {
        handleError(res, "Lỗi khi kiểm tra khách hàng tồn tại: " + err, 500);
        db.rollback();
        return;
      }
      if (results.length > 0) {
        customerId = results[0].customer_id;
        handleOrder(orderData, res, customerId); //Khách hàng đã tồn tại thì lấy id để Order
      } else {
        insertNewCustomer(orderData, res, Address); // Khách hàng chưa tồn tại thì thêm vào
      }
    }
  );
};
// THÊM KHÁCH HÀNG NẾU CHƯA KHÁCH HÀNG CHƯA CÓ TRONG BẢNG CUSTOMER//
const insertNewCustomer = (orderData, res, Address) => {
  db.query(
    "INSERT INTO customer (fullname, email, phone_number, address) VALUES (?, ?, ?, ?)",
    [
      orderData.customerInfo.fullName,
      orderData.customerInfo.email,
      orderData.customerInfo.phone,
      Address,
    ],
    (err, results) => {
      if (err) {
        handleError(res, "Lỗi khi thêm thông tin khách hàng: " + err, 500);
        db.rollback();
        return;
      }
      handleOrder(orderData, res, results.insertId); //Lấy id khách hàng vừa thêm để Order
    }
  );
};
//XỬ LÍ ORDER//
const handleOrder = (orderData, res, customerId) => {
  const currentDate = getCurrentDate();
  const paymentId = orderData.paymentMethod == "cod" ? 1 : 2;

  db.query(
    `INSERT INTO orders (customer_id, order_date, order_status, total, order_note, payment_id)
    VALUES (${customerId}, '${currentDate}', 'Đang xử lý', ${orderData.total_product_cart}, '${orderData.note}', ${paymentId})`,
    (err, results) => {
      if (err) {
        handleError(res, "Lỗi khi thêm thông tin đơn hàng: " + err, 500);
        db.rollback();
        return;
      }
      const orderId = results.insertId;
      insertOrderDetails(orderData, res, orderId, customerId); // Lấy mã Order để truyền vào order_detail
    }
  );
};
//XỬ LÍ ORDER DETAIL//
const insertOrderDetails = (orderData, res, orderId, customerId) => {
  const products = orderData.products; // Danh sách products đặt
  const values = products.map((product) => [
    orderId,
    product.productId,
    product.quantity,
    orderData.total_product_cart,
  ]);

  db.query(
    "INSERT INTO order_details (order_id, product_id, quantity, total_amount_product) VALUES ?",
    [values],
    (err) => {
      if (err) {
        handleError(
          res,
          "Lỗi khi thêm thông tin chi tiết đơn hàng: " + err,
          500
        );
        db.rollback();
        return;
      }
      updateProductQuantities(products, orderData, res, orderId, customerId);
      console.log("akdskljdklsj");
    }
  );
};
// TRỪ SỐ LƯỢNG SẢN PHẨM TRONG KHO SAU KHI ĐẶT //
const updateProductQuantities = async (
  products,
  orderData,
  res,
  orderId,
  customerId
) => {
  let allProductsAvailable = true;
  const updateProductPromises = products.map((product) => {
    return new Promise((resolve, reject) => {
      const productId = product.productId;
      const newQuantity = product.quantity;
      db.query(
        "UPDATE products SET quantity = quantity - ? WHERE product_id = ?",
        [newQuantity, productId],
        (err) => {
          if (err) {
            reject(err);
          }
          checkRemainingQuantity(productId, res, (hasNegativeQuantity) => {
            if (hasNegativeQuantity) {
              allProductsAvailable = false;
              reject("Sản đã hết hoặc không đủ số lượng!");
            }
            resolve();
          });
        }
      );
    });
  });

  try {
    await Promise.all(updateProductPromises); //Promise.all sẽ đợi tất cả các Promises trong updateProductPromises hoàn thành.
    if (allProductsAvailable === true) {
      commitTransaction(res, orderData, orderId, customerId);
    }
  } catch (error) {
    handleError(res, error, 500);
    db.rollback();
  }
};

// KIỂM TRA SỐ LƯỢNG SAU KHI TRỪ CÓ ÂM KHÔNG //
const checkRemainingQuantity = (productId, res, callback) => {
  db.query(
    "SELECT quantity FROM products WHERE product_id = ?",
    [productId],
    (err, result) => {
      if (err) {
        handleError(res, "Lỗi khi kiểm tra số lượng sản phẩm: " + err, 500);
        db.rollback();
        return;
      }
      const remainingQuantity = result[0].quantity;
      callback(remainingQuantity < 0); //callback nè
    }
  );
};
// SAU KHI HOÀN TẤT THÌ TIẾN HÀNH COMMIT //
const commitTransaction = (res, orderData, orderId, customerId) => {
  db.commit((err) => {
    if (err) {
      handleError(res, "Lỗi khi commit giao dịch: " + err, 500);
      db.rollback();
      return;
    }
    sendOrderConfirmationEmail(res, orderData, orderId);
  });
};
// CẤU HÌNH VÀ GỬI MAIL CHO KHÁCH //
const sendOrderConfirmationEmail = (res, orderData, orderId) => {
  const templatePath = path.join("views", "email-template.hbs"); //Từ folder views
  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const template = handlebars.compile(templateSource);

  //Map ra sản phẩm bỏ vào template
  const productTemplate = orderData.products.map((product) => {
    return {
      productName: product.productName,
      productImage: product.productImage,
      quantity: product.quantity,
      unit: product.unit,
      price: formatCurrency(product.price),
      total_amount_product: formatCurrency(product.total_amount_product),
    };
  });

  //Nội dung trong bỏ vào template mail
  const templateData = {
    date: getCurrentDate(),
    orderId: orderId,
    customter: orderData.customerInfo,
    products: productTemplate,
    total_product_cart: formatCurrency(orderData.total_product_cart),
    note: orderData.note,
  };

  const htmlContent = template(templateData);
  //Cấu hình mail của server gửi dến khách
  const mailOptions = {
    from: "dinhtri.21092003@gmail.com",
    to: orderData.customerInfo.email,
    subject: "Xác nhận đơn hàng",
    html: htmlContent,
  };
  sendEmail(mailOptions); // Gửi mail
  //Thông báo đặt hàng thành công
  res.status(200).json({
    success: true,
    message:
      "Đơn hàng của bạn đã được đặt thành công! Vui lòng kiểm tra email của bạn để nhận thông tin chi tiết về đơn hàng.",
  });
};
//HÀM SỬ BÁO LỖI CLIENT//
const handleError = (res, message, statusCode) => {
  console.error(message);
  db.rollback();
  res.status(statusCode).json({ error: message });
};
//HÀM LẤY NGÀY GIỜ HIỆN TẠI ĐỂ POST ORDER//
const getCurrentDate = () => {
  return moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
};
//HÀM FORMAT TIỀN //
const formatCurrency = (amount) => {
  return Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

module.exports = {
  postOrder,
};
