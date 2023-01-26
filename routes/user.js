const express = require("express");

const userController = require("../controllers/user")

const routes = express.Router();

routes.post("/signin",userController.signIn);

routes.post("/login",userController.logIn);

module.exports = routes;