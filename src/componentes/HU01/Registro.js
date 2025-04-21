import React, { useState } from "react";
import logoImage from "../../assets/images/logo_colombiarte.png";
import "./Registro.css";
import { useTranslation } from 'react-i18next';
 
function Registro() {

    const {t, i18n} = useTranslation(["trad"]);
    
    const [nombreValue, setNombreValue] = useState(t("HU01-nombre"));
    const [apellidoValue, setApellidoValue] = useState(t("HU01-apellido"));
    const [correoValue, setCorreoValue] = useState(t("HU01-correo"));
    const [contraseñaValue, setContraseñaValue] = useState(t("HU01-clave"));
    
    const handleClick = (event, setter, defaultValue) => {
        if (event.target.value === defaultValue) {
            setter(event.target.innerText = "");
        }
    };

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };
    
    const handleInputBlur = (event, defaultValue, setter) => {
        if (event.target.value === '') {
            setter(defaultValue);
        }
    };
    
    return (
        <div>
            <section className="Registrar-seccion">

                <div className="Registrar-logo">
                    <img src={logoImage} alt="Logo de ColombiArte"/>
                </div>

                <div className="Registrar-titulo">
                    <h1>{t("HU01-nuevousuario")}</h1>
                </div>

                <div className="Registrar-inputs">
                  <div className="row">
                    <input 
                      type="text"
                      aria-label={t("HU01-nombre")} 
                      value={nombreValue}
                      onClick={(event) => handleClick(event, setNombreValue, t("HU01-nombre"))}
                      onChange={(event) => handleInputChange(event, setNombreValue, false)} 
                      onBlur={(event) => handleInputBlur(event, t("HU01-nombre"), setNombreValue)} 
                    />
                    <input 
                      type="text"
                      aria-label={t("HU01-apellido")}  
                      value={apellidoValue}
                      onClick={(event) => handleClick(event, setApellidoValue, t("HU01-apellido"))}
                      onChange={(event) => handleInputChange(event, setApellidoValue, true)} 
                      onBlur={(event) => handleInputBlur(event, t("HU01-apellido"), setApellidoValue)} 
                    />
                  </div>
                  <div className="row">
                    <input 
                      type="text" 
                      aria-label={t("HU01-correo")}  
                      value={correoValue}
                      onClick={(event) => handleClick(event, setCorreoValue, t("HU01-correo"))}
                      onChange={(event) => handleInputChange(event, setCorreoValue, false)} 
                      onBlur={(event) => handleInputBlur(event, t("HU01-correo"), setCorreoValue)} 
                    />
                    <input 
                      type="text"
                      aria-label={t("HU01-clave")} 
                      value={contraseñaValue}
                      onClick={(event) => handleClick(event, setContraseñaValue, t("HU01-clave"))}
                      onChange={(event) => handleInputChange(event, setContraseñaValue, true)} 
                      onBlur={(event) => handleInputBlur(event, t("HU01-clave"), setContraseñaValue)} 
                    />
                  </div>
                </div>

                <div className="Registrar-boton">
                    <button>{t("HU01-registrar")}</button>
                </div>

                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
                <div className="wave wave4"></div>
            </section>
        </div>
    );
}

export default Registro