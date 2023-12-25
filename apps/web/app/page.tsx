// Page.tsx
"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    sendMessage(inputMessage);
    setInputMessage(""); // Clear input after sending message
  };

  return (
    <div>
      <div className={classes["box"]}>
        <h2 className={classes["box-heading"]}>Group Chat App</h2>
        <div>
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className={classes["chat-input"]}
            placeholder="Message..."
          />
          <button
            onClick={handleSendMessage}
            className={classes["button"]}
          >
            Send
          </button>
        </div>
        <div className={classes["chats"]}>
          {messages.map(({ text, timestamp }, index) => (
            <li key={index} className={classes["lists"]}>
              {`${text} - ${timestamp}`} 
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
