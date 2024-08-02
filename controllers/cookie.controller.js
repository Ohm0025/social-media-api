const pool = require("../db/pool");
const jwt = require("jsonwebtoken");
const { mapError } = require("../utils/apiError");

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
        let sql =
          "select u.* , count(case when f.status = 'accept' then f.friendid end) as countFriend from users u left join friends f on u.userid = f.accepterid or u.userid = f.requesterid where u.userid = $1 group by u.userid";
        let result = await pool.query(sql, [payload.userId]);
        // console.log(result);
        if (result.rowCount > 0) {
          res
            .status(200)
            .json({ status: 200, cookies: true, data: result.rows[0] });
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
