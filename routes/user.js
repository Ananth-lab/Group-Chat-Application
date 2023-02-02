const express = require("express");

const userController = require("../controllers/user");

const groupchatController = require("../controllers/groupchat");

const userAuthenticate = require("../middlewares/auth")

const routes = express.Router();

routes.post("/signin",userController.signIn);

routes.post("/login",userController.logIn);

routes.post("/chat",userAuthenticate.authenticate, groupchatController.chat);

routes.get("/get-chat",userAuthenticate.authenticate, groupchatController.getChat);

routes.get("/get-group",userAuthenticate.authenticate, groupchatController.getGroup);

routes.use("/add-group",userAuthenticate.authenticate, groupchatController.addGroup);

routes.post("/join-group",userAuthenticate.authenticate, groupchatController.joinGroup);

routes.post("/get-all-groups",userAuthenticate.authenticate, groupchatController.getAllGroups);

// routes.post("/join-group",userAuthenticate.authenticate, groupchatController.joinGroup);


module.exports = routes;