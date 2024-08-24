const app = require('./app');
const db = require('./config/db');
const autobotCreationTask = require('./tasks/autobotCreationTask');
const socketIO = require('./socket');

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    console.log('Database connected and synchronized');
    autobotCreationTask; // Start the Autobot creation task
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    socketIO(server); // Initialize WebSocket server
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
