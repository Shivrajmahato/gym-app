import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px', background: 'rgba(13, 17, 23, 0.8)', backdropFilter: 'blur(10px)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '24px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity color="var(--primary-color)" /> FitManager
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>Login</button>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        flex: 1, 
        marginTop: '80px', 
        display: 'flex', 
        alignItems: 'center',
        padding: '0 40px',
        backgroundImage: 'linear-gradient(to right, rgba(13, 17, 23, 0.95) 20%, rgba(13, 17, 23, 0.5)), url(/gym_equipment_banner.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            Elevate Your <span style={{ color: 'var(--primary-color)' }}>Fitness Journey</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
            Join the most premium gym experience. Manage your memberships, book elite trainers, and track your progress all from our unified platform.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }} onClick={() => navigate('/register')}>
              Start Free Trial <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section style={{ padding: '80px 40px', background: 'var(--bg-color)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '48px' }}>Why Choose FitManager?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(88,166,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--primary-color)' }}>
              <CheckCircle size={32} />
            </div>
            <h3 style={{ fontSize: '20px' }}>State-of-the-Art Equipment</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Access the finest luxury fitness machines and free weights in the city.</p>
          </div>
          <div className="glass-panel" style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(46,160,67,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--accent-color)' }}>
              <Activity size={32} />
            </div>
            <h3 style={{ fontSize: '20px' }}>World-Class Trainers</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Book sessions with our elite certified personal trainers directly through the app.</p>
          </div>
          <div className="glass-panel" style={{ textAlign: 'center' }}>
             <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(210,153,34,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#d29922' }}>
              <ArrowRight size={32} />
            </div>
            <h3 style={{ fontSize: '20px' }}>Seamless Management</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your payments, digital invoices, and class bookings instantly.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
