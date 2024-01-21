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
