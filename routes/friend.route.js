const express = require("express");
const {
  getMyfriend,
  requestFriend,
  acceptFriend,
  getRequest,
  getPending,
  getMoreFriend,
} = require("../controllers/friend.controller");
const friendRouter = express.Router();

friendRouter.route("/").get(getMyfriend).post(acceptFriend);
friendRouter.route("/request").get(getRequest).post(requestFriend);
friendRouter.route("/pending").get(getPending).post(getMoreFriend);

module.exports = friendRouter;
