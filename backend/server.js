const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect to database
connectDB();

// Middleware and routes
app.use(express.json());
app.use('/api/weather', require('./src/routes/weatherRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
