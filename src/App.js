import "./App.css"
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Starship from "./Pages/Starship/Starship";
import SistemaDeCultivos from "./Pages/SistemaDeCultivos/SistemaDeCultivos";
import MyNavbar from "./Components/MyNavbar/MyNavbar";

function App() { 

  return (
    <>    
    <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/starship" element={<Starship />}/>
        <Route path="/sistema_de_cultivos" element={<SistemaDeCultivos />}/>
      </Routes>
    </>
  
    )

}

export default App;
