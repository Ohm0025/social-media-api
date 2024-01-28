const pool = require("../../db/pool");
const {
  queryUpdateUser,
  variablePostgress,
} = require("../../utils/formatQuery");

exports.updateUser = async (updateObj, userId) => {
  let { profile_picture, profile_cover, description } = updateObj;
  let queryString = queryUpdateUser(
    [profile_picture, profile_cover, description],
    ["profile_picture", "profile_cover", "description"]
  );
  let sql = `UPDATE users SET ${queryString.text} WHERE userid = $${queryString.lastIndex} RETURNING *`;
  //let sql = "UPDATE users SET profile_picture= $1 WHERE userid=$2";
  let result = await pool.query(sql, [
    ...variablePostgress([profile_picture, profile_cover, description]),
    userId,
  ]);
  return result;
};
