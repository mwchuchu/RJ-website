import React, { useState } from 'react';
import { PROPERTIES } from '../../data/mockData';

interface BookNowPageProps {
  onNavigate?: (tabId: string) => void;
}

export const BookNowPage: React.FC<BookNowPageProps> = () => {
  // Only keep Unit 01 and Unit 02
  const availableUnits = PROPERTIES.filter((p) => p.number === '01' || p.number === '02');

  const [selectedUnitId, setSelectedUnitId] = useState<'prop-01' | 'prop-02'>('prop-01');
  const [selectedPlan, setSelectedPlan] = useState<'12month' | '6month'>('12month');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unitType: '1-Bedroom Luxury Serviced Apartment (625 sq.ft • Rs. 16.56M)',
    installmentPlan: '12-Month Annual Plan (5%/month)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Pricing calculations at Rs. 26,500/sqft
  const activeProperty = availableUnits.find((p) => p.id === selectedUnitId) || availableUnits[0];
  const sqft = selectedUnitId === 'prop-01' ? 625 : 1140;
  const totalPrice = sqft * 26500;
  const downPayment = Math.round(totalPrice * 0.25);
  const monthly6 = Math.round((totalPrice * 0.60) / 6);
  const monthly12 = Math.round((totalPrice * 0.60) / 12);

  const formatPKR = (val: number) => val.toLocaleString('en-PK');

  const handleUnitCardSelect = (propId: 'prop-01' | 'prop-02') => {
    setSelectedUnitId(propId);
    const unitTitle = propId === 'prop-01'
      ? '1-Bedroom Luxury Serviced Apartment (625 sq.ft • Rs. 16.56M)'
      : '2-Bedroom Executive Serviced Residence (1,140 sq.ft • Rs. 30.21M)';
    
    setFormData((prev) => ({
      ...prev,
      unitType: unitTitle
    }));

    const formEl = document.getElementById('booking-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="book-now-page animate-fade-in"
      style={{
        padding: '110px 24px 80px 24px',
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        color: '#152247'
      }}
    >
      <style>{`
        .minimal-product-card {
          background: #ffffff;
          border: 1px solid #eef2f6;
          border-radius: 20px;
          padding: 20px;
          transition: all 0.25s ease;
          cursor: pointer;
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }
        .minimal-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(21, 34, 71, 0.09);
          border-color: #cbd5e1;
        }
        .minimal-product-card.active {
          border: 2px solid #152247;
          box-shadow: 0 12px 30px rgba(21, 34, 71, 0.12);
        }
        .card-img-container {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 14px;
          height: 220px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justifyContent: center;
          position: relative;
        }
        .clean-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font-size: 14.5px;
          font-family: inherit;
          color: #0f172a;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          background: #ffffff;
        }
        .clean-input:focus {
          border-color: #152247;
          box-shadow: 0 0 0 3.5px rgba(21, 34, 71, 0.1);
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 40px' }}>
        <span style={{ background: 'rgba(21, 34, 71, 0.06)', color: '#152247', padding: '6px 16px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          OFFICIAL RESERVATION • RS. 26,500 / SQFT
        </span>
        <h1 style={{ fontSize: 'clamp(30px, 4vw, 42px)', fontWeight: 900, color: '#152247', margin: '14px 0 10px 0', letterSpacing: '-0.5px' }}>
          Book Your Luxury Serviced Residence
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.6' }}>
          1 and 2-Bedroom Residences at guaranteed <strong>Rs. 26,500 / sq.ft</strong> with a 25% down payment and 6 or 12-month installment plans.
        </p>
      </div>

      {/* Product Cards (Styled like the reference design) */}
      <div style={{ maxWidth: '1160px', margin: '0 auto 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {availableUnits.map((prop) => {
            const isSelected = selectedUnitId === prop.id;
            const propSqft = prop.number === '01' ? 625 : 1140;
            const priceVal = propSqft * 26500;
            const downPayVal = Math.round(priceVal * 0.25);
            const installmentVal = Math.round((priceVal * 0.60) / 12);

            return (
              <div
                key={prop.id}
                onClick={() => handleUnitCardSelect(prop.id as 'prop-01' | 'prop-02')}
                className={`minimal-product-card ${isSelected ? 'active' : ''}`}
              >
                {/* 1. Top Image Frame */}
                <div className="card-img-container">
                  <img
                    src={prop.heroImage}
                    alt={prop.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: isSelected ? '#152247' : 'rgba(15, 23, 42, 0.75)',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {propSqft} SQFT
                  </div>
                </div>

                {/* 2. Product Title */}
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', margin: '18px 0 10px 0', lineHeight: '1.3' }}>
                  {prop.number === '01' ? "RJ's Larom 1-Bedroom Serviced Suite (625 SQFT)" : "RJ's Larom 2-Bedroom Executive Suite (1,140 SQFT)"}
                </h3>

                {/* 3. Brand Pill Badge */}
                <div style={{ marginBottom: '22px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#f1f5f9',
                      padding: '6px 14px',
                      borderRadius: '99px'
                    }}
                  >
                    <span
                      style={{
                        background: '#152247',
                        color: '#ffffff',
                        fontSize: '9px',
                        fontWeight: 900,
                        padding: '2px 5px',
                        borderRadius: '3px',
                        letterSpacing: '0.5px'
                      }}
                    >
                      RJ's
                    </span>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f766e' }}>
                      Larom Branded Residency
                    </span>
                  </div>
                </div>

                {/* 4. Price & Installment Block (Matching Reference Image) */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingTop: '14px',
                    borderTop: '1px solid #f1f5f9'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>
                      As low as
                    </div>
                    <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', lineHeight: '1' }}>
                      {formatPKR(installmentVal)}{' '}
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#475569' }}>
                        PKR / mo
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', fontWeight: 500 }}>
                      On 0% mark-up • 12-Mo Plan
                    </div>
                  </div>

                  {/* Right Side Badge: 25% Down Payment Tag */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>
                      DOWN PAYMENT
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#15803d', marginTop: '2px' }}>
                      {formatPKR(downPayVal)} PKR
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                      25% Booking
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clean Minimalist Booking Form */}
      <div
        id="booking-form"
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '44px 48px',
          maxWidth: '1160px',
          margin: '0 auto',
          border: '1px solid #e2e8f0',
          boxShadow: '0 14px 40px rgba(21, 34, 71, 0.06)'
        }}
      >
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', color: '#16a34a' }}>✓</div>
            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#152247', margin: '0 0 10px 0' }}>
              Booking Inquiry Received
            </h3>
            <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '560px', margin: '0 auto 24px', lineHeight: '1.6' }}>
              Thank you, <strong>{formData.firstName} {formData.lastName}</strong>. Our official investment team will contact you at <strong>{formData.phone || formData.email}</strong> with your reservation voucher and complete payment schedule.
            </p>
            <a
              href="https://wa.me/923230537371?text=Hello%20RJ%20Larom%20Team%2C%20I%20just%20submitted%20a%20booking%20inquiry%20for%20a%20serviced%20apartment."
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: '10px',
                background: '#152247',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '14.5px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(21, 34, 71, 0.2)'
              }}
            >
              Chat on WhatsApp Directly →
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '28px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#152247', margin: '0 0 4px 0' }}>
                  Request Booking & Official Brochure
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  Selected Residence: <strong>{activeProperty.title}</strong> ({sqft} sq.ft • Rs. {formatPKR(totalPrice)})
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '8px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 700, color: '#152247' }}>
                25% Down Payment: <strong style={{ color: '#16a34a' }}>Rs. {formatPKR(downPayment)}</strong>
              </div>
            </div>

            {/* Name Fields (2 Columns) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="clean-input"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahmood"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="clean-input"
                />
              </div>
            </div>

            {/* Email & Phone (2 Columns) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="tariq@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="clean-input"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 8591434 or +44 7448 445618"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="clean-input"
                />
              </div>
            </div>

            {/* Unit Preference & Installment Switch (2 Columns) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Unit Selection
                </label>
                <select
                  value={selectedUnitId}
                  onChange={(e) => handleUnitCardSelect(e.target.value as 'prop-01' | 'prop-02')}
                  className="clean-input"
                  style={{ background: '#ffffff' }}
                >
                  <option value="prop-01">1-Bedroom Luxury Suite (625 sq.ft - Rs. 16.56M)</option>
                  <option value="prop-02">2-Bedroom Executive Suite (1,140 sq.ft - Rs. 30.21M)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Installment Plan
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value as '6month' | '12month')}
                  className="clean-input"
                  style={{ background: '#ffffff' }}
                >
                  <option value="6month">6-Month Fast-Track Plan (10%/mo - Rs. {formatPKR(monthly6)}/mo)</option>
                  <option value="12month">12-Month Annual Plan (5%/mo - Rs. {formatPKR(monthly12)}/mo)</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Questions or Message (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Ask about floor plans, payment schedule adjustments, overseas banking, or site visits..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="clean-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '10px',
                background: '#152247',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 6px 20px rgba(21, 34, 71, 0.2)'
              }}
            >
              Submit Booking Request →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
