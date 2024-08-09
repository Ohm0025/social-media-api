const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

const pool = new Pool({
  database: "railway",
  host: "monorail.proxy.rlwy.net",
  port: 46088,
  user: "postgres",
  password: "mFPugGZuxevMcwNSExOPaYuvbFOOsVCc",
});

module.exports = pool;
