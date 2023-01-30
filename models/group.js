const Sequelize = require("sequelize");

const sequelize = require("../utils/database");


const Group = sequelize.define("group", {
    groupid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    groupname: {
        type: Sequelize.STRING
    },
    groupdescription: {
        type:Sequelize.STRING
    },
    adminId : {
        type: Sequelize.INTEGER
    }

})

module.exports = Group;