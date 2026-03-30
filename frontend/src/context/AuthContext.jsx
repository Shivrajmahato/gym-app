/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Simple check for expiration
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({ email: decoded.sub, role: decoded.role });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
    const { access_token } = response.data;
    setToken(access_token);
    localStorage.setItem('token', access_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    const decoded = jwtDecode(access_token);
    setUser({ email: decoded.sub, role: decoded.role });
  };

  const register = async (full_name, email, password) => {
    // 1. Register the user
    await axios.post('http://127.0.0.1:8000/api/register', { 
      full_name, 
      email, 
      password,
      role: 'member' 
    });
    // 2. Automatically log them in
    await login(email, password);
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
