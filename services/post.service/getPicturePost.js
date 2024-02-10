const pool = require("../../db/pool");
const fs = require("fs");
const imageEx = require("../../utils/imageExtact");

exports.getPicturePost = async (targetId) => {
  let sql = fs.readFileSync("services/post.service/getPicturePost.txt", {
    encoding: "utf8",
  });

  let result = await pool.query(sql, [targetId]);

  result.rows = result.rows.map((item) => {
    return imageEx(item.image_tag);
  });

  return result;
};
