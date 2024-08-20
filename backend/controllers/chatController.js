const Chat = require('../models/chat');
const User = require('../models/user');
const Ride = require('../models/ride');

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { rideId, senderId, receiverId, message } = req.body;

        // Validate input
        if (!rideId || !senderId || !receiverId || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new chat message
        const chatMessage = new Chat({
            ride: rideId,
            sender: senderId,
            receiver: receiverId,
            message,
            timestamp: new Date()
        });

        await chatMessage.save();
        res.status(201).json({ message: 'Message sent successfully', chatMessage });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get chat history for a specific ride
exports.getChatHistory = async (req, res) => {
    try {
        const { rideId } = req.params;

        // Validate input
        if (!rideId) {
            return res.status(400).json({ message: 'Ride ID is required' });
        }

        // Retrieve chat messages for the ride
        const chatHistory = await Chat.find({ ride: rideId }).populate('sender receiver');

        if (!chatHistory.length) {
            return res.status(404).json({ message: 'No messages found' });
        }

        res.status(200).json({ chatHistory });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        // Validate input
        if (!messageId) {
            return res.status(400).json({ message: 'Message ID is required' });
        }

        // Delete the chat message
        const chatMessage = await Chat.findByIdAndDelete(messageId);

        if (!chatMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
