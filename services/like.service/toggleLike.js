const pool = require("../../db/pool");

module.exports = async (postid, userid) => {
  let sql = "select * from like_post where postid = $1 and userid = $2";
  let result = await pool.query(sql, [postid, userid]);
  if (result.rowCount > 0) {
    let sql2 = "delete from like_post where postid = $1 and userid = $2";
    let result2 = await pool.query(sql2, [postid, userid]);
    return result2;
  } else {
    let sql3 =
      "INSERT INTO like_post (postid, userid) VALUES($1,$2) RETURNING *";
    let result3 = await pool.query(sql3, [postid, userid]);
    return result3;
  }
};
