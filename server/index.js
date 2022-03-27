const dotenv = require('dotenv');
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
dotenv.config({ path: "./config/config.env" });
const connectDatabase = require("./config/db.connection");
const ChatContent = require("./models/ChatContent.model");

connectDatabase()
// if (connectDatabase()) {
// console.log("Database connected", connectDatabase());
// }
//////////////
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route imports
const ChatMessage = require("./routes/chatMessage.route");

app.use("/api/v1", ChatMessage);

// config

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let count;
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // how many user are on the chat application at the moment
  count = socket.client.conn.server.clientsCount;
  io.sockets.emit("counter", { count: count });


  socket.on("join_room", (data) => {
    // console.log("data", data);
    socket.join(data);
    console.log(`room User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("data>>>>>>>>>>", data);
    // connnect to database for saving the messages
    // connectDatabase.then((db) => {
    //   console.log("connected to database");
    //   let chatMessage = new ChatContent({
    //     message: data.message,
    //     sender: data.author,
    //   });
    //   chatMessage.save();
    // });
    let chatMessage = new ChatContent({
      message: data.message,
      sender: data.author,
      roomId: data.room,
      time: data.time,
    });
    chatMessage.save();

  });


  socket.on("disconnect", () => {
    // count of disconnected users
    count = socket.client.conn.server.clientsCount;
    socket.broadcast.emit("counter", { count: count });

    // console.log("User Disconnected", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
