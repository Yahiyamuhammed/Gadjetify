const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // To read .env file

const app = express();

const {signup}=require('./controllers/authController')

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Sample route to test
app.post('/signup',signup, (req, res) => {
    console.log('enterd /');
    
  res.send('API is working 🚀');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
