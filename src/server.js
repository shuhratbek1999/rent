const express = require("express");
const app = express();
require("./startup/logging")();
require("./startup/db")();
const { port } = require("./startup/config");
require("./startup/routes")(app);
const jwt = require("jsonwebtoken");
const Elon = require("../src/controllers/admin-app/elon.controller");
const server = app.listen(port, () =>
  console.log(`🚀 Server running on port ${port}!`)
);

// Socket.io sozlamalari
const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Autentifikatsiya middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    if (!token) {
      return next(new Error("Authentication error: Token required"));
    }

    const payload = await jwt.verify(token, process.env.SECRET_JWT);
    socket.userId = payload.user_id;
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
});

// Socket modullari
const Status = require("./sockets/status");
const Date = require("./sockets/Date");
const Chat = require("./sockets/chat");

// Asosiy ulanish handleri
const onConnection = (socket) => {
  console.log(`User connected: ${socket.userId}`);

  // Modullarni ishga tushirish
  Status(io, socket);
  Date(io, socket);
  Chat(io, socket); // Yangilangan chat moduli
  Elon.socketConnect(io, socket);

  socket.on("disconnect", () => {
    Date(io, socket, false);
    console.log(`User disconnected: ${socket.userId}`);
  });
};

io.on("connection", onConnection);

module.exports = server;
