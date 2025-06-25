const User=require('../models/userModal')
const generateOTP=require('../utils/generateOTP')
const sendMail=require('../utils/sendMail')
exports.signup = async (req, res) => {
  try {
    console.log('entered middle');

    const { email,name,password,mobileNo } = req.body
    const existing = await User.findOne({ email });
 
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const otp = generateOTP();
    await sendMail(email, otp);

    const user = new User({ email, name,password,mobileNo,otp });
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

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    user.isVerified = true;
    user.otp = undefined; // Clear OTP
    await user.save();

    res.status(200).json({ message: 'OTP verified. User registered successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Verification failed', error: err.message });
  }
};
