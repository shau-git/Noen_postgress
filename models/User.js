const {DataTypes} = require('sequelize')
const sequelize = require('../db/db')


const User = sequelize.define('Users', {
    /*id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },*/
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // database will reject duplicates
    },
    /*
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'Roles', // must match your roles table
        key: 'id'
        }
    }
        */
}, {timestamps: false });


module.exports = User