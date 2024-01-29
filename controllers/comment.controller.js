const {
  getCommentPost,
  createCommentPost,
  deleteCommentPost,
} = require("../services/comment.service");
const { mapError } = require("../utils/apiError");

exports.getCommentPost = async (req, res, next) => {
  try {
    let { targetPostId } = req.params;
    let result = await getCommentPost(targetPostId);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        message: "fetch comment post sucess",
        data: result.rows,
      });
    } else {
      mapError(400, "you can not fetch comment", next);
    }
  } catch (err) {
    console.log(err);
    if (err.constraint) {
      mapError(400, err.detail, next);
    } else {
      mapError(500, "internal server error", next);
    }
  }
};

exports.createCommentPost = async (req, res, next) => {
  try {
    let { postText, postType } = req.body;
    let { targetPostId } = req.params;
    let result = await createCommentPost(
      postText,
      req.files?.post_picture ? req.files?.post_picture[0]?.path : "",
      postType,
      req.userId,
      targetPostId
    );
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ status: 201, data: result, message: "create post success" });
    } else {
      console.log("you can not post");
      mapError(400, "you can not post", next);
    }
  } catch (err) {
    console.log(err);
    if (err.constraint) {
      mapError(400, err.detail, next);
    } else {
      mapError(500, "internal server error", next);
    }
  }
};

exports.deleteCommentPost = async () => {
  try {
    let { commentId } = req.params;
    let result = await deleteCommentPost(commentId, req.userId);
    if (result.rowCount > 0) {
      res.status(200).json({ status: 200, message: "remove comment success" });
    } else {
      mapError(400, "remove comment failure", next);
    }
  } catch (err) {
    console.log(err);
    if (err.constraint) {
      mapError(400, err.detail, next);
    } else {
      mapError(500, "internal server error", next);
    }
  }
};
