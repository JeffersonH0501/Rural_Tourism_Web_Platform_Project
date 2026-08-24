import React from "react";
import { useNavigate } from "react-router-dom";
import pagricolasImage from "../../assets/images/pagricolas.png";
import artesaniasImage from "../../assets/images/artesanias.png";
import toursImage from "../../assets/images/tours.png";
import hospedajesImage from "../../assets/images/hospedaje.png";
import promoImage from "../../assets/images/promo.png";
import "./Gallery.css";
import { useTranslation } from 'react-i18next';

function Gallery({onClickOne, onClickTwo}) {

    const {t, i18n} = useTranslation(["trad"])
    const navigate = useNavigate(); 

    const handlePromoClick = () => {
      navigate('/promo'); 
    };
    
    return (
        <div className="PaginaPrincipal-galeria">
            <h1>{t("paginaprincipalofrecemos")}</h1>
            <section>
                <div className="imagen-contenedor">
                    <img src={pagricolasImage} onClick={onClickOne} alt="GaleriaPAgricolas" />
                    <span className="texto-encima">{t("paginaprincipaltituloproductosagricolas")}</span>
                </div>
                <div className="imagen-contenedor">
                    <img src={artesaniasImage} onClick={onClickOne} alt="GaleriaArtesanias" />
                    <span className="texto-encima">{t("paginaprincipaltituloartesanias")}</span>
                </div>
                <div className="imagen-contenedor">
                    <img src={toursImage} onClick={onClickTwo} alt="GaleriaTours" />
                    <span className="texto-encima">{t("paginaprincipaltitulorecorridos")}</span>
                </div>
                <div className="imagen-contenedor">
                    <img src={hospedajesImage} onClick={onClickTwo} alt="GaleriaHospedajes" />
                    <span className="texto-encima">{t("paginaprincipaltitulohospedajes")}</span>
                </div>
                <div className="imagen-contenedor">
                    <img src={promoImage} onClick={handlePromoClick} alt="Promociones" />
                    <span className="texto-encima">{t("paginaprincipaltitulopromociones")}</span>
                </div>
            </section>
        </div>
    );
}

export default Gallery;