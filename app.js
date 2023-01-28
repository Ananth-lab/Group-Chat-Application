const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const dotenv = require("dotenv")

const userRoutes = require("./routes/user");

const User = require("./models/user");

const Chat = require("./models/chat");

const sequelize = require("./utils/database")

const app = express();

app.use(cors({
    origin: "*",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

dotenv.config();

app.use(bodyParser.json());

app.use('/user', userRoutes);

User.hasMany(Chat, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Chat.belongsTo(User)

sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT || 3000)
    })
