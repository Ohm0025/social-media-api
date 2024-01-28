const pool = require("../../db/pool");

exports.getOtherUserPost = async (userid, otherid) => {
  let sql =
    "select distinct * from friends f left join users u on f.requesterid = u.userid or f.accepterid = u.userid left join posts p on p.userid = u.userid where u.userid = $1 and f.status = $2 and (f.requesterid = $3 or f.accepterid = $3)";
  let result = await pool.query(sql, [userid, "accept", otherid]);
  if (result.rowCount > 0) {
    return result;
  }
  let sql2 =
    "select * from users u left join posts p on u.userid = p.userid where u.userid = $1 and p.post_type = $2";
  let result2 = await pool.query(sql2, [otherid, "public"]);
  return result2;
};
