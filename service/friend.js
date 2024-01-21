const pool = require("../db/pool");
const { mapError } = require("../utils/apiError");

exports.getMoreFriend = async (req, res, next) => {
  try {
    let { searchName } = req.body;
    let sql =
      "select * from users u left join friends f on f.requesterid = u.userid  where u.firstname like $1 or u.lastname like '$1%' and f.accepterid != $2 and u.userid != $3";
    let result = await pool.query(sql, [
      searchName + "%" || "",
      req.userId,
      req.userId,
    ]);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "fetch data success",
      });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "friend not found", data: [] });
    }
  } catch (err) {
    console.log(err);
    mapError(500, "in se err", next);
  }
};

exports.fetchMyFriend = async (req, res, next) => {
  try {
    let sql =
      "select u.userid,u.firstname from users u left join fiends f on u.userid = f.requesterid or u.userid = f.accepterid where f.status = $1 and u.userid = $2";
    let result = await pool.query(sql, ["accept", req.userId]);
    if (result.rowCount > 0) {
      res
        .status(200)
        .json({ status: 200, data: result.rows, message: "fetch all friend" });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "you have no friend", data: [] });
    }
  } catch (err) {
    console.log(err);
    mapError(500, "in se err", next);
  }
};
