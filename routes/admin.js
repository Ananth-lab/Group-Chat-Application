const express = require("express");

const routes = express.Router();

const adminController = require("../controllers/admin");

const userAuthenticate = require("../middlewares/auth");

routes.get("/get-members",userAuthenticate.authenticate, adminController.getMembers)

routes.delete("/remove-user",userAuthenticate.authenticate, adminController.removeUser)

module.exports = routes;