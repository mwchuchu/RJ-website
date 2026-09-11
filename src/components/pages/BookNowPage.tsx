import React, { useState } from 'react';
import { PROPERTIES } from '../../data/mockData';

interface BookNowPageProps {
  onNavigate?: (tabId: string) => void;
  initialSuiteType?: '1bed' | '2bed';
  initialDuration?: '6month' | '12month';
}

export const BookNowPage: React.FC<BookNowPageProps> = ({
  initialSuiteType = '1bed',
  initialDuration = '12month'
}) => {
  // Only keep Unit 01 and Unit 02
  const availableUnits = PROPERTIES.filter((p) => p.number === '01' || p.number === '02');

  const defaultUnitId = initialSuiteType === '2bed' ? 'prop-02' : 'prop-01';
  const [selectedUnitId, setSelectedUnitId] = useState<'prop-01' | 'prop-02'>(defaultUnitId);
  const [selectedPlan, setSelectedPlan] = useState<'12month' | '6month'>(initialDuration);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unitType: defaultUnitId === 'prop-02'
      ? '2-Bedroom Executive Serviced Residence (1,140 sq.ft • Rs. 30.21M)'
      : '1-Bedroom Luxury Serviced Apartment (625 sq.ft • Rs. 16.56M)',
    installmentPlan: initialDuration === '6month'
      ? '6-Month Fast-Track Plan (10%/month)'
      : '12-Month Annual Plan (5%/month)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync state whenever props from navigation change
  React.useEffect(() => {
    if (initialSuiteType) {
      const unitId = initialSuiteType === '2bed' ? 'prop-02' : 'prop-01';
      setSelectedUnitId(unitId);
      setFormData((prev) => ({
        ...prev,
        unitType: unitId === 'prop-02'
          ? '2-Bedroom Executive Serviced Residence (1,140 sq.ft • Rs. 30.21M)'
          : '1-Bedroom Luxury Serviced Apartment (625 sq.ft • Rs. 16.56M)'
      }));
    }
    if (initialDuration) {
      setSelectedPlan(initialDuration);
      setFormData((prev) => ({
        ...prev,
        installmentPlan: initialDuration === '6month'
          ? '6-Month Fast-Track Plan (10%/month)'
          : '12-Month Annual Plan (5%/month)'
      }));
    }
  }, [initialSuiteType, initialDuration]);

  // Pricing calculations at Rs. 26,500/sqft
  const activeProperty = availableUnits.find((p) => p.id === selectedUnitId) || availableUnits[0];
  const sqft = selectedUnitId === 'prop-01' ? 625 : 1140;
  const totalPrice = sqft * 26500;
  const downPayment = Math.round(totalPrice * 0.25);
  const monthly6 = Math.round((totalPrice * 0.60) / 6);
  const monthly12 = Math.round((totalPrice * 0.60) / 12);

  const formatPKR = (val: number) => val.toLocaleString('en-PK');

  const handleUnitSelect = (propId: 'prop-01' | 'prop-02') => {
    setSelectedUnitId(propId);
    const unitTitle = propId === 'prop-01'
      ? '1-Bedroom Luxury Serviced Apartment (625 sq.ft • Rs. 16.56M)'
      : '2-Bedroom Executive Serviced Residence (1,140 sq.ft • Rs. 30.21M)';

    setFormData((prev) => ({
      ...prev,
      unitType: unitTitle
    }));
  };

  const handlePlanSelect = (plan: '6month' | '12month') => {
    setSelectedPlan(plan);
    const planTitle = plan === '6month'
      ? '6-Month Fast-Track Plan (10%/month)'
      : '12-Month Annual Plan (5%/month)';

    setFormData((prev) => ({
      ...prev,
      installmentPlan: planTitle
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="book-now-page animate-fade-in"
      style={{
        padding: 0,
        margin: 0,
        width: '100%',
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        color: '#152247',
        paddingBottom: '80px'
      }}
    >
      <style>{`
        @keyframes floatWatermark {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-15px);
          }
        }

        .float-hero-watermark,
        .float-amenities-text {
          animation: floatWatermark 5s ease-in-out infinite;
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

      {/* Floating Giant Watermark Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          background: 'radial-gradient(ellipse 120% 85% at 50% 0%, #5074a6 0%, #7b9cc7 25%, #adc6e3 50%, #dce8f5 75%, #ffffff 100%)',
          borderRadius: '0px 0px 32px 32px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '110px 48px 0px 48px',
          margin: 0,
          width: '100%'
        }}
      >
        <div
          className="float-hero-watermark"
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(52px, 12.5vw, 185px)',
            fontWeight: 800,
            letterSpacing: '8px',
            color: 'rgba(21, 34, 71, 0.25)',
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 1,
            fontFamily: "'Space Grotesk', system-ui, sans-serif"
          }}
        >
          BOOK NOW
        </div>
      </section>

      {/* Clean Minimalist Booking Form */}
      <div
        id="booking-form"
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '44px 48px',
          maxWidth: '1160px',
          margin: '48px auto 0 auto',
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
                  onChange={(e) => handleUnitSelect(e.target.value as 'prop-01' | 'prop-02')}
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
                  onChange={(e) => handlePlanSelect(e.target.value as '6month' | '12month')}
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
