import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import NoneProtectedRoute from './None-ProtectedRoute'; // Import None ProtectedRoute component
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute component

// pages
import SignIn from 'pages/sign-in';

const RoutesManager: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<NoneProtectedRoute />}>
          <Route index element={<SignIn />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesManager;
