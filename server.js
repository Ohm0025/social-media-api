const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");

const { apiError } = require("./utils/apiError");
const router = require("./routes/router");
const bodyParser = require("body-parser");

const app = express();

dotenv.config({ path: "config.env" });
const port = process.env.PORT || 8080;
const node_env = process.env.NODE_ENV || "dev";

app.use(cors());
app.use(bodyParser.json());
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
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const connectedUsers = {};

io.on("connection", (socket) => {
  console.log(`User connected with ID: ${socket.id}`);

  socket.emit("your socket id", { socketId: socket.id });

  socket.on("authenticate", (data) => {
    const { userId } = data;
    connectedUsers[userId] = socket.id;
    console.log(connectedUsers);
  });

  socket.on("private_message", ({ recipient, message }) => {
    console.log(message);
    console.log(recipient);
    const recipientSocketId = connectedUsers[recipient];
    console.log(recipientSocketId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("private_message", {
        sender: socket.id,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnect: ", socket.id);
  });
  for (const [userId, socketId] of Object.entries(connectedUsers)) {
    if (socketId === socket.id) {
      delete connectedUsers[userId];
      console.log(`User with ID ${userId} disconnected.`);
    }
  }
});

server.listen(port, () => console.log("server run on " + port));
