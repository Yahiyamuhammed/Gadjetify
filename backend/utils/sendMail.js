const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (email, otp) => {
  console.log(`Sending OTP ${otp} to ${email}`);

  const mailOptions = {
    from: `"Gadjetify" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "otp for signup",
    text: otp,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", email);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = sendMail;
