import React from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute: React.FC = () => {
  const authToken = localStorage.getItem('authToken') || '';

  return authToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
