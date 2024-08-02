const pool = require("../../db/pool");
const fs = require("fs");

exports.getMoreFriend = async (userid, searchName) => {
  if (searchName.trim() !== "") {
    let sql = fs.readFileSync("services/friend.service/getMoreFriend.txt", {
      encoding: "utf8",
    });
    let result = await pool.query(sql, [userid, searchName + "%"]);
    console.log(result.rows);
    return result;
  }
  let sql =
    "select DISTINCT * from users u1 left join friends f on u1.userid = f.requesterid or u1.userid = f.accepterid where u1.userid != $1 and f.status is null";
  let result = await pool.query(sql, [userid]);
  return result;
};
