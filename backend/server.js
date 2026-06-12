const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

app.use('/api/auth', require('./routes/authRoutes'));

connectDB();

app.get('/', (req, res) => {
  res.send('House Workers App Backend is running successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});