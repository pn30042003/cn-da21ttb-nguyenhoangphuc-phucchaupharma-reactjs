const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "dinhtri.21092003@gmail.com",
    pass: "uftm caij cvpk vgdi",
  },
});

function sendEmail(options) {
  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendEmail };
