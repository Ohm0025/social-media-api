const pool = require("../../db/pool");

exports.requestFriend = async (userid, accepterid) => {
  let date_now = new Date();
  let sql =
    "INSERT INTO friends (requesterid, accepterid, requestdate, accepterdate, status) VALUES($1, $2, $3, $4 , $5) RETURNING *";
  let result = await pool.query(sql, [
    userid,
    accepterid,
    date_now,
    null,
    "pending",
  ]);
  return result;
};
