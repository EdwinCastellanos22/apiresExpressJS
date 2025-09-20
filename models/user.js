const { DataTypes } = require('sequelize');
const sequelize = require("../database/config");

const User = sequelize.define(
    'User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: { type: DataTypes.STRING, allowNullL: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false},
        password: { type: DataTypes.STRING, allowNull: false},
        isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false},
    }, {
        timestamps: true,
        tableName: 'user'
    }
);

module.exports= User;