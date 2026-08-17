import React, { useState } from 'react';
import { PaymentPlanSection } from '../home/PaymentPlanSection';

interface PaymentPlanPageProps {
  onNavigate: (tabId: string) => void;
}

export const PaymentPlanPage: React.FC<PaymentPlanPageProps> = ({ onNavigate }) => {
  const [selectedSuiteType, setSelectedSuiteType] = useState<'1bed' | '2bed'>('1bed');
  const [selectedDuration, setSelectedDuration] = useState<'6month' | '12month'>('12month');

  // Exact calculations at Rs. 26,500 per SQFT
  const plans = {
    '1bed': {
      title: '1-Bedroom Serviced Residence',
      sqft: 625,
      ratePerSqft: 26500,
      totalPrice: 16562500, // 625 * 26500
      totalPriceFormatted: 'PKR 16.56 Million',
      downPayment: 4140625, // 25%
      downPaymentFormatted: 'PKR 4.14 Million',
      monthly6: 1656250, // (60% / 6) = 10%
      monthly12: 828125, // (60% / 12) = 5%
      possession: 2484375, // 15%
      possessionFormatted: 'PKR 2.48 Million',
      roi: '6%–7% (Approx 990k–1.15M/yr)'
    },
    '2bed': {
      title: '2-Bedroom Luxury Residence',
      sqft: 1140,
      ratePerSqft: 26500,
      totalPrice: 30210000, // 1140 * 26500
      totalPriceFormatted: 'PKR 30.21 Million',
      downPayment: 7552500, // 25%
      downPaymentFormatted: 'PKR 7.55 Million',
      monthly6: 3021000, // (60% / 6) = 10%
      monthly12: 1510500, // (60% / 12) = 5%
      possession: 4531500, // 15%
      possessionFormatted: 'PKR 4.53 Million',
      roi: '6%–7% (Approx 1.81M–2.11M/yr)'
    }
  };

  const current = plans[selectedSuiteType];
  const monthsCount = selectedDuration === '6month' ? 6 : 12;
  const currentMonthly = selectedDuration === '6month' ? current.monthly6 : current.monthly12;
  const monthlyPercent = 60 / monthsCount;

  const formatPKR = (val: number) => val.toLocaleString('en-PK');

  // Schedule rows for table
  const scheduleRows = [
    {
      no: '01',
      stage: 'Down Payment (Booking)',
      type: 'Down Payment',
      share: '25%',
      amount: current.downPayment,
      timeline: 'At Booking'
    },
    ...Array.from({ length: monthsCount }, (_, i) => ({
      no: String(i + 2).padStart(2, '0'),
      stage: `Month ${i + 1} Installment`,
      type: 'Monthly Installment',
      share: `${monthlyPercent}%`,
      amount: currentMonthly,
      timeline: `Month ${i + 1}`
    })),
    {
      no: String(monthsCount + 2).padStart(2, '0'),
      stage: 'Possession & Key Handover',
      type: 'Final Handover',
      share: '15%',
      amount: current.possession,
      timeline: 'June 2027'
    }
  ];

  return (
    <div className="payment-plan-page animate-fade-in" style={{ background: '#ffffff', minHeight: '100vh', color: '#152247', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      {/* Top Banner Header */}
      <section
        style={{
          background: '#152247',
          color: '#ffffff',
          padding: '110px 32px 50px 32px',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.12)', color: '#ffffff', padding: '6px 18px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '14px' }}>
          OFFICIAL RESIDENCY SCHEDULE • RS. 26,500 / SQFT
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 900, color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
          Payment Plan & Investment Schedule
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          1 & 2-Bedroom Luxury Serviced Residences at locked rates of <strong>Rs. 26,500 / sq.ft</strong> with flexible 6-month & 12-month installment options.
        </p>
      </section>

      {/* Embedded Interactive Pie Section */}
      <PaymentPlanSection onNavigate={onNavigate} />

      {/* Minimalist Schedule Chart & Table Section */}
      <section style={{ maxWidth: '1160px', margin: '40px auto 80px auto', padding: '0 24px' }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ background: 'rgba(21, 34, 71, 0.06)', color: '#152247', padding: '6px 16px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            MINIMALIST PAYMENT SCHEDULE
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#152247', margin: '10px 0 0 0' }}>
            Structured Installment Chart
          </h2>
        </div>

        {/* Minimalist Controls: Suite Selector + Duration Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '28px' }}>
          {/* Suite Switch */}
          <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', gap: '6px' }}>
            <button
              onClick={() => setSelectedSuiteType('1bed')}
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '13.5px',
                border: 'none',
                background: selectedSuiteType === '1bed' ? '#152247' : 'transparent',
                color: selectedSuiteType === '1bed' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              1-Bedroom ({plans['1bed'].sqft} sq.ft)
            </button>
            <button
              onClick={() => setSelectedSuiteType('2bed')}
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '13.5px',
                border: 'none',
                background: selectedSuiteType === '2bed' ? '#152247' : 'transparent',
                color: selectedSuiteType === '2bed' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              2-Bedroom ({plans['2bed'].sqft} sq.ft)
            </button>
          </div>

          {/* Duration Switch */}
          <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', gap: '6px' }}>
            <button
              onClick={() => setSelectedDuration('6month')}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '13.5px',
                border: 'none',
                background: selectedDuration === '6month' ? '#152247' : 'transparent',
                color: selectedDuration === '6month' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              6-Month Plan (10%/mo)
            </button>
            <button
              onClick={() => setSelectedDuration('12month')}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '13.5px',
                border: 'none',
                background: selectedDuration === '12month' ? '#152247' : 'transparent',
                color: selectedDuration === '12month' ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              12-Month Plan (5%/mo)
            </button>
          </div>
        </div>

        {/* 4 Minimalist Product Cards (Styled like the reference design) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          
          {/* Card 1: Total Valuation */}
          <div style={{ background: '#ffffff', border: '1px solid #eef2f6', borderRadius: '18px', padding: '22px', boxShadow: '0 4px 18px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
              Total Suite Valuation
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', lineHeight: '1.1' }}>
              {formatPKR(current.totalPrice)}{' '}
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#475569' }}>PKR</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', marginTop: '12px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f766e' }}>
                Rs. 26,500 / sq.ft • {current.sqft} SQFT
              </span>
            </div>
          </div>

          {/* Card 2: Down Payment */}
          <div style={{ background: '#ffffff', border: '1px solid #eef2f6', borderRadius: '18px', padding: '22px', boxShadow: '0 4px 18px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
              25% Down Payment
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#16a34a', lineHeight: '1.1' }}>
              {formatPKR(current.downPayment)}{' '}
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#475569' }}>PKR</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', padding: '4px 10px', borderRadius: '6px', marginTop: '12px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#15803d' }}>
                Immediate Booking & Allocation
              </span>
            </div>
          </div>

          {/* Card 3: Monthly Installment (As low as...) */}
          <div style={{ background: '#ffffff', border: '1px solid #eef2f6', borderRadius: '18px', padding: '22px', boxShadow: '0 4px 18px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
              As low as ({selectedDuration === '6month' ? '6-Mo' : '12-Mo'})
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', lineHeight: '1.1' }}>
              {formatPKR(currentMonthly)}{' '}
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#475569' }}>PKR / mo</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', padding: '4px 10px', borderRadius: '6px', marginTop: '12px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#1d4ed8' }}>
                On 0% mark-up ({monthlyPercent}%/mo)
              </span>
            </div>
          </div>

          {/* Card 4: Possession */}
          <div style={{ background: '#ffffff', border: '1px solid #eef2f6', borderRadius: '18px', padding: '22px', boxShadow: '0 4px 18px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
              15% On Possession
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#7c3aed', lineHeight: '1.1' }}>
              {formatPKR(current.possession)}{' '}
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#475569' }}>PKR</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#faf5ff', padding: '4px 10px', borderRadius: '6px', marginTop: '12px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#7e22ce' }}>
                June 2027 Keys Handover
              </span>
            </div>
          </div>
        </div>

        {/* Clean Minimalist Schedule Table */}
        <div style={{ background: '#ffffff', border: '1px solid #eef2f6', borderRadius: '20px', padding: '28px', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#152247', margin: 0 }}>
                {current.title} — {selectedDuration === '6month' ? '6-Month Plan' : '12-Month Plan'}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0 0' }}>
                Rate: Rs. 26,500 / sq.ft • Total Size: {current.sqft} sq.ft
              </p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 800, background: '#f1f5f9', color: '#152247', padding: '6px 14px', borderRadius: '8px' }}>
              {scheduleRows.length} Payment Stages
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #e2e8f0', color: '#64748b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 14px', width: '60px' }}>No.</th>
                  <th style={{ padding: '12px 14px' }}>Milestone</th>
                  <th style={{ padding: '12px 14px' }}>Type</th>
                  <th style={{ padding: '12px 14px' }}>Share</th>
                  <th style={{ padding: '12px 14px' }}>Amount (PKR)</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Timeline</th>
                </tr>
              </thead>
              <tbody>
                {scheduleRows.map((r, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      fontSize: '13.5px',
                      color: '#0f172a',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px 14px', fontWeight: 800, color: '#64748b' }}>{r.no}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700 }}>{r.stage}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: r.type === 'Down Payment' ? '#dcfce7' : r.type === 'Final Handover' ? '#f3e8ff' : '#eff6ff',
                          color: r.type === 'Down Payment' ? '#15803d' : r.type === 'Final Handover' ? '#7e22ce' : '#1d4ed8'
                        }}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#475569' }}>{r.share}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 800, color: '#152247' }}>{formatPKR(r.amount)} PKR</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', color: '#64748b', fontWeight: 600 }}>{r.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Action */}
          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              Guaranteed ROI: <strong style={{ color: '#152247' }}>{current.roi}</strong>
            </div>
            <button
              onClick={() => onNavigate('book-now')}
              style={{
                background: '#152247',
                color: '#ffffff',
                padding: '12px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Reserve Your Unit Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
