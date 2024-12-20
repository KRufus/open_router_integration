import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserDashboard } from './components/user/UserDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            {isAdmin ? (
              <Route path="/admin" element={<AdminDashboard />} />
            ) : (
              <Route path="/dashboard" element={<UserDashboard />} />
            )}
            <Route path="/" element={
              <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />
            } />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;