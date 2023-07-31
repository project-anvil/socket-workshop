import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import { useChannels } from "./hooks/useChannels";
import { ThreadList, Thread } from "./components";
import "./App.css";

function App() {
  const { data: threads } = useChannels();
  const [selectedThread, setSelectedThread] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (selectedThread) {
      // connect to socket server
      const socketUrl = "http://localhost:3002";
      setSocket(io(socketUrl));
    }
  }, [selectedThread]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("connected to socket server with id", socket.id);

      socket.on("hello", (arg) => {
        console.log(arg); // world
      });
    });
  }, [socket]);

  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
  };

  return (
    <>
      <h1>Sports Fans</h1>
      <ThreadList threads={threads} onThreadSelect={handleThreadSelect} />
      {selectedThread && <Thread thread={selectedThread} socket={socket} />}
    </>
  );
}

export default App;
