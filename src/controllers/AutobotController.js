const autobotService = require('../services/autobotService');

class AutobotController {
    async getAutobots(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const autobots = await autobotService.getAutobots({ page, limit });
            res.status(200).json(autobots);
        } catch (error) {
            console.error('Error fetching Autobots:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async createAutobot(req, res) {
        try {
            const autobot = await autobotService.createAutobotWithPostsAndComments();
            res.status(201).json({ message: 'Autobot created successfully', autobot });
        } catch (error) {
            console.error('Error creating Autobot:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new AutobotController();
