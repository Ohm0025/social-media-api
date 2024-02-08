const pool = require("../../db/pool");

exports.getRequest = async (userid) => {
  let sql =
    "select f.accepterid, f.requesterid,u2.userid, u2.firstname ,u2.lastname , u2.profile_cover , u2.profile_picture,f.status from users u left join friends f on u.userid = f.requesterid left join users u2 on u2.userid = f.accepterid where u.userid = $1 and f.status=$2";
  let result = await pool.query(sql, [userid, "pending"]);
  return result;
};
