import React from "react";
import Cards from "../../Components/Cards/Cards";
import imagen from "../../logo512.png";

export default function Home() {
  return (
    <div className="py-5">
      <div className="container"> 
        <div class="row hidden-md-up">
        <Cards imagen={imagen} titulo="Starship: Endgame" subtitulo="Juego de naves" texto="Un clasico aun vigente" enlace="/starship"/>        
        <Cards imagen={imagen} titulo="Sistema de Cultivos" subtitulo="Sistema de Cultivos" texto="Siembra y cosecha diferentes plantas" enlace="/sistema_de_cultivos"/>        
        </div>
      </div>     
    </div>
  );
}
