const Sequelize = require("sequelize");

const sequelize = require("../utils/database");


const Chat = sequelize.define("chat", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    chat: {
        type: Sequelize.STRING
    }
})

module.exports = Chat;