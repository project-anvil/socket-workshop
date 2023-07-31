# Socket.io Server

Facilitates bi-directional communication channel between a client and a server

## Server Setup

add socket.io library to the server repo

- `yarn add socket.io` or `npm i socket.io`

Listen for connections

-

```js
const io = require("socket.io")(3002, {
  cors: {
    origin: ["http://127.0.0.1:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);
});
```

## Client Setup

add socket.io-client library to the client repo

- `yarn add socket.io-client` or `npm i socket.io-client`

```js
import { io } from "socket.io-client";

const newSocket = io(url, optionalConfig);
```

- Listen for events

```js
socket.on("connect", () => {
  console.log(socket.id);
});
```

### Emit an event from client

```js
socket.emit("name-of-custom-event", args);
```

## Listening for events on server

```js
io.on("connection", (socket) => {
  socket.on("some-event", (argsSentByClient) => {
    // we may want to emit messages to other clients
    console.log(argsSentByClient);
  });
});
```

## Emitting Events from server

```js
io.on("connection", (socket) => {
  socket.on("some-event", (argsSentByClient) => {
    // we may want to emit messages to other clients
    // sends to every single socket, including sender
    io.emit("receive-message", argsSentByClient);

    // sends to only all others in the namespace
    io.broadcast.emit("receive-message", argsSentByClient);
  });
});
```

### Emit an event from client to a specific room

```js
socket.to(room).emit("name-of-custom-event", args);
```

## Emitting Events from server to a room

```js
io.on("connection", (socket) => {
  socket.on("some-event", (argsSentByClient) => {
    // we may want to emit messages to other clients
    // sends to every single socket, including sender
    io.emit("receive-message", argsSentByClient);

    // sends to only all others in the namespace
    socket.to().emit("receive-message", argsSentByClient);
  });
});
```
