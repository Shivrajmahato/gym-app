import React from 'react';
import { MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: '#1a1d24',
      borderTop: '1px solid var(--border-color)',
      padding: '16px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px',
      color: '#fff',
      boxShadow: '0 -4px 10px rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={16} color="var(--primary-color)" />
          mahatoshivraj85@gmail.com,kathmandu,Nepal
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Phone size={16} color="var(--primary-color)" />
          Phone: +977 9815740636
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Phone size={16} color="var(--primary-color)" />
        Phone: +977 9815740636
      </div>
    </footer>
  );
};

export default Footer;
