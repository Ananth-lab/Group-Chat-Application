const express = require("express");

const userController = require("../controllers/user");

const groupchatController = require("../controllers/groupchat");

const userAuthenticate = require("../middlewares/auth")

const routes = express.Router();

routes.post("/signin",userController.signIn);

routes.post("/login",userController.logIn);

routes.post("/chat",userAuthenticate.authenticate, groupchatController.chat);

module.exports = routes;