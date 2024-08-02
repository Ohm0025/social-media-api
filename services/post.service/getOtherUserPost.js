const pool = require("../../db/pool");
const fs = require("fs");

exports.getOtherUserPost = async (userid, otherid) => {
  // let sql =
  //   "select distinct(p.postid),p.post_date,p.post_picture,p.post_content,f.friendid,u.profile_picture,u.profile_cover,u.firstname,u.lastname,u.description,u.userid,count(distinct l.postid) count_like , count(distinct p2.postid) count_comment from friends f left join posts p2 on p2.parentid = p.postid left join like_post l on l.postid = p.postid left join users u on f.requesterid = u.userid or f.accepterid = u.userid left join posts p on p.userid = u.userid where p.parentid isnull and u.userid = $3 and f.status = $2 and (f.requesterid = $1 or f.accepterid = $1) and p.postid is not null group by (p.postid,u.firstname,u.lastname,u.profile_picture,l.userid,u.userid) order by p.post_date desc,p.postid desc";

  let sql = fs.readFileSync("services/post.service/text.txt", {
    encoding: "utf8",
  });

  let result = await pool.query(sql, [userid, "accept", otherid]);
  if (result.rowCount > 0) {
    console.log("run sql 1");
    return result;
  }
  let sql2 = fs.readFileSync("services/post.service/text2.txt", {
    encoding: "utf8",
  });

  let result2 = await pool.query(sql2, [otherid, "public"]);

  if (result2.rowCount > 0) {
    console.log("run sql 2");

    return result2;
  } else {
    let sql3 = "select * from users u where u.userid = $1";
    let result3 = await pool.query(sql3, [otherid]);

    let sendObj = {
      userid: result3.rows[0].userid,
      description: result3.rows[0].description,
      profile_picture: result3.rows[0].profile_picture,
      profile_cover: result3.rows[0].profile_cover,
      firstname: result3.rows[0].firstname,
      lastname: result3.rows[0].lastname,
    };
    result3.sendObj = sendObj;
    result3.rows = [];
    result3.rowCount = 1;

    console.log("run sql 3");
    return result3;
  }
};
