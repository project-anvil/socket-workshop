/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useChannelMessages } from "../hooks";
import { CreateMessageForm } from "./CreateMessageForm";
import "./thread.css";

export const Thread = ({ thread, socket }) => {
  const { data: messages } = useChannelMessages(thread.id);
  const [allMessages, setAllMessages] = useState(messages);

  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  useEffect(() => {
    socket?.on("receive-message", (newMessage) => {
      setAllMessages([...allMessages, newMessage]);
    });
  }, [socket, allMessages]);

  const handleSuccessfulMessage = (newMessage) => {
    setAllMessages([...allMessages, newMessage]);

    console.log(socket.id);
    socket.emit("new-message", newMessage);
  };

  return (
    <>
      <CreateMessageForm
        threadId={thread.id}
        threadName={thread.name}
        onSuccess={handleSuccessfulMessage}
      />
      <ul className="message-list">
        {allMessages?.map((message) => (
          <li key={message.id}>
            <h3>{message.text}</h3>
          </li>
        ))}
      </ul>
    </>
  );
};
