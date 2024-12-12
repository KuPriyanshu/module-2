const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const { addUser, getUser, removeUser } = require("./utils/users");

// // Create PeerJS server (you can remove this if you're already running a separate PeerJS server)
// const { PeerServer } = require("peer");
// const peerServer = PeerServer({
//   host: "localhost",
//   port: 5000, // Port 5001 is now for PeerJS
//   path: "/",
// });
// app.use(peerServer);

const io = new Server(server);

// Routes
app.get("/", (req, res) => {
  res.send("This is whiteboard server");
});

let roomIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    const users = addUser({
      name,
      userId,
      roomId,
      host,
      presenter,
      socketId: socket.id,
    });
    socket.emit("userIsJoined", { success: true, users });
    console.log({ name, userId });
    socket.broadcast.to(roomId).emit("allUsers", users);
    setTimeout(() => {
      socket.broadcast
        .to(roomId)
        .emit("userJoinedMessageBroadcasted", { name, userId, users });
      socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
        imgURL: imgURLGlobal,
      });
    }, 1000);
  });

  socket.on("whiteboardData", (data) => {
    imgURLGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
      imgURL: data,
    });
  });

  socket.on("message", (data) => {
    const { message } = data;
    const user = getUser(socket.id);
    if (user) {
      socket.broadcast
        .to(roomIdGlobal)
        .emit("messageResponse", { message, name: user.name });
    }
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    if (user) {
      removeUser(socket.id);
      socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadcasted", {
        name: user.name,
        userId: user.userId,
      });
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () =>
  console.log(`Socket.IO server is running on http://localhost:${port}`)
);
