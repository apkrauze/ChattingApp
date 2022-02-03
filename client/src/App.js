import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "localhost:3002/";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket = io(CONNECTION_PORT, { transports: ["websocket"] });
  }, [CONNECTION_PORT]);

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
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
          <div className="messages"></div>
          <div className="messageInputs">
            <input type="text" placeholder="Message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
