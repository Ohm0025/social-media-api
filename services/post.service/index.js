const { createPost } = require("./createPost");
const { getMyPost } = require("./getMyPost");
const { getStandardPost } = require("./getStandardpost");
const { removePost } = require("./removePost");
const { getOtherUserPost } = require("./getOtherUserPost");

module.exports = {
  createPost,
  getStandardPost,
  getMyPost,
  removePost,
  getOtherUserPost,
};
