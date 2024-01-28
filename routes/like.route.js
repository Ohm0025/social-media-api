const express = require("express");
const {
  addLikePost,
  removeLikePost,
} = require("../controllers/like.controller");
const likeRouter = express.Router();

likeRouter.route("/").post(addLikePost);
likeRouter.route("/:likepostid").delete(removeLikePost);
