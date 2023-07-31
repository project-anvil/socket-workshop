const port = 3002;

const corsConfig = {
  origin: "*",
};

const io = require("socket.io")(port, {
  cors: corsConfig,
});
// event name
io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);

  io.emit("hello", "hello everyone");

  socket.on("new-message", (newMessage) => {
    console.log("new message ", newMessage);
    socket.broadcast.emit("receive-message", newMessage);
  });
});
