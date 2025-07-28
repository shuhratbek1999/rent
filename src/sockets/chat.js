const onlineUsers = new Map();
function getRoomName(userB, userA) {
  const [id1, id2] = [userB, userA].sort((a, b) => a - b);
  return `room_${id1}_${id2}`;
}
const { Xabar } = require("../../models/init-models");
module.exports = (io, socket) => {
  if (!socket.registered) {
    socket.registered = true;
    socket.on("register_user", (userId) => {
      socket.userId = String(userId);
      onlineUsers.set(String(userId), socket.id);
      io.emit("user_online", userId);
      // console.log(`Foydalanuvchi ${userId} online`);
    });

    socket.on("join_room", ({ myId, otherUserId }, callback) => {
      const room = getRoomName(otherUserId, myId);
      if (!socket.rooms.has(room)) {
        socket.join(room);
        console.log(`User ${socket.userId} joined room ${room}`);
      }
      callback({ success: true, room });
    });

    socket.on("send_private_message", async (data) => {
      let { receiverId, message, read } = data;
      // console.log(data);
      receiverId = String(receiverId);
      const room = getRoomName(socket.userId, receiverId);
      const msgObj = {
        sender_id: socket.userId,
        receiverId,
        message,
        time: new Date().toISOString(),
        read,
      };
      io.to(room).emit("receive_private_message", msgObj);
      // Agar oluvchi online bo‘lsa — notification
      const toSocketId = onlineUsers.get(receiverId);
      if (toSocketId) {
        io.to(toSocketId).emit("new_notification", {
          type: "chat",
          from: socket.userId,
          msg: {
            sender_id: socket.userId,
            message,
            time: new Date(),
            read,
            receiverId,
          },
        });
      }
      try {
        await Xabar.create({
          sender_id: msgObj.sender_id,
          receiverId,
          message,
          time: msgObj.time,
          read,
        });
        console.log("Xabar bazaga saqlandi");
      } catch (err) {
        console.error("Xabarni saqlashda xatolik:", err);
      }
      // callback({ message: msgObj });
    });
    socket.on("mark_as_read", ({ receiverId, senderId }) => {
      const toSocketId = onlineUsers.get(String(senderId)); // Qarama-qarshi foydalanuvchi
      // console.log(senderId, toSocketId, "tooo");
      if (toSocketId) {
        io.to(toSocketId).emit("messages_read", { receiverId });
      }
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        io.emit("user_offline", socket.userId);
      }
      console.log(`User disconnected: ${socket.userId}`);
    });
  }
};
