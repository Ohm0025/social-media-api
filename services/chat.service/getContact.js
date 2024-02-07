const pool = require("../../db/pool");
const fs = require("fs");

exports.getContact = async (userid) => {
  let sql = fs.readFileSync("services/chat.service/getContact.txt", {
    encoding: "utf8",
  });

  let result = await pool.query(sql, [userid]);

  let sql2 = fs.readFileSync("services/chat.service/getMessage.txt", {
    encoding: "utf8",
  });

  let arr = [];

  if (result.rowCount > 0) {
    for (let i = 0; i < result.rowCount; i++) {
      let result2 = await pool.query(sql2, [userid, result.rows[i].userid]);
      let typeChat = result2.rows[0]?.senderid === userid ? "sender" : "reader";
      arr.push({
        ...result.rows[i],
        lastChat: result2.rows[0]?.chatcontent,
        dateChat: result2.rows[0]?.chat_last_mod,
        typeChat,
      });
    }
  }
  //   let result2 = await pool.query(sql2, [userid, targetid]);
  //   console.log(result2);

  result.rows = arr;

  return result;
};
