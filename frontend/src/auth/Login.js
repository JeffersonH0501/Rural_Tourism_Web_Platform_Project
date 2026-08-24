import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  return <main className="auth-layout">
    <section className="auth-intro" aria-labelledby="login-title">
      <p className="eyebrow">{t('home.eyebrow')}</p>
      <h1 id="login-title">{t('auth.welcomeBack')}</h1>
      <p>{t('auth.loginIntro')}</p>
      <ul><li>{t('auth.benefitOne')}</li><li>{t('auth.benefitTwo')}</li><li>{t('auth.benefitThree')}</li></ul>
    </section>
    <section className="auth-card">
      <p className="eyebrow">{t('auth.account')}</p><h2>{t('auth.login')}</h2>
      <form onSubmit={submit} noValidate>
        <label>{t('fields.email')}<input type="email" autoComplete="email" required value={form.email} onChange={event => setForm({...form, email:event.target.value})}/></label>
        <label>{t('fields.password')}<span className="password-field"><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={form.password} onChange={event => setForm({...form, password:event.target.value})}/><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? t('auth.hide') : t('auth.show')}</button></span></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="primary wide" disabled={busy}>{busy ? t('common.loading') : t('auth.login')}</button>
      </form>
      <p className="auth-switch">{t('auth.noAccount')} <Link to="/register">{t('auth.register')}</Link></p>
    </section>
  </main>;
}
