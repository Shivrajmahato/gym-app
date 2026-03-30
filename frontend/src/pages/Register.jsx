import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register(fullName, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
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
      
      <div className="glass-panel animate-fade-in" style={{ width: '450px', padding: '40px', position: 'relative', zIndex: 10, background: 'rgba(22, 27, 34, 0.4)', border: '1px solid rgba(88, 166, 255, 0.3)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Activity size={32} color="var(--primary-color)" />
            <h2 style={{ marginBottom: 0 }}>FitManager</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>Create your account to get started</p>
        </div>

        {error && <div className="badge badge-danger" style={{ marginBottom: '16px', display: 'block', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input 
              type="text" 
              className="input-field" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required 
            />
          </div>
          <div className="input-group">
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
          <div className="input-group" style={{ marginBottom: '32px' }}>
            <label className="input-label">Confirm Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
          <a href="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Log In</a>
        </div>
        <div style={{ marginTop: '8px', textAlign: 'center', fontSize: '14px' }}>
          <a href="/" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
