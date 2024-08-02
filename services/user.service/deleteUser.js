const pool = require("../../db/pool");

exports.selfDelete = async (userId) => {
  let sql = "delete from users where userid = $1";
  let result = await pool.query(sql, [userId]);
  return result;
};
