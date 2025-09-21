const { DataTypes } = require('sequelize');
const sequelize = require("../database/config-db");
const User = require("./users-model");
const Product= require("./products-model");

const Cart = sequelize.define(
    "Cart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("active", "purchased", "cancelled"),
            defaultValue: "active"
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updateAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }
);

//relations
User.hasMany(Cart, {
    foreignKey: "userId"
});
//----------------
Cart.belongsTo( User, {
    foreignKey: "userId"
});

//2
Product.hasMany( Cart, {
    foreignKey: "productId"
});
//-------------------
Cart.belongsTo( Product, {
    foreignKey: "productId"
})

module.exports = Cart;