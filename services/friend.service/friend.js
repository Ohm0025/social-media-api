const pool = require("../../db/pool");
const { mapError } = require("../../utils/apiError");

exports.getMoreFriend = async (req, res, next) => {
  try {
    let { searchName } = req.body;
    let sql =
      "select * from users u1 left join friends f on u1.userid = f.requesterid or u1.userid = f.accepterid where f.requesterid != $1 and f.accepterid != $1 and (u1.firstname like $2 or u1.lastname like $2)";
    let result = await pool.query(sql, [req.userId, searchName + "%" || ""]);
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
      "select u2.userid , u2.firstname , u2.lastname, f.status , f.friendid , f.requesterid , f.accepterid  from users u left join friends f on u.userid = f.requesterid or u.userid = f.accepterid left join users u2 on u2.userid = f.requesterid or u2.userid = f.accepterid where f.status = $1 and u.userid = $2 and u2.userid != $2";
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

exports.requestFriend = async (req, res, next) => {
  try {
    let { accepterid } = req.body;
    let date_now = new Date();
    //let sql = "INSERT INTO friends ($1, $2, $3, $4 , $5) RETURNING *";
    let sql =
      "INSERT INTO friends (requesterid, accepterid, requestdate, accepterdate, status) VALUES($1, $2, $3, $4 , $5) RETURNING *";
    let result = await pool.query(sql, [
      req.userId,
      accepterid,
      date_now,
      null,
      "pending",
    ]);
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ status: 201, data: result.rows, message: "request success" });
    } else {
      res.status(400).json({ status: 400, message: "request unsuccess" });
    }
  } catch (err) {
    console.log(err);
    mapError(500, "in se er", next);
  }
};

exports.fetchFriendRequest = async (req, res, next) => {
  try {
    let sql =
      "select f.accepterid, u2.firstname ,u2.lastname , u2.profile_picture,f.status from users u left join friends f on u.userid = f.requesterid left join users u2 on u2.userid = f.accepterid where u.userid = $1 and f.status=$2";
    let result = await pool.query(sql, [req.userId, "pending"]);
    if (result.rowCount > 0) {
      res.status(200).json({ status: 200, data: result.rows });
    }
  } catch (err) {
    console.log(err);
    mapError(500, "in se er", next);
  }
};

exports.fetchFriendAccept = async (req, res, next) => {
  try {
    let sql =
      "select f.friendid ,f.accepterid, u2.firstname ,u2.lastname , u2.profile_picture,f.status from users u left join friends f on u.userid = f.accepterid left join users u2 on u2.userid = f.requesterid where u.userid = $1 and f.status=$2";
    let result = await pool.query(sql, [req.userId, "pending"]);
    if (result.rowCount > 0) {
      res.status(200).json({ status: 200, data: result.rows });
    }
  } catch (err) {
    console.log(err);
    mapError(500, "in se er", next);
  }
};

exports.acceptFriendRequest = async (req, res, next) => {
  try {
    let { friendid } = req.body;
    let now_date = new Date();
    let sql = "UPDATE friends SET accepterdate=$2, status=$3 WHERE friendid=$1";
    let result = await pool.query(sql, [friendid, now_date, "accept"]);
    if (result.rowCount > 0) {
      res.status(200).json({ status: 200, message: "accept friend success" });
    }
  } catch (err) {
    console.log(err);
    mapError(500, "in se er", next);
  }
};
