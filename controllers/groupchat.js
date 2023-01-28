const Chat = require("../models/chat");

const User = require("../models/user");


exports.chat = async (req, res, next) => {
    try {
        const currentChat = await req.user.createChat({
            chat: req.body.msgInp
        })
        return res.status(201).json({ currentChat, message: "sent successfully", success: true,  })
    }
    catch (error) {
        return res.status(504).json({ message: "something went wrong", success: true })
    }
}



exports.getChat = async (req, res, next) => {
    try {
        let chatList = await Chat.findAll({
            include: [
              {
                model: User,
                attributes: ['id', 'name']
              }
            ]
          });
        chatList = chatList.slice(req.query.lastmsgid, chatList.length);
        return res.status(200).json({chatList, message: "messages delivered successfully", success: true})
    }
    catch (error) {
        console.log(error)
        return res.status(504).json({ message: error, success: false })
    }
}
