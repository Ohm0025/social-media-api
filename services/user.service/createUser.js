const { hashPassword } = require("../../utils/security");
const pool = require("../../db/pool");

exports.createUser = async (inputObj) => {
  let sql =
    "INSERT INTO users (firstname,lastname,emailorphone,password,birthdate,profile_picture,profile_cover,register_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
  let date_now = new Date();
  let hashPass = await hashPassword(inputObj.Password);
  let result = await pool.query(sql, [
    inputObj.FirstName,
    inputObj.LastName,
    inputObj.EmailAddressOrPhoneNumber,
    hashPass,
    inputObj.BirthDate,
    inputObj.profile_picture,
    inputObj.profile_cover,
    date_now,
  ]);

  return result;
};
