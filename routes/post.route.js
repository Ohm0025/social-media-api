const express = require("express");
const {
  createPost,
  removePost,
  getStandardPost,
  getMyPost,
  getOtherUserPost,
  getPicturePost,
  editPost,
} = require("../controllers/post.controller");
const postRouter = express.Router();

postRouter.route("/").get(getStandardPost).post(createPost);

postRouter.route("/standardpost").post(getStandardPost);

postRouter.route("/:postid").delete(removePost).patch(editPost);

postRouter.route("/postMy").post(getMyPost);

postRouter.route("/:otherid").get(getOtherUserPost);

postRouter.route("/getPicture").post(getPicturePost);

module.exports = postRouter;
