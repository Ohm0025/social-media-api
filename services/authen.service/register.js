const { mapError } = require("../../utils/apiError");
const pool = require("../../db/pool");
const { hashPassword, generateJWT } = require("../../utils/security");

exports.createUser = async (req, res, next) => {
  try {
    let {
      FirstName,
      LastName,
      EmailAddressOrPhoneNumber,
      Password,
      BirthDate,
      profile_picture,
      profile_cover,
    } = req.body;

    let sql =
      "INSERT INTO users (firstname,lastname,emailorphone,password,birthdate,profile_picture,profile_cover,register_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";

    let date_now = new Date();
    let hashPass = await hashPassword(Password, next);
    let result = await pool.query(sql, [
      FirstName,
      LastName,
      EmailAddressOrPhoneNumber,
      hashPass,
      BirthDate,
      profile_picture,
      profile_cover,
      date_now,
    ]);
    if (result.rowCount > 0) {
      const token = generateJWT({
        userId: result.rows[0].userId,
        EmailAddressOrPhoneNumber,
        hashPass,
      });
      res
        .status(200)
        .json({ status: 200, data: token, message: "create user success" });
    } else {
      res.status(500).json({ status: 500, date: "resgister error" });
    }
  } catch (err) {
    console.log(err);
    if (err.constraint) {
      mapError(400, err.detail, next);
    } else {
      mapError(500, "internal server error", next);
    }
  }
};

exports.deleteUser = async (req, res, next) => {
  //create verify token first
  try {
    let { userId } = req.body;
    console.log(req.cookies);
    res.status(200).json({ status: 200, data: req.cookies });
  } catch (err) {
    console.log(err);
  }
};
