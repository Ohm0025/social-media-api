let pool = require("../../db/pool");

module.exports = async (targetPostId) => {
  let sql =
    "select p1.post_content , p1.post_picture ,u.profile_picture , u.userid from posts p1 left join posts p2 on p2.postid = p1.parentid left join users u on p1.userid = u.userid where p1.parentid = $1";
  let result = await pool.query(sql, [targetPostId]);

  return result;
};
