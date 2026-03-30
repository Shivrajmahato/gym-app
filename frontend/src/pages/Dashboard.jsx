import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Users, CreditCard, Activity, ArrowUpRight, CheckCircle, Calendar as CalendarIcon, Zap, Smartphone, Check } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total_members: 0,
    active_subscriptions: 0,
    recent_revenue: 0,
    upcoming_classes: 0
  });

  useEffect(() => {
    // In demo, we will stub this if backend isn't populated, but attempt to fetch
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/dashboard');
        setStats(res.data);
      } catch (e) {
        console.log("Could not fetch stats, using mock");
        setStats({
          total_members: 248,
          active_subscriptions: 215,
          recent_revenue: 4590.50,
          upcoming_classes: 12
        });
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="main-layout">
      <Sidebar />
      <main className="content-area animate-fade-in">
        <div className="page-header" style={{
          backgroundImage: 'linear-gradient(to right, rgba(13, 17, 23, 0.95), rgba(13, 17, 23, 0.4)), url(/gym_equipment_banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '60px 40px',
          borderRadius: '16px',
          border: '1px solid rgba(88, 166, 255, 0.2)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '38px', textShadow: '0 2px 10px rgba(0,0,0,0.8)', marginBottom: '8px' }}>Dashboard Overview</h1>
            <p style={{ color: 'var(--text-primary)', fontSize: '18px', opacity: 0.9 }}>Welcome back to FitManager{user?.role === 'admin' ? ' administration' : ''}.</p>
          </div>
          {user?.role === 'admin' ? (
             <button className="btn btn-primary">+ New Member</button>
          ) : (
             <button className="btn btn-accent" style={{ background: '#e85d04', color: '#fff', border: 'none' }}><Zap size={18} /> Quick Book Class</button>
          )}
        </div>

        {user?.role === 'admin' ? (
          <>
            <div className="grid-cards">
          <div className="glass-panel stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="title">Total Members</span>
              <Users size={20} color="var(--primary-color)" />
            </div>
            <div className="value">{stats.total_members}</div>
            <div style={{ fontSize: '12px', color: '#3fb950', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpRight size={14} /> +12% this month
            </div>
          </div>
          
          <div className="glass-panel stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="title">Active Subscriptions</span>
              <Activity size={20} color="var(--accent-color)" />
            </div>
            <div className="value">{stats.active_subscriptions}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              86% retention rate
            </div>
          </div>

          <div className="glass-panel stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="title">Monthly Revenue</span>
              <CreditCard size={20} color="#d29922" />
            </div>
            <div className="value">${stats.recent_revenue.toFixed(2)}</div>
            <div style={{ fontSize: '12px', color: '#3fb950', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpRight size={14} /> +5.4% this month
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="glass-panel">
            <h3>Recent Activity</h3>
            <table className="data-table" style={{ marginTop: '16px' }}>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Action</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>Subscription Renewed</td>
                  <td>Today, 10:42 AM</td>
                  <td><span className="badge badge-success">Completed</span></td>
                </tr>
                <tr>
                  <td>Sarah Smith</td>
                  <td>Joined Classes (Yoga)</td>
                  <td>Today, 09:15 AM</td>
                  <td><span className="badge badge-warning">Pending</span></td>
                </tr>
                <tr>
                  <td>Mike Johnson</td>
                  <td>Payment Failed</td>
                  <td>Yesterday, 14:30 PM</td>
                  <td><span className="badge badge-danger">Failed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="glass-panel">
            <h3>Upcoming Classes</h3>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)' }}>
                <strong>HIIT Training</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>18:00 PM • Trainer: Alex</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--accent-color)' }}>
                <strong>Yoga Flow</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>19:30 PM • Trainer: Sam</div>
              </div>
            </div>
            
            <div style={{ marginTop: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
              <h3>Admin Panel: Manage Gym Timings</h3>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', marginTop: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.2)', fontWeight: 600, borderBottom: '1px solid var(--border-color)' }}>Current Gym Timings</div>
                
                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-color)' }}></div>
                    Male & Female:
                  </div>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    5:00 AM - 1:00 PM <Activity size={14} color="var(--text-secondary)" />
                  </div>
                </div>

                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-color)' }}></div>
                    Female Only:
                  </div>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    3:00 PM - 5:00 PM <Activity size={14} color="var(--text-secondary)" />
                  </div>
                </div>

                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-color)' }}></div>
                    All Members:
                  </div>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    5:00 PM - 10:00 PM <Activity size={14} color="var(--text-secondary)" />
                  </div>
                </div>
              </div>
              <button 
                className="btn btn-accent" 
                style={{ marginTop: '16px', width: '100%', padding: '12px', background: '#3fb950', border: 'none', color: '#fff' }}
                onClick={() => alert("Gym Timings Updated Successfully!")}
              >
                Update Timings
              </button>
            </div>
            
          </div>
        </div>
          </>
        ) : (
          // Content for non-admin users (e.g., regular members)
          <div className="dashboard-grid">
            <div className="glass-panel">
              <h3>Your Upcoming Classes</h3>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)' }}>
                  <strong>HIIT Training</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Today, 18:00 PM • Trainer: Alex</div>
                  <button className="btn btn-sm btn-primary" style={{ marginTop: '8px' }}>View Details</button>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--accent-color)' }}>
                  <strong>Yoga Flow</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Tomorrow, 19:30 PM • Trainer: Sam</div>
                  <button className="btn btn-sm btn-primary" style={{ marginTop: '8px' }}>View Details</button>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid #d29922' }}>
                  <strong>Spin Class</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Friday, 17:00 PM • Trainer: Chris</div>
                  <button className="btn btn-sm btn-primary" style={{ marginTop: '8px' }}>View Details</button>
                </div>
              </div>
              <button className="btn btn-accent" style={{ marginTop: '24px', width: '100%', padding: '12px', background: '#e85d04', border: 'none', color: '#fff' }}>
                <CalendarIcon size={18} style={{ marginRight: '8px' }} /> Book New Class
              </button>
            </div>

            <div className="glass-panel">
              <h3>Your Membership Status</h3>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid #3fb950' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong>Premium Monthly Plan</strong>
                    <CheckCircle size={20} color="#3fb950" />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Renews on: 25th July 2024</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Cost: $49.99/month</div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong>Payment Method</strong>
                    <CreditCard size={20} color="var(--primary-color)" />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Visa ending in **** 1234</div>
                  <button className="btn btn-sm btn-secondary" style={{ marginTop: '8px' }}>Update Payment</button>
                </div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: '24px', width: '100%', padding: '12px' }}>
                Manage Subscription
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
