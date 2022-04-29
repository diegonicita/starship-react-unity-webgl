import React from "react";
import Cards from "../../Components/Cards/Cards";
import imagen from "../../sample1.png";
import imagen2 from "../../sample2.jpg";

export default function Home() {
  return (
    <div className="py-5">
      <div className="container"> 
        <div className="row hidden-md-up">
        <Cards imagen={imagen} titulo="Starship: Endgame" subtitulo="Juego de naves" texto="Un clasico aun vigente" enlace="/starship"/>        
        <Cards imagen={imagen2} titulo="Sistema de Cultivos" subtitulo="Sistema de Cultivos" texto="Siembra y cosecha diferentes plantas" enlace="/sistema_de_cultivos"/>        
        </div>
      </div>     
    </div>
  );
}
