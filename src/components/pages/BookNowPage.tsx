import React, { useState } from 'react';
import { PROPERTIES } from '../../data/mockData';

export const BookNowPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unitType: '1-Bedroom Serviced Apartment (PKR 9.8M)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="book-now-page animate-fade-in" style={{ padding: '120px 48px 60px 48px', background: '#ffffff' }}>
      <div className="section-header-centered" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
        <span className="section-subtitle-pill" style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>
          EXCLUSIVE PRE-COMPLETION ADVANTAGE
        </span>
        <h2 className="section-main-title" style={{ fontSize: '36px', marginTop: '12px', color: '#0f172a' }}>
          Book Your Unit & View Pricing
        </h2>
        <p className="section-description" style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginTop: '8px' }}>
          Pre-completion pricing at PKR 18,000–22,000/sqft vs competitors at PKR 25,000–38,000/sqft. Secure your residence with an easy 25% down payment.
        </p>
      </div>

      {/* Investment Case Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="info-card floating-card-hover" style={{ background: '#f8fafc', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0369a1', letterSpacing: '0.05em' }}>PRICING ADVANTAGE</span>
          <h3 style={{ fontSize: '20px', margin: '6px 0 8px', color: '#0f172a' }}>PKR 18,000–22,000/sqft</h3>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>Substantially lower than neighbouring competitor projects (PKR 25k–38k/sqft).</p>
        </div>

        <div className="info-card floating-card-hover" style={{ background: '#f8fafc', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0369a1', letterSpacing: '0.05em' }}>FLEXIBLE SCHEDULE</span>
          <h3 style={{ fontSize: '20px', margin: '6px 0 8px', color: '#0f172a' }}>25% Down Payment</h3>
          <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>Convenient 3-year quarterly installment plan through completion (June 2027).</p>
        </div>

        <div className="info-card floating-card-hover" style={{ background: '#f8fafc', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0369a1', letterSpacing: '0.05em' }}>RENTAL RETURNS</span>
          <h3 style={{ fontSize: '20px', margin: '6px 0 8px', color: '#0f172a' }}>6–7% Gross Yield</h3>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>Hands-off hotel management generating passive rental income for overseas investors.</p>
        </div>
      </div>

      {/* Pricing Table of 1 and 2 Bedroom Apartments */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#0f172a' }}>Apartment & Unit Pricing</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {PROPERTIES.map((prop) => (
            <div key={prop.id} className="project-card floating-card-hover" style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 12px 36px rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, background: '#0f172a', color: '#ffffff', padding: '4px 12px', borderRadius: '99px' }}>
                UNIT #{prop.number}
              </span>
              <h4 style={{ fontSize: '19px', margin: '12px 0 6px', color: '#0f172a' }}>{prop.title}</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{prop.locationDetails}</p>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Total Price:</span>
                  <strong style={{ color: 'var(--accent-gold-dark)', fontSize: '14px' }}>{prop.priceFormatted}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span>25% Down Payment:</span>
                  <strong>{((prop.price * 0.25)).toLocaleString('en-US')} PKR</strong>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormData((prev) => ({ ...prev, unitType: `${prop.title} (${prop.priceFormatted})` }));
                  const el = document.getElementById('booking-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{ width: '100%', padding: '12px', borderRadius: '99px', background: '#0f172a', color: '#ffffff', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 12px rgba(15,23,42,0.15)' }}
              >
                Select This Unit Below ↓
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking / Connect Form Section */}
      <div id="booking-form" style={{ background: '#f8fafc', borderRadius: '24px', padding: '40px', maxWidth: '800px', margin: '0 auto', border: '1px solid #e2e8f0' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <span style={{ fontSize: '48px' }}>✨</span>
            <h3 style={{ fontSize: '24px', margin: '16px 0 8px', color: '#0f172a' }}>Inquiry Received!</h3>
            <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '500px', margin: '0 auto 20px', lineHeight: '1.5' }}>
              Thank you, <strong>{formData.firstName}</strong>. Our investment team will contact you within 24 hours at <strong>{formData.phone || formData.email}</strong> with floor plans and payment schedule.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--accent-gold-dark)' }}>WhatsApp Direct: +44 7448 445618</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span className="section-subtitle-pill" style={{ background: 'rgba(212, 175, 55, 0.12)', color: 'var(--accent-gold-dark)', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>
              CONNECT WITH OUR INVESTMENT TEAM
            </span>
            <h3 style={{ fontSize: '24px', margin: '8px 0 20px', color: '#0f172a' }}>Request Investment Brochure & Booking</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: 600 }}>First Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Last Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahmood"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="tariq@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+44 7448 445618 or +92 300 8591434"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Target Unit Interest</label>
              <select
                value={formData.unitType}
                onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              >
                <option value="1-Bedroom Serviced Apartment (PKR 9.8M)">1-Bedroom Serviced Apartment (PKR 9.8M)</option>
                <option value="2-Bedroom Executive Serviced Residence (PKR 16.5M)">2-Bedroom Executive Serviced Residence (PKR 16.5M)</option>
                <option value="Ultra-Luxury Sky Penthouse Residence (PKR 35M)">Ultra-Luxury Sky Penthouse Residence (PKR 35M)</option>
                <option value="Commercial Shop / Kiosk Slot (PKR 8.5M)">Commercial Shop / Kiosk Slot (PKR 8.5M)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Additional Questions</label>
              <textarea
                rows={3}
                placeholder="Ask about payment plan schedule, yields, or site visit..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <button
              type="submit"
              className="hero-btn"
              style={{ width: '100%', background: '#121318', color: '#ffffff', padding: '14px', borderRadius: '99px', fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              Submit Booking & Brochure Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
