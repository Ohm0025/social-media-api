const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");

const { apiError } = require("./utils/apiError");
const router = require("./router/router");

const app = express();

dotenv.config({ path: "config.env" });
const port = process.env.PORT || 8080;
const node_env = process.env.NODE_ENV || "dev";

app.use(cors());
app.use(express.urlencoded({ extended: false }));
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

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log(`User connected with ID: ${socket.id}`);

  socket.emit("your socket id", { socketId: socket.id });

  socket.on("private message", ({ recipient, message }) => {
    io.to(recipient).emit("private message", {
      sender: socket.id,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

server.listen(port, () => console.log("server run on " + port));
