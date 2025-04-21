import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import "./CrearRecorrido.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from 'react-i18next';

function CrearRecorrido() {

  const {t, i18n} = useTranslation(["trad"])

  return (
    <div>
        <div className="userinfo">
            <img src={logoImage} alt="Logo de ColombiArte" className="logod"/>
            <p>Samuel Goncalves V  <img src={usuarioimg} alt="Logo de ColombiArte" className="iconusuario"/></p>
        </div>
      <h1 className="titulocrear">{t("HU04-nuevorecorrido")}</h1>
      <div className="creacion-recorrido">
        <div className="fila-edrecorrido">
            <div className="campo-formulario">
            <label htmlFor="titulo" className="input-label">{t("HU04-nuevotitulo")}</label>
            <input type="text" id="titulo" placeholder={t("HU04-nuevotitulo")}/>
            </div>
            <div className="campo-formulario">
            <label htmlFor="fecha" className="input-label">{t("HU04-nuevofecha")}</label>
            <input type="date" id="fecha" placeholder={t("HU04-nuevofecha")}/>
            </div>
            <div className="campo-formulario">
            <label htmlFor="hora" className="input-label">{t("HU04-nuevohora")}</label>
            <input type="text" id="hora" placeholder={t("HU04-nuevohora")} />
            </div>
        </div>
        <div className="fila-edrecorrido">
            <div className="campo-formulario">
            <label htmlFor="duracion" className="input-label">{t("HU04-nuevoduracion")}</label>
            <input type="text" id="duracion" placeholder={t("HU04-nuevoduracion")} />
            </div>
            <div className="campo-formulario">
            <label htmlFor="ubicacion" className="input-label">{t("HU04-nuevoubicacion")}</label>
            <input type="text" id="ubicacion" placeholder={t("HU04-nuevoubicacion")} />
            </div>
            <div className="campo-formulario">
            <label htmlFor="precio" className="input-label">{t("HU04-nuevoprecio")}</label>
            <input type="text" id="precio" placeholder={t("HU04-nuevoprecio")}/>
            </div>
        </div>
        <div className="fila-edrecorrido">
            <div className="campo-formulario">
            <label htmlFor="descripcion" className="input-label">{t("HU04-nuevodescripcion")}</label>
            <textarea id="descripcion" placeholder={t("HU04-nuevodescripcion")}></textarea>
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
            <button>{t("HU03-agregar")}</button>
      </div>
    </div>
    );
}

export default CrearRecorrido;
