import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Calendar, CreditCard, LogOut, Activity, Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'neon' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Activity />
        <span>FitManager</span>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>
            <NavLink to="/dashboard" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} end>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
          </li>
          {user?.role === 'admin' && (
            <li style={{ marginBottom: '8px' }}>
              <NavLink to="/members" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                <Users size={20} /> Members Directory
              </NavLink>
            </li>
          )}
          <li style={{ marginBottom: '8px' }}>
            <NavLink to="/classes" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <Calendar size={20} /> Classes & Trainers
            </NavLink>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <NavLink to="/billing" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <CreditCard size={20} /> Billing & Invoices
            </NavLink>
          </li>
        </ul>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
        <button 
          className="btn btn-secondary" 
          onClick={toggleTheme} 
          style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '16px' }}
        >
          {theme === 'dark' ? <><Sun size={18}/> Neon Theme</> : <><Moon size={18}/> Dark Theme</>}
        </button>

        <div style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          Logged in as: <strong>{user?.email}</strong>
        </div>
        <button className="btn btn-secondary" onClick={logout} style={{ width: '100%', justifyContent: 'flex-start' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
