const express = require("express");
const { getContact } = require("../controllers/chat.controller");

const chatRouter = express.Router();

chatRouter.route("/").get(getContact);

module.exports = chatRouter;
