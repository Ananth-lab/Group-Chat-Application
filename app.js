const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const dotenv = require("dotenv")

const userRoutes = require("./routes/user");

const User = require("./models/user");

const Chat = require("./models/chat");

const Group = require("./models/group")

const sequelize = require("./utils/database");

const app = express();

app.use(cors({
    origin: "*",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

dotenv.config();

app.use(bodyParser.json());

app.use('/user', userRoutes);

Chat.belongsToMany(User, { through: 'chatuser', foreignKey: 'chatId' });
User.belongsToMany(Chat, { through: 'chatuser', foreignKey: 'userId' });


Group.belongsToMany(Chat, { through: 'groupchat' });
Chat.belongsToMany(Group, { through: 'groupchat' });

User.belongsToMany(Group, { through: 'usergroup', foreignKey: 'userId' });
Group.belongsToMany(User, { through: 'usergroup', foreignKey: 'groupId' });


sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT || 3000)
    })
