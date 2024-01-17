const express = require("express");
const { createUser, deleteUser } = require("../service/register");
const { userLogin } = require("../service/login");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: 200, data: "get method" });
});

router.post("/register", createUser);
router.post("/login", userLogin);
router.delete("/:id", deleteUser);

module.exports = router;
