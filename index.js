// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
