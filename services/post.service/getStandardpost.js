const pool = require("../../db/pool");

exports.getStandardPost = async (userid) => {
  let sql =
    "select p.post_content,p.post_date , p.post_picture ,u.firstname , u.lastname , u.profile_picture from posts p left join posts p2 on p2.parentid = p.postid left join users u on u.userid = p.userid left join friends f on f.requesterid = u.userid or f.accepterid = u.userid left join users u2 on f.requesterid = u2.userid or f.accepterid = u2.userid where p.post_type = $1 or (p.post_type = $2 and f.status = $3 and u2.userid != $4) or (u.userid = $4) order by post_date desc";
  let result = await pool.query(sql, [
    "public",
    "only_friend",
    "accept",
    userid,
  ]);
  return result;
};
