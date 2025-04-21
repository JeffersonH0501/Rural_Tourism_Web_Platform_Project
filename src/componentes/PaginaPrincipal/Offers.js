import React from "react";
import "./Offers.css"

function Offers(props) {
  return (
    <div>
      <div className="PaginaPrincipal-bloque">
          <div className="PaginaPrincipal-informaciondos">
            <h1>{props.tituloUno}</h1>
            <p>{props.descripcionUno}</p>
          </div>
          <div className="PaginaPrincipal-imagen">
            <img src={props.imagenUno} alt="Icono de {tituloUno}"/> 
          </div>
      </div>
      <div className="PaginaPrincipal-bloque">
        <div className="PaginaPrincipal-imagendos">
          <img src={props.imagenDos} alt="Icono de {tituloDos}"/> 
        </div>
        <div className="PaginaPrincipal-informacion">
          <h1>{props.tituloDos}</h1>
          <p>{props.descripcionDos}</p>
        </div>
     </div>
    </div>
  );
}


export default Offers;