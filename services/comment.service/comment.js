const pool = require("../../db/pool");
const { mapError } = require("../../utils/apiError");

exports.createComment = async (req, res, next) => {
  try {
    let { commentText, postid } = req.body;
    let sql1 =
      "insert into posts(post_content,post_picture,post_date,userid,parentid,post_type) values($1,$2,$3,$4,$5) RETURNING *";
    // let sql2 =
    //   "insert into comments(comment_content,comment_date,postid,userid) values($1,$2,$3,$4) RETURNING *";
    let now_date = new Date();
    let result = await pool.query(sql1, [
      commentText,
      req.file.path,
      now_date,
      req.userId,
      postid,
      "iscomment",
    ]);
    if (result.rowCount > 0) {
      res.status(201).json({ status: 201, message: "create comment success" });
    } else {
      res.status(400).json({
        status: 400,
        data: result,
        message: "create comment failure",
      });
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};
