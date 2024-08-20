const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Define log directory and file path
const logDirectory = path.join(__dirname, '../logs');
const logFilePath = path.join(logDirectory, 'access.log');

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

// Create a write stream (in append mode) for logging
const logFileStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Morgan middleware setup for logging
const loggerMiddleware = morgan('combined', { stream: logFileStream });

// Optionally, add logging to console for development
const consoleLoggerMiddleware = morgan('dev');

module.exports = (app) => {
    if (process.env.NODE_ENV === 'development') {
        // Use console logging in development
        app.use(consoleLoggerMiddleware);
    }

    // Use file logging in all environments
    app.use(loggerMiddleware);
};
