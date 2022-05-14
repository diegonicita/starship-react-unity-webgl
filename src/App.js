import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Starship from "./Pages/Starship/Starship";
import DungeonExplorer from "./Pages/DungeonExplorer/DungeonExplorer";
import MyNavbar from "./Components/MyNavbar/MyNavbar";
import Chat from "./Pages/Chat/Chat";

function App() {  

  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/starship" element={<Starship />} />
        <Route path="/dungeon_explorer" element={<DungeonExplorer />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>      
    </>
  );
}

export default App;
