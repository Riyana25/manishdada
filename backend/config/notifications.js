// config/notifications.js

const io = require('socket.io')(); // Requires socket.io package

function initializeSocketIO(server) {
    io.attach(server);

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('sendNotification', (notification) => {
            console.log('Notification received:', notification);
            io.emit('notification', notification); // Broadcast notification to all clients
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

module.exports = initializeSocketIO;
