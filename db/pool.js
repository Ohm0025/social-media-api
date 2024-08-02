const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

const pool = new Pool({
  database: "final_project",
  host: "localhost",
  port: 54320,
  user: "admin",
  password: "admin",
});

module.exports = pool;
