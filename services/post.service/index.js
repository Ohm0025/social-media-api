const { createPost } = require("./createPost");
const { getMyPost } = require("./getMyPost");
const { getStandardPost } = require("./getStandardpost");
const { removePost } = require("./removePost");
const { getOtherUserPost } = require("./getOtherUserPost");
const { getPicturePost } = require("./getPicturePost");

module.exports = {
  createPost,
  getStandardPost,
  getMyPost,
  removePost,
  getOtherUserPost,
  getPicturePost,
};
