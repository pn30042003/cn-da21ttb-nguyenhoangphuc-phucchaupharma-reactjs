require('dotenv').config(); // Đặt ở đầu file để load biến môi trường từ file .env
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger');

var indexRouter = require("./routes/index");
var productsRouter = require("./routes/products");

var cartRouter = require("./routes/cart");
var order = require("./routes/order");
var admin = require("./routes/admin");

const cors = require("cors");

var app = express();

app.use(cors({ origin: `http://${process.env.REACT_CORS}`, credentials: true }));

app.use(cookieParser());


app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: new session.Cookie({
      secure: false, // Chỉ đặt true khi sử dụng HTTPS
      maxAge: 3600000, // Ví dụ: 1 giờ (3600 giây)
      // httpOnly: , // Ngăn chặn truy cập từ JavaScript
    }),
    store: new session.MemoryStore(),
   
  })
);


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
// Kích hoạt CORS cho tất cả các tài nguyên

// Swagger Documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "PhucChau Pharma API Docs"
}));

//router

app.use("/", indexRouter);
app.use("/cart", cartRouter);
app.use("/products", productsRouter);
app.use("/order", order);
app.use("/admin", admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
