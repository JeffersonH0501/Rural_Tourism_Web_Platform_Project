import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logoImage from "../../assets/images/logo_colombiarte.png";
import "./Inicio.css";
import { useTranslation } from 'react-i18next';

function Inicio() {

    const { t } = useTranslation(["trad"]);

    const [correoValue, setCorreoValue] = useState(t("HU01-correo"));
    const [contraseñaValue, setContraseñaValue] = useState(t("HU01-clave"));
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const handleClick = (event, setter, defaultValue) => {
        if (event.target.value === defaultValue) {
            setter(event.target.innerText = "");
        }
    };

    const handleInputChange = (event, setter, isContraseñaInput) => {
        setter(event.target.value);
        if (isContraseñaInput) {
            setIsTyping(true);
        }
    };
    
    const handleInputBlur = (event, defaultValue, setter, isContraseñaInput) => {
        if (event.target.value === '') {
            setter(defaultValue);
            setIsTyping(false);
        }
    };
    
    const handleLogin = async () => {
        try {
            const responseToken = await fetch('http://localhost:4000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": correoValue, "password": contraseñaValue }),
            });
    
            if (responseToken.status === 201) {
                const dataToken = await responseToken.json();
                localStorage.setItem('token', dataToken.token);
    
                const responseUsuario = await fetch(`http://localhost:4000/usuarios/correo/${correoValue}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const dataUsuario = await responseUsuario.json();
                localStorage.setItem("usuario", JSON.stringify(dataUsuario));
                navigate(`/Dashboard/${dataUsuario.id}`);
            } 
            else {
                alert('Correo o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };    
    
    return (
        <div>
            <section className="Login-seccion">

                <div className="Login-logo">
                    <img src={logoImage} alt="Logo de ColombiArte"/>
                </div>

                <div className="Login-titulo">
                    <h1>{t("HU01-InicioSesion")}</h1>
                </div>

                <div className="Login-inputs">
                    <input 
                        type="text" 
                        aria-label={t("HU01-correo")}  
                        placeholder={correoValue}
                        onClick={(event) => handleClick(event, setCorreoValue, t("HU01-correo") )}
                        onChange={(event) => handleInputChange(event, setCorreoValue, false)} 
                        onBlur={(event) => handleInputBlur(event, t("HU01-correo"), setCorreoValue)} 
                    />
                    <input 
                        type={isTyping ? "password" : "text"}
                        aria-label={t("HU01-clave")} 
                        placeholder={contraseñaValue}
                        onClick={(event) => handleClick(event, setContraseñaValue, t("HU01-clave"))}
                        onChange={(event) => handleInputChange(event, setContraseñaValue, true)} 
                        onBlur={(event) => handleInputBlur(event, t("HU01-clave"), setContraseñaValue)} 
                    />
                </div>

                <div className="Login-boton">
                    <button onClick={handleLogin}>{t("HU01-ingresar")}</button>
                </div>

                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
                <div className="wave wave4"></div>
            </section>
        </div>
    );
}

export default Inicio