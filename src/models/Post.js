// models/post.js
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        AutobotId: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    Post.associate = function(models) {
        Post.belongsTo(models.Autobot, { foreignKey: 'AutobotId' });
        Post.hasMany(models.Comment, { foreignKey: 'PostId' });
    };

    return Post;
};
