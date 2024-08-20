const express = require('express');
const http = require('http');
const connectDB = require('./config/db'); // Import the database connection function
const initializeSocketIO = require('./config/notifications'); // Import Socket.IO initialization
const cors = require('cors');
const morgan = require('morgan'); // For logging requests
const helmet = require('helmet'); // For basic security
const rateLimit = require('express-rate-limit'); // For rate limiting
const dotenv = require('dotenv'); // To load environment variables

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Basic security
app.use(express.json()); // Parse JSON requests
app.use(morgan('combined')); // Log HTTP requests

// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Create an HTTP server and integrate Socket.IO
const server = http.createServer(app);
initializeSocketIO(server); // Initialize Socket.IO with the HTTP server

// // Define routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/rider', require('./routes/riderRoutes'));
app.use('/api/driver', require('./routes/driverRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/ride', require('./routes/rideRoutes'));
app.use('/api/rating', require('./routes/ratingRoutes'));

// Error handling middleware
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
