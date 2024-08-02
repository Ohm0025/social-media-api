const express = require("express");
const {
  getContact,
  getChat,
  createChat,
} = require("../controllers/chat.controller");

const chatRouter = express.Router();

chatRouter.route("/").get(getContact);
chatRouter.route("/:targetId").get(getChat).post(createChat);

module.exports = chatRouter;
