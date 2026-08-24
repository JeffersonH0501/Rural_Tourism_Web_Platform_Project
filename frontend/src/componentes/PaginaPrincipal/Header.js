import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import { useTranslation } from 'react-i18next';

function Header() {

  const {t, i18n} = useTranslation(["trad"]);

  return (
    <div className="PaginaPrincipal-navigation">
      <Link to="/inicio" className="PaginaPrincipal-inicio">{t("paginaprincialinicioseion")}</Link>
      <span className="PaginaPrincipal-separador"><strong>|</strong></span>
      <Link to="/registro" className="PaginaPrincipal-registro">{t("paginaprincialregistro")}</Link>
    </div>
  );
}

export default Header;