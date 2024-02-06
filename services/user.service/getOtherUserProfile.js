const pool = require("../../db/pool");
const fs = require("fs");

exports.getOtherUserProfile = async (otherUserId, userId) => {
  let sql1 = fs.readFileSync("services/user.service/getOtherUserProfile.txt", {
    encoding: "utf8",
  });

  let sql2 = "select * from users u where u.userid = $1";
  let sql3 = fs.readFileSync("services/user.service/checkKnownStatus.txt", {
    encoding: "utf8",
  });

  let result2 = await pool.query(sql2, [otherUserId]);

  let result3 = await pool.query(sql1, [otherUserId]);

  let result4 = await pool.query(sql3, [otherUserId, userId]);

  result2.rows[0].countfriend = result3.rows[0]?.countfriend || 0;
  result2.rows[0].userStatus = result4.rowCount > 0 ? true : false;

  return result2;
};
