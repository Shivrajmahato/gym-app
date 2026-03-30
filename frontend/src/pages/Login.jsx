import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials or server unavailable.');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundImage: 'url(/gym_login_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      {/* Dark overlay for readability */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5, 8, 15, 0.7)' }}></div>
      
      <div className="glass-panel animate-fade-in" style={{ width: '400px', padding: '40px', position: 'relative', zIndex: 10, background: 'rgba(22, 27, 34, 0.4)', border: '1px solid rgba(88, 166, 255, 0.3)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Activity size={32} color="var(--primary-color)" />
            <h2 style={{ marginBottom: 0 }}>FitManager</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back to your gym portal</p>
        </div>

        {error && <div className="badge badge-danger" style={{ marginBottom: '16px', display: 'block', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fitmanager.com"
              required 
            />
          </div>
          <div className="input-group" style={{ marginBottom: '32px' }}>
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
            Sign In
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
