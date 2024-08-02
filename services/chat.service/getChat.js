const pool = require("../../db/pool");
const fs = require("fs");

exports.getChat = async (userid, targetid) => {
  let sql = fs.readFileSync("services/chat.service/getChatText.txt", {
    encoding: "utf8",
  });

  let result = await pool.query(sql, [userid, targetid]);
  return result;
};
