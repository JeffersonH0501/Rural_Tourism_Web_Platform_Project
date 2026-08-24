import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api/client';

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({firstName:'', lastName:'', email:'', password:'', role:'visitor', photoUrl:''});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const change = event => setForm({...form, [event.target.name]:event.target.value});
  const submit = async event => {
    event.preventDefault(); setBusy(true); setError('');
    try { const payload={...form}; if(!payload.photoUrl) delete payload.photoUrl; await api('/users',{method:'POST',body:JSON.stringify(payload)}); navigate('/login',{state:{registered:true}}); }
    catch(requestError){ setError(requestError.message); } finally { setBusy(false); }
  };
  return <main className="auth-layout register-layout">
    <section className="auth-intro"><p className="eyebrow">{t('auth.join')}</p><h1>{t('auth.createProfile')}</h1><p>{t('auth.registerIntro')}</p></section>
    <section className="auth-card"><p className="eyebrow">{t('auth.newAccount')}</p><h2>{t('auth.register')}</h2><form onSubmit={submit}>
      <div className="form-row"><label>{t('fields.firstName')}<input name="firstName" autoComplete="given-name" required value={form.firstName} onChange={change}/></label><label>{t('fields.lastName')}<input name="lastName" autoComplete="family-name" required value={form.lastName} onChange={change}/></label></div>
      <label>{t('fields.email')}<input name="email" type="email" autoComplete="email" required value={form.email} onChange={change}/></label>
      <label>{t('fields.password')}<input name="password" type="password" autoComplete="new-password" required minLength="8" value={form.password} onChange={change}/><small>{t('auth.passwordHint')}</small></label>
      <label>{t('fields.role')}<select name="role" value={form.role} onChange={change}><option value="visitor">{t('roles.visitor')}</option><option value="farmer">{t('roles.farmer')}</option><option value="artisan">{t('roles.artisan')}</option></select></label>
      <label>{t('fields.photoUrl')} <span className="optional">{t('common.optional')}</span><input name="photoUrl" type="url" value={form.photoUrl} onChange={change}/></label>
      {error && <p className="error" role="alert">{error}</p>}<button className="primary wide" disabled={busy}>{busy?t('common.loading'):t('auth.register')}</button>
    </form><p className="auth-switch">{t('auth.hasAccount')} <Link to="/login">{t('auth.login')}</Link></p></section>
  </main>;
}
