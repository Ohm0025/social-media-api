const jwt = require("jsonwebtoken");
const { mapError } = require("../utils/apiError");
const pool = require("../db/pool");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return mapError(401, "unauthorized please login", next);
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return mapError(401, "unauthorized please login", next);
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err, decode) => {
        if (err) {
          return mapError(401, "unauthorized please login", next);
        }
        if (decode) {
          return decode;
        }
      }
    );

    let sql = "select * from users u where u.userid = $1";
    let result = await pool.query(sql, [payload.userId]);
    if (!result.rowCount > 0) {
      return mapError(401, "unauthorized please login", next);
    }
    req.userId = result.rows[0].userid;

    next();
  } catch (err) {
    next(err);
  }
};
