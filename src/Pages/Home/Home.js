import React from "react";
import Cards from "../../Components/Cards/Cards";
import imagen1 from "../../sample1.png";
import imagen2 from "../../sample2.jpg";
import imagen3 from "../../sample3.jpg";

export default function Home() {
  return (
    <div className="py-5">
      <div className="container"> 
        <div className="row hidden-md-up">
        <Cards imagen={imagen1} titulo="Starship: Endgame" subtitulo="Juego de naves" texto="Un clasico aun vigente" enlace="/starship"/>        
        <Cards imagen={imagen2} titulo="Dungeon Explorer" subtitulo="Explorador de Laberintos" texto="Explora en busca de tesoros" enlace="/dungeon_explorer"/>        
        <Cards imagen={imagen3} titulo="Chat" subtitulo="Chatea con tus amigos" texto="Chatea con tus amigos" enlace="/chat"/>        
        </div>
      </div>     
    </div>
  );
}
