const express = require("express");
const {
  addLikePost,
  removeLikePost,
  toggleLike,
} = require("../controllers/like.controller");
const likeRouter = express.Router();

// likeRouter.route("/").post(addLikePost);
// likeRouter.route("/:likepostid").delete(removeLikePost);

likeRouter.route("/").post(toggleLike);

module.exports = likeRouter;
