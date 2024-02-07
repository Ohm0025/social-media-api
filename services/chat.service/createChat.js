const pool = require("../../db/pool");
const fs = require("fs");

exports.createChat = async (userId, targetId, chatcontent) => {
  let sql = fs.readFileSync("services/chat.service/createChatText.txt", {
    encoding: "utf8",
  });

  let date_now = new Date();

  let result = await pool.query(sql, [date_now, chatcontent, userId, targetId]);

  return result;
};
