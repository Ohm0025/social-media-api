const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "srv1563.hstgr.io",
  user: "u165164327_toyohm0025",
  password: "Resident41!",
  database: "u165164327_social_media",
  waitForConnections: true,
  port: "3306",
});

module.exports = pool;
