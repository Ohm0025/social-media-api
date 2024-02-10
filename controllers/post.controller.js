const {
  createPost,
  getStandardPost,
  getMyPost,
  removePost,
  getOtherUserPost,
  getPicturePost,
  editPost,
} = require("../services/post.service");
const { mapError } = require("../utils/apiError");

exports.createPost = async (req, res, next) => {
  try {
    let { postText, postType, parentId } = req.body;
    let result = await createPost(postText, postType, req.userId, parentId);
    if (result.rowCount > 0) {
      res.status(201).json({
        status: 201,
        data: result.rows[0],
        message: "create post success",
      });
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

exports.getStandardPost = async (req, res, next) => {
  try {
    let { limit, postType } = req.body;
    let result = await getStandardPost(req.userId, limit, postType);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result,
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
    let { limit, postType } = req.body;
    let result = await getMyPost(req.userId, limit, postType);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result,
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
    let { postid } = req.params;
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

exports.getOtherUserPost = async (req, res, next) => {
  try {
    let { otherid } = req.params;
    let result = await getOtherUserPost(req.userId, otherid);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        message: "get other post success",
        data: result.rows,
        userObj: {
          userid:
            result.rows.length === 0
              ? result.sendObj.userId
              : result.rows[0].userid,
          description:
            result.rows.length === 0
              ? result.sendObj.description
              : result.rows[0].description,
          profile_picture:
            result.rows.length === 0
              ? result.sendObj.profile_picture
              : result.rows[0].profile_picture,
          profile_cover:
            result.rows.length === 0
              ? result.sendObj.profile_cover
              : result.rows[0].profile_cover,
          firstname:
            result.rows.length === 0
              ? result.sendObj.firstname
              : result.rows[0].firstname,
          lastname:
            result.rows.length === 0
              ? result.sendObj.lastname
              : result.rows[0].lastname,
        },
      });
    } else {
      mapError(400, "get other post failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.getPicturePost = async (req, res, next) => {
  try {
    let { targetId } = req.body;
    let result = await getPicturePost(targetId);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result,
        message: "fetch picture post success",
      });
    } else {
      mapError(400, "fetch picture post error", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.editPost = async (req, res, next) => {
  try {
    let { postid } = req.params;
    let { postText, postType } = req.body;
    let result = await editPost(postid, postText, postType);
    if (result.rowCount > 0) {
      res.status(201).json({
        status: 201,
        data: result.rows[0],
        message: "edit post success",
      });
    } else {
      console.log("you can not edit post");
      mapError(400, "you can not edit post", next);
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
