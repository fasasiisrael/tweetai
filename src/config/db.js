const { Sequelize } = require('sequelize');
const AutobotModel = require('../models/autobot');
const PostModel = require('../models/Post');
const CommentModel = require('../models/Comment');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'mysql://root:Adebayo0909!@localhost:3306/tweetai', {
    dialect: 'mysql',
    logging: false
});

const Autobot = AutobotModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);

// Set up associations
Autobot.associate({ Post });
Post.associate({ Autobot, Comment });
Comment.associate({ Post });

module.exports = {
    sequelize,
    models: {
        Autobot,
        Post,
        Comment
    }
};
