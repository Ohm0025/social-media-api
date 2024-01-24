const pool = require("../db/pool");
const jwt = require("jsonwebtoken");

exports.getCookies = async (req, res, next) => {
  try {
    let { sendCookie } = req.body;

    if (sendCookie) {
      const payload = jwt.verify(
        sendCookie,
        process.env.JWT_SECRET_KEY,
        (err, decode) => {
          if (err) {
            return mapError(
              401,
              "token cookies unauthorized please login",
              next
            );
          }
          if (decode) {
            return decode;
          }
        }
      );
      // console.log(payload);
      if (payload) {
        let sql = "select * from users u where u.userid = $1";
        let result = await pool.query(sql, [payload.userId]);
        // console.log(result);
        if (result.rowCount > 0) {
          res.status(200).json({ status: 200, cookies: true });
        } else {
          res.status(400).json({ status: 400, cookie: false });
        }
      }
      // else {
      //   res.status(400).json({ status: 400, cookie: false });
      // }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
