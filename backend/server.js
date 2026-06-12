const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// .env ෆයිල් එක load කිරීම
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON data handle කරන්න

// Database එක සම්බන්ධ කිරීම
connectDB();

// Basic Route එකක් (ටෙස්ට් කරලා බලන්න)
app.get('/', (req, res) => {
  res.send('House Workers App Backend is running successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});