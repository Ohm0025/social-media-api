const {
  addLikePost,
  removeLikePost,
  toggleLike,
} = require("../services/like.service");

exports.addLikePost = async () => {
  try {
    let { postid } = req.body;
    let result = await addLikePost(postid, req.userId);
    if (result.rowCount > 0) {
      result
        .status(201)
        .json({ status: 201, data: result, message: "add like success" });
    } else {
      console.log("you can not like");
      mapError(400, "you can not like", next);
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

exports.removeLikePost = async (req, res, next) => {
  try {
    let { likepostid } = req.params;
    let result = await removeLikePost(likepostid);
    if (result.rowCount > 0) {
      res.status(201).json({ status: 201, message: "remove like success" });
    } else {
      mapError(400, "remove like failure", next);
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

exports.toggleLike = async (req, res, next) => {
  try {
    let { postid } = req.body;
    let result = await toggleLike(postid, req.userId);
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ status: 201, message: "toggle like-post success" });
    } else {
      mapError(400, "toggle like-post failure", next);
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
