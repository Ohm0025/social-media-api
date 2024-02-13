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

let connectedUsers = [];

io.on("connection", (socket) => {
  console.log(`User connected with ID: ${socket.id}`);

  socket.on("registChatUser", (userid) => {
    if (connectedUsers.indexOf((item) => item.userid === userid) >= 0) {
      connectedUsers = connectedUsers.map((item) => {
        if (item.userid === userid) {
          return { ...item, socketId: socket.id };
        } else {
          return item;
        }
      });
    } else {
      connectedUsers.push({ userid, socketId: socket.id });
    }
  });

  socket.on("chat", (message, senderid, targetid) => {
    let targetSocketId = connectedUsers.find(
      (item) => item.userid === targetid
    );

    io.to(targetSocketId?.socketId).emit("chat", message);
  });

  socket.on("disconnect", () => {
    connectedUsers = connectedUsers.filter(
      (item) => item.socketId !== socket.id
    );
  });
});

server.listen(port, () => console.log("server run on " + port));
