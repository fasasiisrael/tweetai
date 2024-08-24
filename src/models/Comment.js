// models/comment.js
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        PostId: {
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

    Comment.associate = function(models) {
        Comment.belongsTo(models.Post, { foreignKey: 'PostId' });
    };

    return Comment;
};
