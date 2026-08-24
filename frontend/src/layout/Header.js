import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/AuthContext';

const resources = ['agricultural-products', 'crafts', 'farms', 'tours', 'promotions'];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [location.pathname]);

  return <header className="site-header">
    <Link className="brand" to="/" aria-label="Ruralia home"><span aria-hidden="true">R</span>Ruralia</Link>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
      <span className="sr-only">{t('nav.menu')}</span><span></span><span></span><span></span>
    </button>
    <nav id="primary-navigation" className={open ? 'open' : ''} aria-label="Primary navigation">
      {resources.map(resource => <NavLink key={resource} to={`/${resource}`} className={({isActive}) => isActive ? 'active' : undefined}>{t(`resources.${resource}`)}</NavLink>)}
      {user ? <><NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : undefined}>{t('nav.dashboard')}</NavLink><button className="nav-action" onClick={logout}>{t('auth.logout')}</button></> : <NavLink to="/login" className={({isActive}) => isActive ? 'active' : undefined}>{t('auth.login')}</NavLink>}
      <button className="language" type="button" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')} aria-label={t('nav.changeLanguage')}>{i18n.language === 'en' ? 'ES' : 'EN'}</button>
    </nav>
  </header>;
}
