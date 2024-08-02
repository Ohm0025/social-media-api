const express = require("express");
const {
  updateUser,
  createUser,
  loginUser,
  getOtherUserProfile,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.patch("/", updateUser);
userRouter.post("/getOtherUserProfile", getOtherUserProfile);

module.exports = userRouter;
