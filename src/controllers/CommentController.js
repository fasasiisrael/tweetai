const { Comment } = require('../config/db').models;

exports.getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const comments = await Comment.findAll({
            where: { PostId: postId },
            limit,
            offset: (page - 1) * limit
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};
