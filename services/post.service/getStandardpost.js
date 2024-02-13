const pool = require("../../db/pool");
const fs = require("fs");

exports.getStandardPost = async (userid, limit, postType) => {
  let sql1 = fs.readFileSync("services/post.service/getStandardPostText.txt", {
    encoding: "utf8",
  });

  let sql2 = fs.readFileSync("services/post.service/getFriendPostText.txt", {
    encoding: "utf8",
  });

  let sql3 = fs.readFileSync("services/post.service/getPrivatePost.txt", {
    encoding: "utf8",
  });

  let arrQuery = () => {
    if (postType === "Private") {
      return {
        sql: sql3,
        arr: [userid, "private"],
      };
    } else if (postType === "Friends") {
      console.log("get friend post");
      return {
        sql: sql2,
        arr: [userid, "accept"],
      };
    } else {
      return {
        sql: sql1,
        arr: [userid],
      };
    }
  };

  let finalPara = arrQuery();

  let result = await pool.query(finalPara.sql, finalPara.arr);

  let sqlCheckLike =
    "select * from like_post l where userid = $1 and postid = $2";
  let checkLike = async (postid) => {
    let result = await pool.query(sqlCheckLike, [userid, postid]);
    return result.rowCount > 0;
  };

  let modArr = await Promise.all(
    result.rows?.map(async (element) => {
      let check = await checkLike(element.postid);
      return { ...element, thisUserLike: check };
    })
  );

  return { rows: modArr, rowCount: modArr.length };
};
