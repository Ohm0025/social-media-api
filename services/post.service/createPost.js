const pool = require("../../db/pool");

exports.createPost = async (postText, postType, userid, parentid) => {
  let sql = `insert into posts(post_content,post_date,post_type,userid ${
    parentid ? ",parentid" : ""
  }) values($1,$2,$3,$4 ${parentid ? ",$5" : ""}) RETURNING *`;
  let date_now = new Date();
  let arrQuery = parentid
    ? [postText, date_now, postType, userid, parentid]
    : [postText, date_now, postType, userid];
  let result = await pool.query(sql, arrQuery);
  return result;
};
