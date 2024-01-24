const express = require("express");
const {
  updateUser,
  createUser,
  loginUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route("/user").patch(updateUser).post(createUser);
userRouter.route("/login").post(loginUser);

module.exports = userRouter;
