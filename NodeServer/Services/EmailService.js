var nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../Config.env" });
const Mail = {
  async(Email, Content) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EmailSender,
        pass: process.env.PassSender,
      },
    });
    var mailOptions = {
      from: process.env.EmailSender,
      to: Email,
      subject: "Active Your Accout",
      text: Content,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
module.exports = Mail;
