const pool = require("../../db/pool");

exports.getMoreFriend = async (userid, searchName) => {
  if (!searchName.trim() === "") {
    let sql =
      "select DISTINCT * from users u1 left join friends f on u1.userid = f.requesterid or u1.userid = f.accepterid where f.requesterid != $1 and f.accepterid != $1 and (u1.firstname like $2 or u1.lastname like $2)";
    let result = await pool.query(sql, [userid, searchName + "%" || ""]);
    return result;
  }
  let sql =
    "select DISTINCT * from users u1 left join friends f on u1.userid = f.requesterid or u1.userid = f.accepterid where u1.userid != $1 and f.status is null";
  let result = await pool.query(sql, [userid]);
  return result;
};
