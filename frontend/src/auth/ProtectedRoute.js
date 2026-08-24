import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <main><p className="status" role="status">{t('auth.sessionLoading')}</p></main>;
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
