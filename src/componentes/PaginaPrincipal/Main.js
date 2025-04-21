import React from "react";
import logoImage from "../../assets/images/logo_colombiarte.png";
import "./Main.css"
import { useTranslation } from 'react-i18next';

function MainSection({ onButtonClick }) {
  const {t, i18n} = useTranslation(["trad"])
  return (
    <div>
      <div className="PaginaPrincipal-logo">
        <img src={logoImage} alt="Logo de ColombiArte"/>
      </div>
      <main className="PaginaPrincipal-boton">
        <button onClick={onButtonClick}>{t("botonexplorapaginaprincipal")}</button>
      </main>
    </div>
  );
}

export default MainSection;