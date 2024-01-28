let pool = require("../../db/pool");

module.exports = async (targetPostId) => {
  let sql =
    "select * from posts p1 left join posts p2 on p1.postid = p2.parentid where p1.postid = $1";
  let result = await pool.query(sql, [targetPostId]);
  return result;
};
