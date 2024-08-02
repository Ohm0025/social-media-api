const pool = require("../../db/pool");

module.exports = async (postText, postPicture, postType, userid, parentid) => {
  console.log("krowgkp");
  let sql = `insert into posts(post_content,post_date,post_type, post_picture,userid ${
    parentid ? ",parentid" : ""
  }) values($1,$2,$3,$4,$5 ${parentid ? ",$6" : ""}) RETURNING *`;
  let date_now = new Date();
  let arrQuery = parentid
    ? [postText, date_now, postType, postPicture, userid, parentid]
    : [postText, date_now, postType, postPicture, userid];
  console.log(arrQuery);
  let result = await pool.query(sql, arrQuery);
  return result;
};
