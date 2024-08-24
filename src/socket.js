const socketIo = require('socket.io');
const { models } = require('./config/db'); // Import the models

module.exports = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New client connected');

        // Emit the current count of Autobots on connection
        models.Autobot.count().then(count => {
            socket.emit('autobotCount', count);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    // Emit updated Autobot count when a new Autobot is created
    models.Autobot.addHook('afterCreate', async () => {
        const count = await models.Autobot.count();
        io.emit('autobotCount', count);
    });
};
