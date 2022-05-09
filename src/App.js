import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Starship from "./Pages/Starship/Starship";
import DungeonExplorer from "./Pages/DungeonExplorer/DungeonExplorer";
import MyNavbar from "./Components/MyNavbar/MyNavbar";
import io from "socket.io-client";

const socket = io.connect("https://diego-test-server.herokuapp.com");

function App() {
  const joinRoom = () => {
    socket.emit("join_room", 100);
  };

  const sendMessage = async () => {
    const message = {
      room: 100,
      author: "Diego",
      message: "Hola como te va ?",
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send_message", message);
  };

  React.useEffect(() => {
    console.log("useEffect");
    socket.on("receive_message", (data) => {
      console.log("from useEffect: " + data.message);
    });
  }, [socket]);

  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/starship" element={<Starship />} />
        <Route path="/dungeon_explorer" element={<DungeonExplorer />} />
      </Routes>
      <div style={buttonStyle}>
        <button onClick={joinRoom}> Join Room</button>
        <button onClick={sendMessage}> Send Message </button>
      </div>
    </>
  );
}

const buttonStyle = {
  textAlign: "center",
  margin: "0 auto",
};

export default App;
