const User=require('../models/userModal')

exports.signup = async (req, res) => {
  try {
    console.log('entered middle');

    const { email,name,password,mobileNo } = req.body
    const existing = await User.findOne({ email });
 
    if (existing) return res.status(400).json({ message: 'User already exists' });

    // const otp = generateOTP();
    // await sendMail(email, otp);

    const user = new User({ email, name,password,mobileNo });
    await user.save();
    console.log('saved');
    
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};