import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

const NoneProtectedRoute: React.FC = () => {
  const authToken = localStorage.getItem('authToken');
  const location = useLocation();

  if (authToken) {
    // Redirect to the last visited page or dashboard if no previous page exists
    const lastPage = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={lastPage} replace />;
  }

  return <Outlet />; // Allow access to login/signup pages if not authenticated
};

export default NoneProtectedRoute;
