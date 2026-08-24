import React from "react";
import "./CrearProductoAgricola.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from 'react-i18next';

function CrearProductoAgricola() {

    const {t, i18n} = useTranslation(["trad"]);

    return (
    <div>
        <div className="userinfo">
            <img src={logoImage} alt="Logo de ColombiArte" className="logod"/>
            <p>Jefferson Hernandez<img src={usuarioimg} alt="Logo de ColombiArte" className="iconusuario"/></p>
        </div>
        <h1 className="titulocrear">{t("HU02-nuevoproductoagricola")} </h1>
        <div className="creacion">
            <div className="campo">
                <label htmlFor="nombre">{t("HU01-nombre")}</label>
                <input type="text" id="nombre" placeholder={t("HU01-nombre")} />
            </div>
            <div className="campo">
                <label htmlFor="precio">{t("HU02-precio")}</label>
                <input type="text" id="precio" placeholder={t("HU02-precio")} />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">{t("HU02-disponibilidad")}</label>
                <input type="text" id="cantidad" placeholder={t("HU02-disponibilidad")} />
            </div>
            <div className="campo-descripcion">
                <label htmlFor="descripcion">{t("HU02-descripcion")}</label>
                <textarea id="descripcion" placeholder={t("HU02-descripcion")}></textarea>
            </div>
            <div className="campo-upload-box">
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

export default CrearProductoAgricola;