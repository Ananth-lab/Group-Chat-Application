const Chat = require("../models/chat");

const User = require("../models/user");


exports.chat = async (req, res, next) => {
    try {
        await req.user.createChat({
            chat: req.body.msgInp
        })
        return res.status(201).json({ message: "sent successfully", success: true })
    }
    catch (error) {
        return res.status(504).json({ message: "something went wrong", success: true })
    }
}



exports.getChat = async (req, res, next) => {
    try {
        const chatList = await Chat.findAll()
        return res.status(200).json({chatList, message: "messages delivered successfully", success: true })
    }
    catch (error) {
        return res.status(504).json({ message: "something went wrong", success: true })
    }
}
