const { mapError } = require("../utils/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hashPassword = async (plainTextPass, next) => {
  try {
    const hash = await bcrypt.hash(plainTextPass, 10);
    return hash;
  } catch (err) {
    console.log(err);
    mapError(500, "Internal Server Error", next);
  }
};

exports.generateJWT = (payload) => {
  let privateKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, privateKey, { expiresIn: "1d" });
  return token;
};

exports.comparePass = async (plainTextPass, hash) => {
  const result = await bcrypt.compare(plainTextPass, hash);
  return result;
};
