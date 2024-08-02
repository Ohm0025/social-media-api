const pool = require("../../db/pool");
const { mapError } = require("../../utils/apiError");
const { comparePass, generateJWT } = require("../../utils/security");

exports.userLogin = async (req, res, next) => {
  try {
    let { EmailAddressOrPhoneNumber, Password } = req.body;
    let sql = "select * from users u where u.emailorphone = $1";
    let result = await pool.query(sql, [
      EmailAddressOrPhoneNumber ? EmailAddressOrPhoneNumber : "",
    ]);
    if (result.rowCount > 0) {
      let getHashPass = result.rows[0].password;
      let isValidPass = await comparePass(Password, getHashPass);
      if (isValidPass) {
        let token = generateJWT({ userId: result.rows[0].userid });
        res
          .status(200)
          .json({ status: 200, data: token, message: "login success" });
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
