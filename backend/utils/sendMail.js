const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "Gmail", // or "Yahoo", "Outlook", etc.
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password (not your actual email password)
  },
});

const sendMail = async (email, otp) => {
  console.log(`Sending OTP ${otp} to ${email}`);

  
  // Replace with nodemailer/sendgrid/resend later

   const mailOptions = {
    from: `"Gadjetify" <${process.env.EMAIL_USER}>`,
    to:email ,
    subject: 'otp for signup',
    text:otp,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", to);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }

  
};

module.exports = sendMail;
