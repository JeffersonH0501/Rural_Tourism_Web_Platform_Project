import React from "react";
import "./CrearHospedaje.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from "react-i18next";

function CrearHospedaje() {
  const { t, i18n } = useTranslation(["trad"]);

  return (
    <div>
      <div className="userinfo">
        <img src={logoImage} alt="Logo de ColombiArte" className="logod" />
        <p>
          Juan Pablo Hernández
          <img
            src={usuarioimg}
            alt="Logo de ColombiArte"
            className="iconusuario"
          />
        </p>
      </div>
      <h1 className="titulocrear">{t("HU05-nuevohospedaje")}</h1>
      <div className="creacion">
        <div className="campo">
          <label htmlFor="nombre">{t("HU05-nuevonombre")}</label>
          <input type="text" id="nombre" placeholder={t("HU05-nuevonombre")} />
        </div>
        <div className="campo">
          <label htmlFor="precio">{t("HU05-nuevoprecio")}</label>
          <input type="text" id="precio" placeholder={t("HU05-nuevoprecio")} />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">{t("HU05-nuevaubicacion")}</label>
          <input
            type="text"
            id="cantidad"
            placeholder={t("HU05-nuevaubicacion")}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">{t("HU05-nuevoservicios")}</label>
          <input
            type="text"
            id="cantidad"
            placeholder={t("HU05-nuevoservicios")}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">{t("HU05-nuevacapacidad")}</label>
          <input
            type="text"
            id="cantidad"
            placeholder={t("HU05-nuevacapacidad")}
          />
        </div>
        <div className="campo-descripcion">
          <label htmlFor="descripcion">{t("HU05-nuevadescripcion")}</label>
          <textarea
            id="descripcion"
            placeholder={t("HU05-nuevadescripcion")}
          ></textarea>
        </div>
        <div className="campo-formulario-upload">
          <label htmlFor="upload" className="upload-box">
            {t("HU05-nuevoinputimagen")}
            <input type="file" id="upload" hidden />
          </label>
        </div>
      </div>

      <div className="fondo">
        <div className="button-container">
          <button>{t("HU05-agregarhospedaje")}</button>
        </div>
      </div>
    </div>
  );
}

export default CrearHospedaje;
