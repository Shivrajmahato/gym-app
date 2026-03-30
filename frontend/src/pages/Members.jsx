import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Search, UserPlus } from 'lucide-react';

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data for visual design
  const members = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', plan: 'Premium', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', plan: 'Basic', status: 'Active', joinDate: '2023-03-22' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', plan: 'VIP', status: 'Inactive', joinDate: '2022-11-05' },
    { id: 4, name: 'Diana Clark', email: 'diana@example.com', plan: 'Premium', status: 'Active', joinDate: '2023-08-12' },
    { id: 5, name: 'Evan Wright', email: 'evan@example.com', plan: 'Basic', status: 'Pending', joinDate: '2023-10-01' },
  ];

  return (
    <div className="main-layout">
      <Sidebar />
      <main className="content-area animate-fade-in">
        <div className="page-header">
          <div>
            <h1>Members Directory</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your gym members and their subscriptions.</p>
          </div>
          <button className="btn btn-primary"><UserPlus size={18} /> Add Member</button>
        </div>

        <div className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div className="input-group" style={{ margin: 0, width: '300px', flexDirection: 'row', alignItems: 'center', background: 'rgba(1,4,9,0.5)', borderRadius: '8px', border: '1px solid var(--border-color)', paddingLeft: '12px' }}>
              <Search size={18} color="var(--text-secondary)" />
              <input 
                type="text" 
                placeholder="Search members..." 
                style={{ border: 'none', background: 'transparent', color: '#fff', padding: '10px', width: '100%', outline: 'none' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <select className="input-field" style={{ width: '150px' }}>
                <option>All Plans</option>
                <option>Basic</option>
                <option>Premium</option>
                <option>VIP</option>
              </select>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase())).map(member => (
                <tr key={member.id}>
                  <td style={{ fontWeight: 500, color: '#fff' }}>{member.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{member.email}</td>
                  <td>{member.plan}</td>
                  <td>{member.joinDate}</td>
                  <td>
                    <span className={`badge ${member.status === 'Active' ? 'badge-success' : member.status === 'Inactive' ? 'badge-danger' : 'badge-warning'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <a href="#" style={{ marginRight: '16px' }}>Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Members;
