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

friendRouter.route("/friend").get(getMyfriend).post(acceptFriend);
friendRouter.route("/friendRequest").get(getRequest).post(requestFriend);
friendRouter.route("/friendPending").get(getPending).post(getMoreFriend);

module.exports = friendRouter;
