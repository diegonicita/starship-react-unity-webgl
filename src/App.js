import "./App.css"
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Starship from "./Pages/Starship/Starship";
import DungeonExplorer from "./Pages/DungeonExplorer/DungeonExplorer";
import MyNavbar from "./Components/MyNavbar/MyNavbar";
import Game from "./Components/Game/Game";

function App() { 

  const [gamePath, setGamePath] = React.useState("build_sistema_de_cultivos/Build/build_sistema_de_cultivos");

  return (
    <>        
    <MyNavbar />
    {/* <Game gamePath={gamePath}/> */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/starship" element={<Starship />}/>
        <Route path="/dungeon_explorer" element={<DungeonExplorer />}/>
      </Routes>    
    </>
  
    )

}

export default App;
