const { updateUser } = require("./updateUser");
const { createUser } = require("./createUser");
const { loginUser } = require("./loginUser");
const { selfDelete } = require("./deleteUser");
const { getOtherUserProfile } = require("./getOtherUserProfile");

module.exports = {
  updateUser,
  createUser,
  loginUser,
  selfDelete,
  getOtherUserProfile,
};
