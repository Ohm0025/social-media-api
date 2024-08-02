const { mapError } = require("../../utils/apiError");
const pool = require("../../db/pool");

exports.updateProfilePicture = async (req, res, next) => {
  try {
    let sql = "UPDATE users SET profile_picture= $1 WHERE userid=$2";

    let pathPic = req.file ? req.file.path : "";
    let result = await pool.query(sql, [pathPic, req.userId]);
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ status: 201, message: "update profile picture success" });
    } else {
      res.status(500).json({
        status: 500,
        data: result,
        message: "update profile picture failure",
      });
    }
  } catch (err) {
    console.log(err);
    mapError(500, "in ser err", next);
  }
};

exports.updateProfileCover = async (req, res, next) => {
  try {
    let sql = "UPDATE users SET profile_cover= $1 WHERE userid=$2";
    let pathPic = req.file ? req.file.path : "";
    let result = await pool.query(sql, [pathPic, req.userId]);
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ status: 201, message: "update profile cover success" });
    } else {
      res.status(500).json({
        status: 500,
        data: result,
        message: "update profile cover failure",
      });
    }
  } catch (err) {
    console.log(err);
    mapError(500, "in ser err", next);
  }
};
