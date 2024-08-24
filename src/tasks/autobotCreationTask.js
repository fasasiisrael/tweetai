const cron = require('node-cron');
const { createAutobotWithPostsAndComments } = require('../services/autobotService');

// Schedule task to run every hour
cron.schedule('0 * * * *', async () => {
    try {
        console.log('Starting Autobots creation task...');
        
        for (let i = 0; i < 500; i++) {
            await createAutobotWithPostsAndComments();
        }

        console.log('Autobots creation task completed.');
    } catch (error) {
        console.error('Error during Autobots creation task:', error);
    }
});
