import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "localhost:3002/";

function App() {
  //Before Login
  const [loggedIn, setLoggedIn] = useState(true);
  const [room, setRoom] = useState("2023");
  const [userName, setUserName] = useState("");
  //After Login
  const [message, setMessage] = useState("");
  const [messageContainer, setMessageContainer] = useState([
    { author: "Artur", message: "Hello" },
  ]);

  useEffect(() => {
    socket = io(CONNECTION_PORT, { transports: ["websocket"] });
  }, [CONNECTION_PORT]);

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
    socket.emit("send_message", messageContent);
    setMessageContainer([...messageContainer, messageContent.content]);
    setMessage("");
  };
  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Name..."
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="ChatRoom..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages">
            {messageContainer.map((val, key) => {
              return (
                <h1>
                  {val.author} {val.message}
                </h1>
              );
            })}
          </div>
          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
