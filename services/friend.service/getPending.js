const pool = require("../../db/pool");

exports.getPending = async (userid) => {
  let sql =
    "select f.friendid ,f.accepterid , u2.userid, u2.firstname ,u2.lastname , u2.profile_cover ,u2.profile_picture,f.status from users u left join friends f on u.userid = f.accepterid left join users u2 on u2.userid = f.requesterid where u.userid = $1 and f.status=$2";
  let result = await pool.query(sql, [userid, "pending"]);
  console.log(result.rows);
  return result;
};
