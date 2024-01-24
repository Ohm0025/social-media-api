const pool = require("../../db/pool");

exports.getMoreFriend = async (userid, searchName) => {
  let sql =
    "select * from users u1 left join friends f on u1.userid = f.requesterid or u1.userid = f.accepterid where f.requesterid != $1 and f.accepterid != $1 and (u1.firstname like $2 or u1.lastname like $2)";
  let result = await pool.query(sql, [userid, searchName + "%" || ""]);
  return result;
};
