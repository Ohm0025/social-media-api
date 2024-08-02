const pool = require("../../db/pool");
const fs = require("fs");

exports.getMyPost = async (userid, limit, postType) => {
  let sql1 = fs.readFileSync("services/post.service/getMyPOst.txt", {
    encoding: "utf8",
  });

  let sql2 = fs.readFileSync("services/post.service/getMyPost2.txt", {
    encoding: "utf8",
  });

  // ["All", "Friends", "Private"];
  let selectPostType = () => {
    if (postType === "All") {
      return {
        sql: sql2,
        arr: [userid],
      };
    } else if (postType === "Friends") {
      return {
        sql: sql1,
        arr: [userid, "only_friend"],
      };
    } else if (postType === "Private") {
      return {
        sql: sql1,
        arr: [userid, "private"],
      };
    }
  };

  let selectPost = selectPostType();

  let result = await pool.query(selectPost.sql, selectPost.arr);

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
