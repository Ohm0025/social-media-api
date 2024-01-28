const pool = require("../../db/pool");

exports.getMyFriend = async (userid) => {
  let sql =
    "select u2.userid , u2.firstname , u2.lastname , f.status , f.friendid , f.requesterid , f.accepterid from users u left join friends f on u.userid = f.requesterid or u.userid = f.accepterid left join users u2 on u2.userid = f.requesterid or u2.userid = f.accepterid where f.status = $1 and u.userid = $2 and u2.userid != $2";
  let result = await pool.query(sql, ["accept", userid]);
  return result;
};
