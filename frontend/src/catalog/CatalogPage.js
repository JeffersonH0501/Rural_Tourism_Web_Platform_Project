import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';

const configs = {
  'agricultural-products': { roles: ['farmer'], fields: ['name', 'type', 'description', 'price', 'origin', 'season', 'imageUrl'] },
  crafts: { roles: ['artisan'], fields: ['name', 'description', 'price', 'quantity', 'material', 'origin', 'imageUrl'] },
  farms: { roles: ['farmer'], fields: ['name', 'description', 'price', 'location', 'services', 'capacity', 'imageUrl'] },
  tours: { roles: ['farmer'], fields: ['title', 'description', 'price', 'date', 'time', 'location', 'durationHours', 'imageUrl'] },
  promotions: { roles: ['farmer', 'artisan'], fields: ['title', 'description', 'startDate', 'endDate'] },
};
const numeric = new Set(['price', 'quantity', 'capacity', 'durationHours']);
const dates = new Set(['date', 'startDate', 'endDate']);
const optional = new Set(['type', 'origin', 'season', 'imageUrl']);

export default function CatalogPage({ resource }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const config = configs[resource];
  const empty = useMemo(() => Object.fromEntries(config.fields.map(field => [field, ''])), [config]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setItems(await api(`/${resource}`)); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  }, [resource]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { setEditing(null); setForm(empty); }, [empty]);

  const canCreate = user && (user.role === 'admin' || config.roles.includes(user.role));
  const submit = async event => {
    event.preventDefault();
    setSaving(true);
    setError('');
    const payload = { ...form };
    for (const key of numeric) if (key in payload && payload[key] !== '') payload[key] = Number(payload[key]);
    for (const key of Object.keys(payload)) if (payload[key] === '') delete payload[key];
    try {
      await api(`/${resource}${editing ? `/${editing}` : ''}`, { method: editing ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      setForm(empty);
      setEditing(null);
      await load();
    } catch (requestError) { setError(requestError.message); }
    finally { setSaving(false); }
  };
  const edit = item => {
    setEditing(item.id);
    setForm(Object.fromEntries(config.fields.map(field => [field, item[field] ?? ''])));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const remove = async id => {
    if (!window.confirm(t('common.confirmDelete'))) return;
    setError('');
    try { await api(`/${resource}/${id}`, { method: 'DELETE' }); await load(); }
    catch (requestError) { setError(requestError.message); }
  };
  const cancel = () => { setEditing(null); setForm(empty); };

  return <main>
    <div className="page-heading"><div><p className="eyebrow">{t('home.eyebrow')}</p><h1>{t(`resources.${resource}`)}</h1></div><span className="result-count">{items.length} {t('common.results')}</span></div>
    {error && <p className="error" role="alert">{error}</p>}
    {canCreate && <form className="resource-form" onSubmit={submit}>
      <h2>{editing ? t('common.edit') : t('common.create')}</h2>
      {config.fields.map(field => <label key={field}>{t(`fields.${field}`)}{optional.has(field) && <span className="optional">{t('common.optional')}</span>}
        {field === 'description'
          ? <textarea required value={form[field]} onChange={event => setForm({...form, [field]: event.target.value})}/>
          : <input required={!optional.has(field)} type={numeric.has(field) ? 'number' : dates.has(field) ? 'date' : field === 'time' ? 'time' : field === 'imageUrl' ? 'url' : 'text'} min={numeric.has(field) ? '0' : undefined} step={field === 'price' || field === 'durationHours' ? '0.01' : undefined} value={form[field]} onChange={event => setForm({...form, [field]: event.target.value})}/>}
      </label>)}
      <div className="form-actions"><button disabled={saving}>{saving ? t('common.loading') : editing ? t('common.save') : t('common.create')}</button>{editing && <button type="button" className="secondary" onClick={cancel}>{t('common.cancel')}</button>}</div>
    </form>}
    {loading ? <p className="status" role="status">{t('common.loading')}</p> : <>
      <section className="grid">{items.map(item => <article className="card" key={item.id}>{item.imageUrl && <img src={item.imageUrl} alt={item.name || item.title}/>}<div><h2>{item.name || item.title}</h2><p>{item.description}</p>{item.price !== undefined && <strong>$ {Number(item.price).toLocaleString()}</strong>}<p className="muted">{item.location || item.origin || item.material || ''}</p>{user && (user.role === 'admin' || item.owner?.id === user.id) && <div className="actions"><button onClick={() => edit(item)}>{t('common.edit')}</button><button className="danger" onClick={() => remove(item.id)}>{t('common.delete')}</button></div>}</div></article>)}</section>
      {!items.length && !error && <p className="status">{t('common.empty')}</p>}
    </>}
  </main>;
}
