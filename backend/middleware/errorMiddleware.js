// Error handling middleware for development
const developmentErrorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    });
};

// Error handling middleware for production
const productionErrorHandler = (err, req, res, next) => {
    if (err.isOperational) {
        // Operational error, send a clean message
        res.status(err.status || 500).json({
            message: err.message
        });
    } else {
        // Programming or unknown error, log it and send a generic message
        console.error('ERROR:', err);
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};

// Main error handling middleware
module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        // Use development error handler in development mode
        developmentErrorHandler(err, req, res, next);
    } else if (process.env.NODE_ENV === 'production') {
        // Use production error handler in production mode
        productionErrorHandler(err, req, res, next);
    } else {
        // Default to production error handler
        productionErrorHandler(err, req, res, next);
    }
};
