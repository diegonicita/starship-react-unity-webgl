import React from "react";
import "./Cards.css";
import { Link } from 'react-router-dom'

function Cards({ imagen, titulo, subtitulo, texto, enlace }) {
  return (    
     <div className="col-md-3 p-1">      
        <div className="card">        
          <img className="card-img-top card-cover" src={imagen} alt="Card image cap" />
          <div className="card-body card-height">
            <h4 className="card-title">{titulo}</h4>
            <h6 className="card-subtitle">{subtitulo}</h6>
            <p className="card-text">
              {texto}
            </p>
            <Link to={enlace} className="btn btn-primary">
              {enlace}
            </Link>
          </div>
          </div>
        </div>      
  );
};

export default Cards;