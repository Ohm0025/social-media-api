const {
  getMyFriend,
  requestFriend,
  acceptFriend,
  getRequest,
  getPending,
  getMoreFriend,
  getSuggest,
} = require("../services/friend.service");
const { mapError } = require("../utils/apiError");

exports.getMyfriend = async (req, res, next) => {
  try {
    let result = await getMyFriend(req.userId);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "get my friend success",
      });
    } else {
      mapError(400, "get my friend fail", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.requestFriend = async (req, res, next) => {
  try {
    let { accepterid } = req.body;
    let result = await requestFriend(req.userId, accepterid);
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ status: 201, data: result.rows, message: "request success" });
    } else {
      mapError(400, "request fail", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.acceptFriend = async (req, res, next) => {
  try {
    let { friendid } = req.body;
    let result = await acceptFriend(friendid);
    if (result.rowCount > 0) {
      res.status(200).json({ status: 200, message: "accept friend success" });
    } else {
      mapError(400, "accept friend error", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.getRequest = async (req, res, next) => {
  try {
    let result = await getRequest(req.userId);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "get requested friend success",
      });
    } else {
      mapError(400, "get requested friend failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.getPending = async (req, res, next) => {
  try {
    let result = await getPending(req.userId);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "get pending friend success",
      });
    } else {
      mapError(400, "get pending friend failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.getMoreFriend = async (req, res, next) => {
  try {
    let { searchName } = req.body;
    let result = await getMoreFriend(req.userId, searchName);

    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "get more friend success",
      });
    } else {
      mapError(400, "get more friend failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.getSuggest = async (req, res, next) => {
  try {
    let result = await getSuggest(req.userId);

    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "get suggest friend success",
      });
    } else {
      mapError(400, "get suggest friend failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};
