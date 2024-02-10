const pool = require("../../db/pool");
const fs = require("fs");

exports.getSuggest = async (userid) => {
  let sql = fs.readFileSync("services/friend.service/getSuggestText.txt", {
    encoding: "utf8",
  });
  let sql1 = fs.readFileSync("services/friend.service/getAllUserCount.txt", {
    encoding: "utf8",
  });
  let result0 = await pool.query(sql1, [userid]);

  let countAllUser = Number(result0.rows[0].count);

  let randomOffset = Number(Math.floor(Math.random() * countAllUser));

  let calOffSetLimit = () => {
    if (countAllUser <= 5) {
      return { limit: 5, offset: 0 };
    } else {
      if (randomOffset + 5 <= countAllUser) {
        return { limit: 5, offset: randomOffset };
      } else {
        let newRange = countAllUser - 4;
        let randomNewoffset = Number(Math.floor(Math.random() * newRange));
        return { limit: 5, offset: randomNewoffset };
      }
    }
  };

  let executeOffset = calOffSetLimit();

  let result = await pool.query(sql, [userid, 5, executeOffset.offset]);

  return result;
};
