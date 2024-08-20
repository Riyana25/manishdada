const mongoose = require('mongoose');

// Define the configuration schema
const configSchema = new mongoose.Schema({
    oilPrice: {
        type: Number,
        required: true
    },
    // You can add more configuration fields here as needed
}, {
    timestamps: true // Optional: adds createdAt and updatedAt timestamps
});

// Create and export the model
const Config = mongoose.model('Config', configSchema);
module.exports = Config;
