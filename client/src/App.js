import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import store from "./store";
import { getAllMeassges } from "./redux/actions/chat.action";
import { useSelector } from "react-redux";
import React from "react";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [countOfTotalUser, setCountOfTotalUser] = useState(0);
  // const chatSelector = useSelector((state) => state.getChat);
  // const { chatMessage, loading } = useSelector((state) => state.getChat);


  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  useEffect(() => {
    socket.on("counter", (data) => {
      setCountOfTotalUser(data.count);
      console.log("data.count", data.count);
    });
    store.dispatch(getAllMeassges());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="App">

      {!showChat ? (
        <div className="joinChatContainer">
          <div className="countUser">
            <h2>Active User :<span style={{ color: 'skyblue' }}> {countOfTotalUser} </span></h2>
          </div>
          <h3>Join A Chat</h3>

          <input type="text" placeholder="Mukesh" onChange={(e) => {
            setUsername(e.target.value);
          }}
          />

          <input type="text" placeholder="Room ID" onChange={(e) => {
            setRoom(e.target.value);
          }}
          />

          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
