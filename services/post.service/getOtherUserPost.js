const pool = require("../../db/pool");

exports.getOtherUserPost = async (userid, otherid) => {
  let sql =
    "select p.post_date,p.post_picture,p.post_content,p.postid,f.friendid,u.profile_picture,u.profile_cover,u.firstname,u.lastname,u.description from friends f left join users u on f.requesterid = u.userid or f.accepterid = u.userid left join posts p on p.userid = u.userid where u.userid = $3 and f.status = $2 and (f.requesterid = $1 or f.accepterid = $1) and p.postid is not null";

  let result = await pool.query(sql, [userid, "accept", otherid]);
  if (result.rowCount > 0) {
    return result;
  }
  let sql2 =
    "select * from users u left join posts p on u.userid = p.userid where u.userid = $1 and p.post_type = $2";
  let result2 = await pool.query(sql2, [otherid, "public"]);
  if (result2.rowCount > 0) {
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

    return result3;
  }
};
