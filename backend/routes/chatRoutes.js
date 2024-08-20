const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Define routes

// Send a message
router.post('/send', chatController.sendMessage);

// Get chat history for a specific ride
router.get('/history/:rideId', chatController.getChatHistory);

// Delete a message
router.delete('/delete/:messageId', chatController.deleteMessage);

module.exports = router;
