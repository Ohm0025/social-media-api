const pool = require("../../db/pool");

exports.acceptFriend = async (friendid) => {
  let now_date = new Date();
  let sql = "UPDATE friends SET accepterdate=$2, status=$3 WHERE friendid=$1";
  let result = await pool.query(sql, [friendid, now_date, "accept"]);

  return result;
};
