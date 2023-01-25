const express = require("express");

const userController = require("../controllers/user")

const routes = express.Router();

routes.post("/signin",userController.signIn);

module.exports = routes;