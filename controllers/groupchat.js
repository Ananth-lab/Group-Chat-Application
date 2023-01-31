const Chat = require("../models/chat");

const User = require("../models/user");

const Group = require("../models/group");


exports.chat = async (req, res, next) => {
    try {
        Group.findOne({ where: { groupid: req.query.groupid } })
            .then(group => {
                //    console.log("group is=================================>", group)
                User.findOne({ where: { id: req.user.id } })
                    .then(user => {
                        // console.log("User is ==============================>",user)
                        Chat.create({
                            chat: req.body.msgInp
                        })
                            .then(chat => {
                                //      console.log("Chat is =========================>",chat)
                                // associate chat with group and user
                                chat.addGroup(group);
                                chat.addUser(user);
                                return res.status(201).json({ message: "sent successfully", success: true, })
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    });
            });
    }
    catch (error) {
        return res.status(504).json({ message: "something went wrong", success: true })
    }
}



exports.getChat = async (req, res, next) => {
    try {
        if (req.query.groupId == undefined) {
            throw new Error("No Group has been selected")
        }
        else {
            const group = await Group.findByPk(req.query.groupId);
            let chatList = await group.getChats({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name']
                    }
                ]
            });
            return res.status(200).json({ chatList, message: "messages delivered successfully", success: true })
        }    }
    catch (error) {
        console.log(error)
        return res.status(504).json({ message: error.message, success: false })
    }
}

exports.getGroup = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.query.userId);
        const groups = await user.getGroups();
        return res.status(201).json({ groups, message: "groups retrieved sucessfully", success: true })
    }
    catch (error) {
        console.log(error)
        return res.status(504).json({ message: error, success: false })
    }
}


exports.addGroup = async (req, res, next) => {
    try {
        const newGroup = await Group.create({
            groupname: req.body.groupname,
            groupdescription: req.body.groupdesc,
            adminId: req.body.currentUserId
        });
        const user = await User.findByPk(req.query.userId);
        await user.addGroup(newGroup);
        res.status(201).json({ message: "group created succusfully", success: true })

    }
    catch (error) {
        console.log(error)
        return res.status(504).json({ message: error, success: false })
    }
}


exports.getAllGroups = async (req, res, next) => {
    try {
        const groups = await Group.findAll();
        res.status(201).json({ groups, message: "groups selected successfully", success: true })
    }
    catch (error) {
        console.log(error)
        return res.status(504).json({ message: error, success: false })
    }
}


exports.joinGroup = async (req, res, next) => {
    try {
        Group.findOne({ where: { groupid: req.query.groupid } })
            .then(group => {
                User.findOne({ where: { id: req.query.userid } })
                    .then(user => {
                        group.addUser(user)
                            .then(() => {
                                res.status(201).json({ message: "you are added to the group", success: true })
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    });
            });

    }
    catch (error) {
        console.log(error)
        return res.status(504).json({ message: error, success: false })
    }
}