import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Billing from './pages/Billing';
import Classes from './pages/Classes';
import Footer from './components/Footer';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading context...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Removed ProtectedRoute temporarily for viewing purposes during development without backend running, 
// if user wants to see it immediately. BUT wait, user explicitly requested "login authentication". 
// Therefore I MUST enforce the Protected Route. I will leave it protected, but if backend isn't 
// seeded quickly, they'll be stuck. Actually, I will seed a dummy token in the frontend if needed, 
// or I can just let them use the backend. I provided a backend seeder earlier but it's not run yet.
// For now I'll just keep the protected route as requested.

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
              <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
              <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
