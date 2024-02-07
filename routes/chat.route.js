const express = require("express");
const { getContact, getChat } = require("../controllers/chat.controller");

const chatRouter = express.Router();

chatRouter.route("/").get(getContact);
chatRouter.route("/:targetId").get(getChat);

module.exports = chatRouter;
