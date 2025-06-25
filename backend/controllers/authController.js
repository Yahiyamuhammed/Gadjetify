const User=require('../models/userModal')
const generateOTP=require('../utils/generateOTP')
const sendMail=require('../utils/sendMail')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 


exports.signup = async (req, res) => {
  try {
    console.log('entered middle');

    const { email,name,password,mobileNo } = req.body
    const existing = await User.findOne({ email });
 
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const otp = generateOTP();
    await sendMail(email, otp);
    const otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000); 
     const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, name,password:hashedPassword,mobileNo,otp ,otpExpiresAt});
    await user.save();
    console.log('saved');
    
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};
exports.verifyOtp = async (req, res) => {

  const { email, otp } = req.body || {}
   if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

    // 🔥 Check if OTP is expired
  if (user.otpExpiresAt && new Date() > user.otpExpiresAt) {
     user.otp = undefined; // Clear OTP
    user.otpExpiresAt=undefined
    await user.save();
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }


    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    user.isVerified = true;
    user.otp = undefined; // Clear OTP
    user.otpExpiresAt=undefined
    await user.save();

    res.status(200).json({ message: 'OTP verified. User registered successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Verification failed', error: err.message });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: 'User not found' });

    // if (user.isVerified)
    //   return res.status(400).json({ message: 'User already verified' });

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now

    // Update user
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // Send new OTP via email
    await sendMail(email, otp);

    res.status(200).json({ message: 'New OTP sent to your email' });

  } catch (err) {
    res.status(500).json({ message: 'Failed to resend OTP', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    

    const user = await User.findOne({ email });
    
    

    if (!user) return res.status(400).json({ message: 'User not found' });
    if (!user.isVerified) return res.status(401).json({ message: 'User not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET ,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        name: user.name,
        mobileNo: user.mobileNo
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};