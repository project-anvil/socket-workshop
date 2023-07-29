/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { useMessageCreate } from "../hooks";
import "./createMessageForm.css";

export const CreateMessageForm = ({ threadId, threadName, onSuccess }) => {
  const {
    data: newMessage,
    postMessage,
    isSuccess,
  } = useMessageCreate(threadId);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSuccess && newMessage) {
      onSuccess(newMessage);
    }
  }, [isSuccess, newMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageText = inputRef.current.value;
    if (!messageText) return;

    postMessage(messageText);

    inputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="create-message-form">
      <input
        type="text"
        placeholder={`Say stuff about ${threadName}`}
        ref={inputRef}
      />
    </form>
  );
};
