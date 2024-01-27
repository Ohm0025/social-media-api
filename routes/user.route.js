const express = require("express");
const {
  updateUser,
  createUser,
  loginUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.patch("/", updateUser);

module.exports = userRouter;
