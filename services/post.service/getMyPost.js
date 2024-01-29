const pool = require("../../db/pool");

exports.getMyPost = async (userid) => {
  let sql =
    "select distinct (p.postid),p.post_content , p.post_picture , u.userid ,u.firstname , u.lastname , p.post_date , count(distinct l.userid) count_like , count(distinct p2.postid) count_comment from posts p left join posts p2 on p2.parentid = p.postid left join users u on p.userid = u.userid left join like_post l on p.postid = l.userid where p.parentid isnull and u.userid = $1 group by (p.postid,u.firstname,u.lastname,u.profile_picture,l.userid,u.userid) order by p.post_date desc,p.postid desc";
  let result = await pool.query(sql, [userid]);
  return result;
};
