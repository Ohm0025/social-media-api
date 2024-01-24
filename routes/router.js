const express = require("express");
const userRouter = require("./user.route");
const postRouter = require("./post.route");
const authen = require("../middleware/authen");
const uploadPicture = require("../middleware/upload");
const { getCookies } = require("../controllers/cookie.controller");

const router = express.Router();

router.use(getCookies);
router.use(authen, uploadPicture, userRouter);
router.use(authen, uploadPicture, postRouter);

module.exports = router;
