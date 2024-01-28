const pool = require("../../db/pool");

module.exports = async (postid) => {
  let sql = "INSERT INTO like_post (postid, userid) VALUES($1,$2) RETURNING *";
  let result = await pool.query(sql, [postid, req.userId]);
  return result;
};
