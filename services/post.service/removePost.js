const pool = require("../../db/pool");

exports.removePost = async (postid, userid) => {
  let sql0 = "select userid from posts where postid = $1";
  let targetPost = await pool.query(sql0, [postid]);

  if (targetPost.rows[0].userid === userid) {
    let sql = "DELETE FROM posts WHERE postid=$1";
    let result = await pool.query(sql, [postid]);
    return result;
  }
};
