const express = require("express");
const {
  getCommentPost,
  createCommentPost,
  deleteCommentPost,
} = require("../controllers/comment.controller");
const commentRouter = express.Router();

commentRouter
  .route("/:targetPostId")
  .get(getCommentPost)
  .post(createCommentPost);

commentRouter.route("/:commentId").delete(deleteCommentPost);

module.exports = commentRouter;
