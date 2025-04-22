import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (userRole === 'admin' && location.pathname !== '/admin-dashboard') {
      return <Navigate to="/admin-dashboard" />;
    }

    if (userRole !== 'admin' && location.pathname === '/admin-dashboard') {
      return <Navigate to="/dashboard" />;
    }

    return children;
  } catch (err) {
    console.error('Invalid token:', err);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
