const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const morgan = require('morgan');

// Load environment variables
dotenv.config();
// morgan('tiny');

const app = express();

// Connect to database
connectDB();

// Middleware and routes
app.use(express.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing for frontend-backend communication
app.use(morgan('dev'));  // Logger for requests
app.use('/api/weather', require('./src/routes/weatherRoutes'));// Set the base path for weather-related API requests
app.use('/api/users', require('./src/routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
