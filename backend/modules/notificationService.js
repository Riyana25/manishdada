const io = require('socket.io')();

/**
 * Initializes the Socket.IO server and sets up event listeners for notifications.
 * @param {http.Server} server - The HTTP server to attach Socket.IO to.
 */
function initializeSocketIO(server) {
    // Attach Socket.IO to the server
    io.attach(server);

    // Set up event listeners
    io.on('connection', (socket) => {
        console.log('A client connected:', socket.id);

        // Listen for notification events
        socket.on('sendNotification', (notification) => {
            console.log('Notification received:', notification);
            // Broadcast the notification to all connected clients
            io.emit('notification', notification);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A client disconnected:', socket.id);
        });
    });
}

/**
 * Sends a notification to a specific client.
 * @param {string} clientId - The ID of the client to send the notification to.
 * @param {object} notification - The notification data to send.
 */
function sendNotificationToClient(clientId, notification) {
    const socket = io.sockets.sockets.get(clientId);
    if (socket) {
        socket.emit('notification', notification);
    }
}

module.exports = {
    initializeSocketIO,
    sendNotificationToClient,
};
