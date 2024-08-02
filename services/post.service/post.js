const { mapError } = require("../../utils/apiError");
const pool = require("../../db/pool");

exports.createPostText = async (req, res, next) => {
  try {
    let { postText, postType } = req.body;
    let sql =
      "insert into posts(post_content,post_date,post_type,userid) values($1,$2,$3,$4) RETURNING *";
    let date_now = new Date();
    let result = await pool.query(sql, [
      postText,
      date_now,
      postType,
      req.userId,
    ]);
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

exports.getStandardPost = async (req, res, next) => {
  try {
    let sql =
      "select p.post_content,p.post_date , p.post_picture from posts p left join comments c on c.postid = p.postid left join users u on u.userid = p.userid left join friends f on f.requesterid = u.userid or f.accepterid = u.userid left join users u2 on f.requesterid = u2.userid or f.accepterid = u2.userid where post_type = $1 or (post_type = $2 and f.status = $3 and u2.userid != $4) or (u.userid = $4 and u2.userid != $4) order by post_date desc";
    let result = await pool.query(sql, [
      "public",
      "only_friend",
      "accept",
      req.userId,
    ]);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "fetch public post success",
      });
    } else {
      mapError(500, "fetch public post error", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.getMyPost = async (req, res, next) => {
  try {
    let sql =
      "select p.post_content ,p.postid , p.post_picture , u.firstname , u.lastname , p.post_date from posts p left join users u on p.userid = u.userid where u.userid = $1 order by p.post_date desc,p.postid desc";
    let result = await pool.query(sql, [req.userId]);
    if (result.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: result.rows,
        message: "fetch my post success",
      });
    } else {
      mapError(500, "fetch my post failure", next);
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};

exports.createPostImgText = async (req, res, next) => {
  try {
    let { postText, postType } = req.body;
    let now_date = new Date();
    let pathPic = req.file ? req.file.path : "";
    let sql =
      "insert into posts(post_content,post_picture,post_date,post_type,userid) values($1,$2,$3,$4,$5) RETURNING *";
    let result = await pool.query(sql, [
      postText,
      pathPic,
      now_date,
      postType,
      req.userId,
    ]);
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ status: 201, data: result, message: "create post success" });
    } else {
      res
        .status(500)
        .json({ status: 500, data: result, message: "create post failure" });
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

exports.removePost = async (req, res, next) => {
  try {
    let { postid } = req.body;
    let sql = "DELETE FROM posts WHERE postid=$1";
    let result = await pool.query(sql, [postid]);
    console.log(postid);
    if (result.rowCount > 0) {
      res.status(201).json({ status: 201, message: "delete post success" });
    } else {
      res
        .status(500)
        .json({ status: 500, data: result, message: "delete post failure" });
    }
  } catch (err) {
    console.log(err);
    mapError(500, "internal server error", next);
  }
};
