const Chat = require("../models/chat");

const User = require("../models/user");

const Group = require("../models/group");


exports.getMembers = async (req, res, next) => {
    try {
        const group = await Group.findOne({ where: { groupid: req.query.groupId } });
        const users = await group.getUsers()
        return res.status(201).json({ users, success: true })
    }
    catch (error) {
        return res.status(504).json({ message: "something went wrong", success: true })
    }
}


exports.removeUser = async (req, res, next) => {
    try {
        const group = await Group.findOne({ where: { groupid: req.query.groupId } });
        const user = await group.getUsers({ where: { id: req.query.userId } });
        await group.removeUser(user);
        return res.status(200).json({ message: "User removed", success: true })
    }
    catch (error) {
        return res.status(504).json({ message: "something went wrong", success: true })
    }
}

exports.joinGroup = async (req, res, next) => {
    try {
        const username = await User.findOne({ where: { name: req.body.uname } });
        if (username) {
            const useremail = await User.findOne({ where: { email: req.body.uemail } });
            if (useremail) {
                const groupname = await Group.findOne({ where: { groupname: req.body.group } });
                if (groupname) {
                    const user = await User.findOne({ where: { email: req.body.uemail } });
                    const group = await Group.findOne({ where: { groupname: req.body.group } });
                    await group.addUser(user);
                    return res.status(200).json({ message: "new user added to the group", success: true });
                }
                else {
                    throw new Error("group name is invalid")
                }
            }
            else {
                throw new Error("user email is invalid")
            }
        }
        else {
            throw new Error("user name is invalid")
        }
    }
    catch (error) {
        console.log(error)
        return res.status(504).json({ message: error.message, success: false })
    }
}