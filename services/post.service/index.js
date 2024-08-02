const { createPost } = require("./createPost");
const { getMyPost } = require("./getMyPost");
const { getStandardPost } = require("./getStandardpost");
const { removePost } = require("./removePost");
const { getOtherUserPost } = require("./getOtherUserPost");
const { getPicturePost } = require("./getPicturePost");
const { editPost } = require("./editPost");

module.exports = {
  createPost,
  getStandardPost,
  getMyPost,
  removePost,
  getOtherUserPost,
  getPicturePost,
  editPost,
};
