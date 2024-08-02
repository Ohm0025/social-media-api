const pool = require("../../db/pool");
const fs = require("fs");

exports.editPost = async (postid, postText, postType) => {
  let sql = fs.readFileSync("services/post.service/editPostText.txt", {
    encoding: "utf8",
  });
  let result = await pool.query(sql, [postText, postType, postid]);

  return result;
};
