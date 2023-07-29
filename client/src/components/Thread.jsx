/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useChannelMessages } from "../hooks";
import { CreateMessageForm } from "./CreateMessageForm";
import "./thread.css";

export const Thread = ({ thread }) => {
  const { data: messages } = useChannelMessages(thread.id);
  const [allMessages, setAllMessages] = useState(messages);

  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  const handleSuccessfulMessage = (newMessage) => {
    setAllMessages([...allMessages, newMessage]);
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
