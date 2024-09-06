const app = require('./src/app');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
