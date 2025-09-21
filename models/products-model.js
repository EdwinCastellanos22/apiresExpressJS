const { DataTypes } = require("sequelize");
const sequelize = require("../database/config-db");

const Product = sequelize.define("Product", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    price: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },
    stock: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
    },
    category: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    imageUrl: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    status: { 
        type: DataTypes.ENUM("active", "inactive"), 
        defaultValue: "inactive" 
    },
    createdAt: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    updatedAt: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
});

module.exports = Product;
