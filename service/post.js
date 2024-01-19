const { mapError } = require("../utils/apiError");
const pool = require("../db/pool");

exports.createPostText = async (req, res, next) => {
  try {
    let { postText } = req.body;
    let sql =
      "insert into posts(post_content,post_date,userid) values($1,$2,$3) RETURNING *";
    let date_now = new Date();
    let result = await pool.query(sql, [postText, date_now, req.userId]);
    console.log(result.rows);
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ status: 201, data: result, message: "create post success" });
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
