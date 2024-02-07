const { getContact, getChat } = require("../services/chat.service");
const { mapError } = require("../utils/apiError");

exports.getContact = async (req, res, next) => {
  try {
    let result = await getContact(req.userId);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "get my contact success",
      });
    } else {
      mapError(400, "get my contact fail", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.getChat = async (req, res, next) => {
  try {
    let { targetId } = req.params;
    console.log("targetId ", targetId);
    let result = await getChat(req.userId, targetId);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "get my chat success",
      });
    } else {
      mapError(400, "get my chat fail", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};
