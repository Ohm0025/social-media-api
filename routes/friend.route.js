const express = require("express");
const {
  getMyfriend,
  requestFriend,
  acceptFriend,
  getRequest,
  getPending,
  getMoreFriend,
  getSuggest,
} = require("../controllers/friend.controller");
const friendRouter = express.Router();

friendRouter.route("/").get(getMyfriend).patch(acceptFriend);
friendRouter.route("/request").get(getRequest).post(requestFriend);
friendRouter.route("/pending").get(getPending).post(getMoreFriend);
friendRouter.route("/suggest").get(getSuggest);

module.exports = friendRouter;
