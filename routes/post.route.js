const express = require("express");
const {
  createPost,
  removePost,
  getStandardPost,
  getMyPost,
  getOtherUserPost,
} = require("../controllers/post.controller");
const postRouter = express.Router();

postRouter.route("/").get(getStandardPost).post(createPost);

postRouter.route("/:postid").delete(removePost);

postRouter.route("/postMy").get(getMyPost);

postRouter.route("/:otherid").get(getOtherUserPost);

module.exports = postRouter;
