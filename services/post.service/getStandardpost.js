const pool = require("../../db/pool");

exports.getStandardPost = async (userid) => {
  let sql =
    "select distinct (p.postid), p.post_content,p.post_date , p.post_picture ,u.firstname , u.lastname , u.profile_picture ,count(distinct l.postid) count_like , count(distinct p2.postid) count_comment from posts p left join posts p2 on p2.parentid = p.postid left join users u on u.userid = p.userid left join friends f on f.requesterid = u.userid or f.accepterid = u.userid left join users u2 on f.requesterid = u2.userid or f.accepterid = u2.userid left join like_post l on p.postid = l.postid where p.parentid isnull and p.post_type = $1 or (p.post_type = $2 and f.status = $3 and u2.userid != $4 and p.parentid isnull) or (u.userid = $4 and p.parentid isnull) group by (p.postid,u.firstname,u.lastname,u.profile_picture) order by post_date desc";
  let result = await pool.query(sql, [
    "public",
    "only_friend",
    "accept",
    userid,
  ]);
  let sqlCheckLike =
    "select * from like_post l where userid = $1 and postid = $2";
  let checkLike = async (postid) => {
    let result = await pool.query(sqlCheckLike, [userid, postid]);
    return result.rowCount > 0;
  };
  let modArr = await Promise.all(
    result.rows?.map(async (element) => {
      let check = await checkLike(element.postid);
      return { ...element, thisUserLike: check };
    })
  );
  return { rows: modArr, rowCount: modArr.length };
};
