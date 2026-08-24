import React from "react";
import video from "../../assets/images/video.mp4";
import "./Info.css";
import { useTranslation } from 'react-i18next';

function Info() {

    const {t, i18n} = useTranslation(["trad"])

    return (
        <div className="PaginaPrincipal-contenido">
            <div className="PaginaPrincipal-video">
                <video controls loop>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
            <div className="PaginaPrincipal-descripcion">
                <h1>{t("preguntapaginaprincipal")}</h1>
                <p>{t("paginaprincipaldescripcion")}</p>
            </div>
        </div> 
    );
}

export default Info;