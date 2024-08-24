module.exports = (sequelize, DataTypes) => {
    const Autobot = sequelize.define('Autobot', {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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

    Autobot.associate = function(models) {
        // Define associations here
        Autobot.hasMany(models.Post, { foreignKey: 'AutobotId' });
    };

    return Autobot;
};