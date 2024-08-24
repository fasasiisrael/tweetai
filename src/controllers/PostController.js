const { models } = require('../config/db');
const { Post } = models;

exports.getPostsByAutobot = async (req, res) => {
    try {
        const { autobotId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const posts = await Post.findAll({
            where: { AutobotId: autobotId },
            limit,
            offset: (page - 1) * limit
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};
