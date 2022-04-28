import React from "react";

function Cards({ imagen, titulo, subtitulo, texto, enlace }) {
  return (    
     <div className="col-md-3 p-1">      
        <div className="card">        
          <img className="card-img-top" src={imagen} alt="Card image cap" />
          <div className="card-body">
            <h4 className="card-title">{titulo}</h4>
            <h6 className="card-subtitle">{subtitulo}</h6>
            <p className="card-text">
              {texto}
            </p>
            <a href={enlace} className="btn btn-primary">
              {enlace}
            </a>
          </div>
          </div>
        </div>      
  );
};

export default Cards;