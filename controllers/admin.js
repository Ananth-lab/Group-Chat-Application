const Chat = require("../models/chat");

const User = require("../models/user");

const Group = require("../models/group");


exports.getMembers = async (req, res, next) => {
    try {
        const group = await Group.findOne({where : {groupid : req.query.groupId}});
        const users = await group.getUsers()
        return res.status(201).json({ users, success: true })
    }
    catch (error) {
        return res.status(504).json({ message: "something went wrong", success: true })
    }
}


exports.removeUser = async (req, res, next) => {
    try {
        const group = await Group.findOne({where :{groupid : req.query.groupId}});
        const user = await group.getUsers({where : {id : req.query.userId}});
        await group.removeUser(user);
        return res.status(200).json({ message: "User removed", success: true })
    }
    catch (error) {
        return res.status(504).json({ message: "something went wrong", success: true })
    }
}