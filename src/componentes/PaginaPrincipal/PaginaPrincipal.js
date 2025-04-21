import React, { useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import Info from "./Info";
import Gallery from "./Gallery";
import Offers from "./Offers";
import Footer from "./footer"
import imagenAgricolas from "../../assets/images/pagricolas.png";
import imagenArtesanias from "../../assets/images/artesanias.png";
import imagenRecorridos from "../../assets/images/tours.png";
import imagenHospedajes from "../../assets/images/hospedaje.png";
import "./PaginaPrincipal.css";
import Cambiaridioma from './cambiaridioma';
import { useTranslation } from 'react-i18next';

function PaginaPrincipal() {

  const {t, i18n} = useTranslation(["trad"])

  const [mostrarSegundo, setMostrarSegundo] = useState(false);
  const [mostrarTercero, setMostrarTercero] = useState(false);

  const scrollToSecond = () => {
    const destino = document.getElementById("PaginaPrincipal-explora");
    destino.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToThirdOne = () => {
    const destino = document.getElementById("PaginaPrincipal-ofertaUno");
    destino.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToThirdTwo = () => {
    const destino = document.getElementById("PaginaPrincipal-ofertaDos");
    destino.scrollIntoView({ behavior: "smooth" });
  };

  const handleClickButtom = () => {
    setMostrarSegundo(true);
    setTimeout(scrollToSecond, 100);
  };

  const handleClickGalleryOne = () => {
    setMostrarTercero(true);
    setTimeout(scrollToThirdOne, 100);
  };

  const handleClickGalleryTwo = () => {
    setMostrarTercero(true);
    setTimeout(scrollToThirdTwo, 100);
  };

  return (
    <div>
      <section className="PaginaPrincipal-primero">
        <Cambiaridioma />
        <Header/>
        <Main onButtonClick={handleClickButtom}/>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </section>

      <section className="PaginaPrincipal-segundo" id="PaginaPrincipal-explora" style={{ display: mostrarSegundo ? 'block' : 'none' }}>
        <Info/>
        <Gallery onClickOne={handleClickGalleryOne} onClickTwo={handleClickGalleryTwo}/>
      </section>

      <section className="PaginaPrincipal-tercero" id="PaginaPrincipal-ofertaUno" style={{ display: mostrarTercero ? 'block' : 'none' }}>
        <Offers
          tituloUno={t("paginaprincipaltituloproductosagricolas")}
          descripcionUno={t("paginaprincipaldescrpprodagricolas")}
          imagenUno={imagenAgricolas}
          tituloDos={t("paginaprincipaltituloartesanias")}
          descripcionDos={t("paginaprincipaldescrpartesanias")}
          imagenDos={imagenArtesanias}
        />
      </section>

      <section className="PaginaPrincipal-tercero" id="PaginaPrincipal-ofertaDos" style={{ display: mostrarTercero ? 'block' : 'none' }}>
        <Offers
          tituloUno={t("paginaprincipaltitulorecorridos")}
          descripcionUno={t("paginaprincipaldescrprecorridos")}
          imagenUno={imagenRecorridos}
          tituloDos={t("paginaprincipaltitulohospedajes")}
          descripcionDos={t("paginaprincipaldescrphospedajes")}
          imagenDos={imagenHospedajes}
        />
      </section>

      <section className="PaginaPrincipal-cuarto" style={{ display: mostrarTercero ? 'block' : 'none' }}>
        <Footer/>
      </section>

    </div>
  );
}

export default PaginaPrincipal