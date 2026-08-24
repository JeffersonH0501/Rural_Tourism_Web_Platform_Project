import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import "./RecorridoDetail.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from 'react-i18next';


function RecorridoDetail() {

  const {t, i18n} = useTranslation(["trad"])
  let { idrecorrido } = useParams();

  const [tour, setTour] = useState(null);
  

  //Simula la petición a la API de un producto con cierto ID
  useEffect(() => {
    async function fetchTour() {
        const response = await fetch('https://raw.githubusercontent.com/sgoncalves13/RetoReact/main/Recorridos%20(1).json');
        const toursData = await response.json();
        toursData.forEach(tour => {
            if(tour.id === idrecorrido){
                setTour(tour);
            } 
        });

    }
    fetchTour();
}, [idrecorrido]);
  
const handleDelete = () => {
  // Muestra un cuadro de diálogo de confirmación
  const confirmDelete = window.confirm(t("HU04-confimarcioneliminar"));
  if (confirmDelete) {
    // Lógica para eliminar el elemento

  } else {
    // Si el usuario cancela, simplemente puedes hacer un return o mostrar un mensaje
  }
};

  if (tour === null){
    return (<div>Cargando...</div>)
  }
  else{
  return (
        <div>
            <div className="userinfo">
                <img src={logoImage} alt="Logo de ColombiArte" className="logod"/>
                <p>Samuel Goncalves V  <img src={usuarioimg} alt="Logo de ColombiArte" className="iconusuario"/></p>
            </div>
          <h1 className="tituloeditar">{t("HU04-editarecorrido")}</h1>
          <div className="edicion-recorrido">
        <div className="fila-edrecorrido">
            <div className="campo-formulario">
            <label htmlFor="titulo" className="input-label">{t("HU04-nuevotitulo")}</label>
            <input type="text" id="titulo" placeholder={t("HU04-nuevotitulo")} defaultValue={tour.Titulo}/>
            </div>
            <div className="campo-formulario">
            <label htmlFor="fecha" className="input-label">{t("HU04-nuevofecha")}</label>
            <input type="date" id="fecha" placeholder={t("HU04-nuevofecha")} defaultValue={tour.Fecha}/>
            </div>
            <div className="campo-formulario">
            <label htmlFor="hora" className="input-label">{t("HU04-nuevohora")}</label>
            <input type="text" id="hora" placeholder={t("HU04-nuevohora")} defaultValue={tour.Hora}/>
            </div>
        </div>
        <div className="fila-edrecorrido">
            <div className="campo-formulario">
            <label htmlFor="duracion" className="input-label">{t("HU04-nuevoduracion")}</label>
            <input type="text" id="duracion" placeholder={t("HU04-nuevoduracion")} defaultValue={tour.Duracion}/>
            </div>
            <div className="campo-formulario">
            <label htmlFor="ubicacion" className="input-label">{t("HU04-nuevoubicacion")}</label>
            <input type="text" id="ubicacion" placeholder={t("HU04-nuevoubicacion")} defaultValue={tour.Ubicacion}/>
            </div>
            <div className="campo-formulario">
            <label htmlFor="precio" className="input-label">{t("HU04-nuevoprecio")}</label>
            <input type="text" id="precio" placeholder={t("HU04-nuevoprecio")} defaultValue={tour.Precio}/>
            </div>
        </div>
        <div className="fila-edrecorrido">
            <div className="campo-formulario">
            <label htmlFor="descripcion" className="input-label">{t("HU04-nuevodescripcion")}</label>
            <textarea id="descripcion" placeholder={t("HU04-nuevodescripcion")} defaultValue={tour.Descripcion}></textarea>
            </div>
        </div>
        <div className="campo-formulario-upload">
            <label htmlFor="upload" className="upload-box">
            {t("HU03-nuevoinputimagen")}
            <input type="file" id="upload" hidden />
            </label>
  </div>
</div>


          <div className="fondo">
                <button className="guardar">{t("HU03-GuardarCambios")}</button>
                <button onClick={handleDelete} className="eliminar">{t("HU03-Eliminar")}</button>
          </div>
        </div>
    );
  }
}

export default RecorridoDetail;
