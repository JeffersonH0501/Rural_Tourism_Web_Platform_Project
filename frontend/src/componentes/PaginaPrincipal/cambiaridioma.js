import React from 'react';
import { Link } from 'react-router-dom';
import "./cambiaridioma.css";
import { useTranslation } from 'react-i18next';

function Cambiaridioma() {

  const {t, i18n} = useTranslation(["trad"])

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="camb-l">
      <button onClick={() => changeLanguage("esp")} className="PaginaPrincipal-btn">ESP</button>
      <button onClick={() => changeLanguage("en")} className="PaginaPrincipal-btn">ENG</button>
    </div>
  );
}

export default Cambiaridioma;