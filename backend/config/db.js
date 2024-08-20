const mongoose = require('mongoose');

// Define the connection string (you can use an environment variable for this)
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            // No need for useNewUrlParser and useUnifiedTopology
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
};

// Export the connection function
module.exports = connectDB;
