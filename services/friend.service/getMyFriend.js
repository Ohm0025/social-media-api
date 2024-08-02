const pool = require("../../db/pool");
const fs = require("fs");

exports.getMyFriend = async (userid) => {
  let sql = fs.readFileSync("services/friend.service/getMyFriend.txt", {
    encoding: "utf8",
  });

  let result = await pool.query(sql, ["accept", userid]);
  return result;
};
