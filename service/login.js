const pool = require("../db/pool");
const { mapError } = require("../utils/apiError");
const { comparePass, generateJWT } = require("../utils/security");

exports.userLogin = async (req, res, next) => {
  try {
    let { email, phone, password } = req.body;
    let sql = "select * from users u where u.email = $1 or u.phone = $2";
    let result = await pool.query(sql, [
      email ? email : "",
      phone ? phone : "",
    ]);
    if (result.rowCount > 0) {
      let getHashPass = result.rows[0].password;
      let isValidPass = await comparePass(password, getHashPass);
      if (isValidPass) {
        let token = generateJWT({ userId: result.rows[0].userId });
        res.status(200).json({ status: 200, data: token });
      } else {
        mapError(400, "password invalid", next);
      }
    } else {
      mapError(400, "email/phone invalid", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};
