import React, { useState, useEffect } from 'react';
import './Promo.css';
import logo from "../../assets/images/logo_colombiarte.png";

function FilterBar() {
  return (
    <div className="filter-bar">
      <label htmlFor="tipo-producto">Tipo de Producto:</label>
      <select id="tipo-producto">
        <option value="">Todos</option>
        <option value="">Todos</option>
        <optgroup label="Artesanías">
          <option value="ceramica">Cerámica</option>
          <option value="joyeria">Joyería</option>
          <option value="textiles">Textiles</option>
          <option value="esculturas">Esculturas</option>
        </optgroup>
        <optgroup label="Productos Agrícolas">
          <option value="frutas">Frutas</option>
          <option value="verduras">Verduras</option>
          <option value=" lacteos">Lácteos</option>
          <option value="productos-granja">Productos de Granja</option>
        </optgroup>
        <optgroup label="Tours">
          <option value="culturales">Tours Culturales</option>
          <option value="aventura">Tours de Aventura</option>
          <option value="ecoturismo">Ecoturismo</option>
          <option value="gastronomicos">Tours Gastronómicos</option>
        </optgroup>
        <optgroup label="Hospedajes">
          <option value="hoteles">Hoteles</option>
          <option value="hostales">Hostales</option>
          <option value="casas-rurales">Casas Rurales</option>
          <option value="eco-lodges">Eco-Lodges</option>
        </optgroup>
      </select>
    </div>
  );
}

function Promo() {
    const [promociones, setPromociones] = useState([]);
  
    useEffect(() => {
      fetch('https://raw.githubusercontent.com/JuanPabloUni/lab9/main/data4.json')
        .then(response => response.json())
        .then(data => setPromociones(data))
        .catch(error => console.error('Error fetching promociones:', error));
    }, []);
  
    const handleSubscribeClick = (index) => {
      console.log('Se hizo clic en el botón de suscribirse para la promoción:', index);
    };
  
    return (
      <div className="promociones-container">
        <img className="logo" src={logo} alt="Logo de ColombiArte" />
        <FilterBar />
        <div className="tarjetas-container">
          {promociones.map((promocion, index) => (
            <div key={promocion.idPromocion} className="promocion-card">
              <h3>{promocion.titulo}</h3>
              <p>{promocion.descripcion}</p>
              <p>Fecha de inicio: {promocion.fechaInicio}</p>
              <p>Fecha de fin: {promocion.fechaFin}</p>
              <button onClick={() => handleSubscribeClick(index)}>Suscribirse</button>
              <span className="star">&#9733;</span> 
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Promo;
