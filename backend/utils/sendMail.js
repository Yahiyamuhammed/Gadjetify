const sendMail = async (email, otp) => {
  console.log(`Sending OTP ${otp} to ${email}`);
  // Replace with nodemailer/sendgrid/resend later
};

module.exports = sendMail;
