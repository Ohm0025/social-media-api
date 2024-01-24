const {
  createPost,
  getStandardPost,
  getMyPost,
  removePost,
} = require("../services/post.service");
const { mapError } = require("../utils/apiError");

exports.createPost = async (req, res, next) => {
  try {
    let { postText, postType, parentId } = req.body;
    let result = await createPost(
      postText,
      req.files?.post_picture,
      postType,
      req.userId,
      parentId
    );
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ status: 201, data: result, message: "create post success" });
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

exports.getStandardPost = async (req, res, next) => {
  try {
    let result = await getStandardPost(req.userId);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "fetch public post success",
      });
    } else {
      mapError(400, "fetch public post error", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.getMyPost = async (req, res, next) => {
  try {
    let result = await getMyPost(req.userId);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "fetch my post success",
      });
    } else {
      mapError(400, "fetch my post failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.removePost = async (req, res, next) => {
  try {
    let { postid } = req.body;
    let result = await removePost(postid, req.userId);
    if (result.rowCount > 0) {
      res.status(200).json({ status: 200, message: "remove post success" });
    } else {
      mapError(400, "remove post failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};
