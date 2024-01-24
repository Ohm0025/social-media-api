const pool = require("../../db/pool");
const { comparePass, generateJWT } = require("../../utils/security");

exports.loginUser = async (username, password) => {
  let sql = "select * from users u where u.emailorphone = $1";
  let result = await pool.query(sql, [username]);
  if (result.rowCount > 0) {
    let getHashPass = result.rows[0].password;
    let isValidPass = await comparePass(password, getHashPass);
    if (isValidPass) {
      let token = generateJWT({ userId: result.rows[0].userid });
      return token;
    }
  }
};
