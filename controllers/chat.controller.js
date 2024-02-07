const { getContact } = require("../services/chat.service");
const { mapError } = require("../utils/apiError");

exports.getContact = async (req, res, next) => {
  try {
    let result = await getContact(req.userId);
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
