import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Clock } from 'lucide-react';

const Classes = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [membershipActive, setMembershipActive] = useState(false);

  const trainers = [
    { id: 'A', name: 'Trainer A', img: '/trainer_a.png' },
    { id: 'B', name: 'Trainer B', img: '/trainer_b.png' },
    { id: 'C', name: 'Trainer C', img: '/trainer_c.png' }
  ];

  return (
    <div className="main-layout">
      <Sidebar />
      <main className="content-area animate-fade-in">
        <div className="page-header">
          <div>
            <h1>Classes & Personal Training</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Book your personal trainer and view gym timings.</p>
          </div>
        </div>

        <div className="dashboard-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Trainers Grid */}
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Choose Your Personal Trainer</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {trainers.map(trainer => (
                  <div key={trainer.id} className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '250px', backgroundImage: `url(${trainer.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div style={{ padding: '16px', background: 'rgba(22, 27, 34, 0.9)', textAlign: 'center' }}>
                      <h3 style={{ fontSize: '18px', margin: 0 }}>{trainer.name}</h3>
                    </div>
                    <div style={{ padding: '0 16px 16px' }}>
                      <button 
                        className={`btn ${selectedTrainer === trainer.id ? 'btn-accent' : 'btn-primary'}`} 
                        style={{ width: '100%', background: selectedTrainer === trainer.id ? 'var(--accent-color)' : '#e85d04', color: '#fff', border: 'none' }}
                        onClick={() => setSelectedTrainer(trainer.id)}
                      >
                        {selectedTrainer === trainer.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '24px', fontWeight: 600, fontSize: '18px' }}>
                Personal Training <span style={{ color: 'var(--text-secondary)' }}>₹10,000 per Month</span>
              </div>
            </div>
            
            {/* Membership Status (As seen on bottom right of ref) */}
            <div className="glass-panel">
               <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Membership Status</h2>
               {membershipActive ? (
                 <>
                   <div style={{ background: 'rgba(46, 160, 67, 0.15)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#3fb950', fontWeight: 'bold', marginBottom: '16px', border: '1px solid rgba(46, 160, 67, 0.4)' }}>
                     <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#3fb950', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                     </div>
                     Membership Active
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
                     <div style={{ color: 'var(--text-secondary)' }}>Start Date:</div>
                     <div>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-')}</div>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', fontSize: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
                     <div style={{ color: 'var(--text-secondary)' }}>End Date:</div>
                     <div>{new Date(new Date().getTime() + 30*24*60*60*1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-')}</div>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', fontSize: '14px', fontWeight: 'bold' }}>
                     <div style={{ color: 'var(--text-secondary)' }}>Status:</div>
                     <div style={{ color: '#3fb950' }}>Active</div>
                   </div>
                 </>
               ) : (
                 <div style={{ background: 'rgba(248, 81, 73, 0.1)', padding: '16px', borderRadius: '8px', textAlign: 'center', border: '1px dashed rgba(248, 81, 73, 0.3)' }}>
                    <div style={{ color: '#ff7b72', marginBottom: '8px', fontWeight: 600 }}>No Active Membership</div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Please join a membership plan to view details.</p>
                 </div>
               )}
            </div>
          </div>

          <div>
             {/* Gym Timings Sidebar Box */}
             <div className="glass-panel" style={{ background: 'linear-gradient(to bottom, rgba(22, 27, 34, 0.8), rgba(13, 17, 23, 0.9))', position: 'sticky', top: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <Clock size={24} color="var(--primary-color)"/>
                <h2 style={{ margin: 0, fontSize: '20px' }}>Gym Timings</h2>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></div> Male & Female:</span>
                  <span style={{ fontWeight: 600 }}>5:00 AM - 1:00 PM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></div> Female Only:</span>
                  <span style={{ fontWeight: 600 }}>3:00 PM - 5:00 PM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></div> All Members:</span>
                  <span style={{ fontWeight: 600 }}>5:00 PM - 10:00 PM</span>
                </li>
              </ul>

              <div style={{ margin: '24px 0', borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '16px', marginBottom: '16px' }}>Gym Membership: <span style={{ fontWeight: 'bold' }}>₹1000</span> <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>per Month</span></div>
                {membershipActive ? (
                  <button className="btn btn-secondary" style={{ width: '100%', color: '#3fb950', border: '1px solid #3fb950' }} disabled>
                    Membership Active
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', background: '#e85d04', color: '#fff', border: 'none' }}
                    onClick={() => {
                      alert('Redirecting to payment gateway...');
                      setTimeout(() => setMembershipActive(true), 1000);
                    }}
                  >
                    Join Now
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Classes;
