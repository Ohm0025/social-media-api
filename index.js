const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { apiError } = require("./utils/apiError");
const router = require("./router/router");

const app = express();

dotenv.config({ path: "config.env" });
const port = process.env.PORT || 8080;
const node_env = process.env.NODE_ENV || "dev";

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan(node_env));

app.use("/", router);

app.all("*", (req, res, next) => {
  const err = new Error(`Path ${req.originalUrl} not found in server`);
  err.statusCode = 404;
  next(err);
});
app.use(apiError);

app.listen(port, () => console.log("server run on " + port));
