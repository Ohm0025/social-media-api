const express = require("express");
const userRouter = require("./user.route");
const postRouter = require("./post.route");
const friendRouter = require("./friend.route");
const commentRouter = require("./comment.route");
const likeRouter = require("./like.route");
const authen = require("../middleware/authen");
const chatRouter = require("./chat.route");
const uploadPicture = require("../middleware/upload");
const { getCookies } = require("../controllers/cookie.controller");
const { createUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

router.post("/cookies", getCookies);
router.post("/register", createUser);
router.post("/login", loginUser);

router.use(authen, uploadPicture);
router.use("/post", postRouter);
router.use("/user", userRouter);
router.use("/friend", friendRouter);
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/chat", chatRouter);

module.exports = router;
