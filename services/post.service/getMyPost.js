const pool = require("../../db/pool");

exports.getMyPost = async (userid) => {
  let sql =
    "select p.post_content ,p.postid , p.post_picture , u.userid ,u.firstname , u.lastname , p.post_date from posts p left join users u on p.userid = u.userid where u.userid = $1 order by p.post_date desc,p.postid desc";
  let result = await pool.query(sql, [userid]);
  return result;
};
