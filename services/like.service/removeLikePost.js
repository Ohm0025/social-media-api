const pool = require("../../db/pool");

module.exports = async (likepostid) => {
  let sql = "DELETE FROM like_post WHERE postid = $1";
  let result = await pool.query(sql, [likepostid]);
  return result;
};
