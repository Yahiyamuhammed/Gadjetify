const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // To read .env file

const app = express();

const {signup}=require('./controllers/authController')
const authRoutes = require('./routes/authRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const adminUserRoutes=require('./routes/adminUserRoute')
const adminProductRoutes=require('./routes/adminProductRoutes')


// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSONa

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin', adminUserRoutes);
app.use('/api/admin', adminProductRoutes);



// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected'))
.catch((err) => console.error(' MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
