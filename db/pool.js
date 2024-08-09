const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

const pool = new Pool({
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.PORTDB,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

module.exports = pool;
