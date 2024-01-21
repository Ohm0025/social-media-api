const express = require("express");
const { createUser, deleteUser } = require("../service/register");
const { userLogin } = require("../service/login");
const { getMoreFriend } = require("../service/friend");
const pool = require("../db/pool");
const jwt = require("jsonwebtoken");
const {
  createPostText,
  getMyPost,
  createPostImgText,
} = require("../service/post");
const authen = require("../middleware/authen");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: 200, data: "get method" });
});

router.post("/cookies", async (req, res, next) => {
  let { sendCookie } = req.body;
  console.log(req.body);
  if (sendCookie) {
    const payload = jwt.verify(sendCookie, process.env.JWT_SECRET_KEY);
    // console.log(payload);
    let sql = "select * from users u where u.userid = $1";
    let result = await pool.query(sql, [payload.userId]);
    // console.log(result);
    if (result.rowCount > 0) {
      res.status(200).json({ status: 200, cookies: true });
    } else {
      res.status(400).json({ status: 400, cookie: false });
    }
  } else {
    res.status(400).json({ status: 400, cookie: false });
  }
});
router.post("/register", createUser);
router.post("/login", userLogin);
router.delete("/:id", deleteUser);

router.post("/postOnlyText", authen, createPostText);
router.get("/getMyPost", authen, getMyPost);
router.post("/postTextImg", authen, upload.single("image"), createPostImgText);

router.post("/getMoreFriend", authen, getMoreFriend);

module.exports = router;
