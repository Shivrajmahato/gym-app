import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Download, CreditCard, CheckCircle, Smartphone, MapPin, X } from 'lucide-react';

const Billing = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  const closeModals = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(false);
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <main className="content-area animate-fade-in" style={{ position: 'relative' }}>
        <div className="page-header">
          <div>
            <h1>Billing & Invoices</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your personal training bookings and invoices.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowPaymentModal(true)}>
            Make Payment
          </button>
        </div>

        <div className="dashboard-grid">

          {/* Booking History Table */}
          <div className="glass-panel" style={{ height: 'fit-content' }}>
            <h3 style={{ marginBottom: '16px' }}>User Dashboard: Booking History</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Trainer</th>
                  <th>Booking Date</th>
                  <th>Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src="/trainer_a.png" alt="Trainer" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                    Trainer A
                  </td>
                  <td>15-April-2024</td>
                  <td><span className="badge badge-success">Paid</span></td>
                  <td><button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>Download Invoice</button></td>
                </tr>
                <tr>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src="/trainer_b.png" alt="Trainer" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                    Trainer B
                  </td>
                  <td>15-April-2024</td>
                  <td><span className="badge badge-success">Paid</span></td>
                  <td><button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>Download Invoice</button></td>
                </tr>
                <tr>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src="/trainer_c.png" alt="Trainer" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                    Trainer C
                  </td>
                  <td>15-April-2024</td>
                  <td><span className="badge" style={{ background: '#d29922', color: '#fff' }}>Pending</span></td>
                  <td><button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>Download Invoice</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Invoice View */}
          <div className="glass-panel" style={{ background: '#fff', color: '#000' }}>
            <h3 style={{ color: '#000', marginBottom: '4px' }}>Invoice <span style={{ fontWeight: 'normal' }}>for Personal Training</span></h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '24px', borderBottom: '2px solid #eee', paddingBottom: '16px' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                AK<span style={{ fontWeight: 400, fontSize: '18px' }}>FITNESS</span>
              </div>
              <div style={{ color: '#666', fontSize: '12px' }}># INV-2024-001</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '14px' }}>
              <div>
                <strong>shivraj mahato</strong><br />
                <span style={{ color: '#666' }}>mahatoshivraj85@gmail.com</span>
              </div>
              <div style={{ textAlign: 'right', color: '#666' }}>
                Date: 15-April-2024
              </div>
            </div>

            <div style={{ border: '1px solid #ddd' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #ddd', background: '#f9f9f9', fontSize: '14px' }}>
                <span>Trainer: Trainer A(shivaraj)</span>
                <span>Amount: <strong>₹5,000</strong></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#fff', fontSize: '14px' }}>
                <span>Total Amount:</span>
                <strong>₹2,000</strong>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px', marginBottom: '24px', fontSize: '12px', color: '#666' }}>
              Thank you for choosing Mero Fitness!
            </div>

            <button className="btn btn-primary" style={{ width: '100%', borderRadius: '4px' }}>
              Download PDF
            </button>
          </div>

        </div>

        {/* Modals Overlay */}
        {(showPaymentModal || paymentSuccess) && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(5px)' }}>

            {showPaymentModal && !paymentSuccess && (
              <div className="glass-panel animate-fade-in" style={{ background: '#fff', color: '#000', width: '400px', padding: 0, overflow: 'hidden' }}>
                <div style={{ background: '#1a1a1a', color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer' }} onClick={closeModals}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Pay ₹10,000</div>
                  <X size={16} style={{ cursor: 'pointer' }} onClick={closeModals} />
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
                    <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: '12px', borderRight: '1px solid #ddd', color: '#1e5fc9', fontWeight: 600, background: 'rgba(30,95,201,0.05)' }}>Card</div>
                    <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: '12px', borderRight: '1px solid #ddd', color: '#666' }}>NetBanking</div>
                    <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: '12px', borderRight: '1px solid #ddd', color: '#666' }}>UPI</div>
                    <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: '12px', color: '#666' }}>Wallet</div>
                  </div>

                  <div className="input-field" style={{ background: '#fff', border: '1px solid #ccc', color: '#000', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={16} color="#999" />
                    <input type="text" placeholder="Card number" style={{ border: 'none', outline: 'none', width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <div className="input-field" style={{ background: '#fff', border: '1px solid #ccc', color: '#000', display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <input type="text" placeholder="MM/YY" style={{ border: 'none', outline: 'none', width: '100%' }} />
                    </div>
                    <div className="input-field" style={{ background: '#fff', border: '1px solid #ccc', color: '#000', display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <input type="text" placeholder="CVC" style={{ border: 'none', outline: 'none', width: '100%' }} />
                    </div>
                  </div>
                  <div className="input-field" style={{ background: '#fff', border: '1px solid #ccc', color: '#000', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="text" placeholder="Cardholder Name" style={{ border: 'none', outline: 'none', width: '100%' }} />
                  </div>

                  <button className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={handlePayment}>
                    {isLoading ? 'Processing...' : 'Pay ₹10,000'}
                  </button>
                </div>
              </div>
            )}

            {paymentSuccess && (
              <div className="glass-panel animate-fade-in" style={{ background: '#fff', color: '#000', width: '400px', padding: 0, overflow: 'hidden', textAlign: 'center' }}>
                <div style={{ background: '#222', color: '#fff', padding: '16px', fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Booking Confirmed!</span>
                  <X size={20} style={{ cursor: 'pointer' }} onClick={closeModals} />
                </div>
                <div style={{ background: '#3fb950', color: '#fff', padding: '12px', fontWeight: 600 }}>
                  Payment Successful!
                </div>
                <div style={{ padding: '40px 24px' }}>
                  <CheckCircle size={64} color="#3fb950" style={{ margin: '0 auto 16px' }} />
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Amount: ₹10,000</div>
                  <div style={{ background: 'rgba(46, 160, 67, 0.1)', color: '#2ea043', padding: '12px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: 500 }}>
                    <Smartphone size={16} /> Confirmation sent to WhatsApp.
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
};

export default Billing;
