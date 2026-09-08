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

  // Full Schedule rows for table
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
    <div
      className="payment-plan-page animate-fade-in"
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        color: '#152247',
        fontFamily: "'Space Grotesk', system-ui, sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes floatWatermark {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-15px);
          }
        }

        .float-hero-watermark,
        .float-payment-text {
          animation: floatWatermark 5s ease-in-out infinite;
        }

        .minimal-metric-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 22px 24px;
          box-shadow: 0 4px 16px rgba(21, 34, 71, 0.03);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
        }

        .minimal-metric-card:hover {
          transform: translateY(-4px);
          border-color: #152247;
          box-shadow: 0 14px 30px -8px rgba(21, 34, 71, 0.12);
        }

        .minimal-schedule-row {
          border-bottom: 1px solid #f1f5f9;
          font-size: 13.5px;
          color: #0f172a;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .minimal-schedule-row:hover {
          background: rgba(21, 34, 71, 0.035) !important;
          transform: translateX(4px);
          box-shadow: inset 3px 0 0 #152247;
        }

        .minimal-switch-btn {
          padding: 10px 22px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 13.5px;
          border: none;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .minimal-switch-btn:hover:not(.active-switch) {
          color: #152247;
          background: rgba(21, 34, 71, 0.05);
        }

        .reserve-btn-hover {
          transition: all 0.25s ease;
        }

        .reserve-btn-hover:hover {
          background: #1e3a8a !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(21, 34, 71, 0.3);
        }
      `}</style>

      {/* Hero Watermark Banner */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          background:
            'radial-gradient(ellipse 120% 85% at 50% 0%, #5074a6 0%, #7b9cc7 25%, #adc6e3 50%, #dce8f5 75%, #ffffff 100%)',
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
        {/* Floating Giant Watermark */}
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
          PAYMENT PLAN
        </div>
      </section>

      {/* Embedded Interactive Pie Section (Only Pie Chart on Payment Plan Page) */}
      <PaymentPlanSection onNavigate={onNavigate} hideExploreButton={true} onlyPieChart={true} />

      {/* Full Minimalist Schedule Chart & Table Section */}
      <section style={{ maxWidth: '1160px', margin: '40px auto 80px auto', padding: '0 24px' }}>
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span
            style={{
              background: 'rgba(21, 34, 71, 0.06)',
              color: '#152247',
              padding: '6px 18px',
              borderRadius: '99px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}
          >
            STRUCTURED INSTALLMENT SCHEDULE
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#152247', margin: '10px 0 0 0' }}>
            Flexible Payment Schedule
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            Transparent 0% mark-up milestone breakdown tailored to your chosen residence
          </p>
        </div>

        {/* Minimalist Controls: Suite Selector + Duration Switcher */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '32px'
          }}
        >
          {/* Suite Switch */}
          <div
            style={{
              display: 'inline-flex',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '4px',
              borderRadius: '12px',
              gap: '6px'
            }}
          >
            <button
              onClick={() => setSelectedSuiteType('1bed')}
              className={`minimal-switch-btn ${selectedSuiteType === '1bed' ? 'active-switch' : ''}`}
              style={{
                background: selectedSuiteType === '1bed' ? '#152247' : 'transparent',
                color: selectedSuiteType === '1bed' ? '#ffffff' : '#64748b',
                boxShadow: selectedSuiteType === '1bed' ? '0 4px 12px rgba(21, 34, 71, 0.2)' : 'none'
              }}
            >
              1-Bedroom ({plans['1bed'].sqft} sq.ft)
            </button>
            <button
              onClick={() => setSelectedSuiteType('2bed')}
              className={`minimal-switch-btn ${selectedSuiteType === '2bed' ? 'active-switch' : ''}`}
              style={{
                background: selectedSuiteType === '2bed' ? '#152247' : 'transparent',
                color: selectedSuiteType === '2bed' ? '#ffffff' : '#64748b',
                boxShadow: selectedSuiteType === '2bed' ? '0 4px 12px rgba(21, 34, 71, 0.2)' : 'none'
              }}
            >
              2-Bedroom ({plans['2bed'].sqft} sq.ft)
            </button>
          </div>

          {/* Duration Switch */}
          <div
            style={{
              display: 'inline-flex',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '4px',
              borderRadius: '12px',
              gap: '6px'
            }}
          >
            <button
              onClick={() => setSelectedDuration('6month')}
              className={`minimal-switch-btn ${selectedDuration === '6month' ? 'active-switch' : ''}`}
              style={{
                background: selectedDuration === '6month' ? '#152247' : 'transparent',
                color: selectedDuration === '6month' ? '#ffffff' : '#64748b',
                boxShadow: selectedDuration === '6month' ? '0 4px 12px rgba(21, 34, 71, 0.2)' : 'none'
              }}
            >
              6-Month Plan (10%/mo)
            </button>
            <button
              onClick={() => setSelectedDuration('12month')}
              className={`minimal-switch-btn ${selectedDuration === '12month' ? 'active-switch' : ''}`}
              style={{
                background: selectedDuration === '12month' ? '#152247' : 'transparent',
                color: selectedDuration === '12month' ? '#ffffff' : '#64748b',
                boxShadow: selectedDuration === '12month' ? '0 4px 12px rgba(21, 34, 71, 0.2)' : 'none'
              }}
            >
              12-Month Plan (5%/mo)
            </button>
          </div>
        </div>

        {/* 4 Minimalist Product Cards with Navy Theme & Hover Effects */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}
        >
          {/* Card 1: Total Valuation */}
          <div className="minimal-metric-card">
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total Suite Valuation
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#152247', lineHeight: '1.1' }}>
              {formatPKR(current.totalPrice)}{' '}
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748b' }}>PKR</span>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(21, 34, 71, 0.05)',
                border: '1px solid rgba(21, 34, 71, 0.1)',
                padding: '4px 10px',
                borderRadius: '6px',
                marginTop: '14px'
              }}
            >
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#152247' }}>
                Rs. 26,500 / sq.ft • {current.sqft} SQFT
              </span>
            </div>
          </div>

          {/* Card 2: Down Payment */}
          <div className="minimal-metric-card">
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              25% Down Payment
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#152247', lineHeight: '1.1' }}>
              {formatPKR(current.downPayment)}{' '}
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748b' }}>PKR</span>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid rgba(37, 99, 235, 0.18)',
                padding: '4px 10px',
                borderRadius: '6px',
                marginTop: '14px'
              }}
            >
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#1d4ed8' }}>
                Immediate Booking & Allocation
              </span>
            </div>
          </div>

          {/* Card 3: Monthly Installment */}
          <div className="minimal-metric-card">
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Monthly Installment ({selectedDuration === '6month' ? '6-Mo' : '12-Mo'})
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#152247', lineHeight: '1.1' }}>
              {formatPKR(currentMonthly)}{' '}
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748b' }}>PKR / mo</span>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(2, 132, 199, 0.08)',
                border: '1px solid rgba(2, 132, 199, 0.18)',
                padding: '4px 10px',
                borderRadius: '6px',
                marginTop: '14px'
              }}
            >
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0284c7' }}>
                0% Mark-Up ({monthlyPercent}%/mo)
              </span>
            </div>
          </div>

          {/* Card 4: Possession */}
          <div className="minimal-metric-card">
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              15% On Possession
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#152247', lineHeight: '1.1' }}>
              {formatPKR(current.possession)}{' '}
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748b' }}>PKR</span>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(21, 34, 71, 0.06)',
                border: '1px solid rgba(21, 34, 71, 0.15)',
                padding: '4px 10px',
                borderRadius: '6px',
                marginTop: '14px'
              }}
            >
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#152247' }}>
                June 2027 Keys Handover
              </span>
            </div>
          </div>
        </div>

        {/* Full Clean Minimalist Schedule Table Card */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '28px 32px',
            boxShadow: '0 8px 32px rgba(21, 34, 71, 0.04)'
          }}
        >
          {/* Table Header Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#152247', margin: 0 }}>
                {current.title} — {selectedDuration === '6month' ? '6-Month Plan' : '12-Month Plan'}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '3px 0 0 0' }}>
                Rate: Rs. 26,500 / sq.ft • Total Size: {current.sqft} sq.ft
              </p>
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                background: 'rgba(21, 34, 71, 0.06)',
                color: '#152247',
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(21, 34, 71, 0.1)'
              }}
            >
              {scheduleRows.length} Payment Stages
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
              <thead>
                <tr
                  style={{
                    background: '#f8fafc',
                    borderBottom: '2px solid #e2e8f0',
                    color: '#475569',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px'
                  }}
                >
                  <th style={{ padding: '14px 16px', width: '60px' }}>No.</th>
                  <th style={{ padding: '14px 16px' }}>Milestone</th>
                  <th style={{ padding: '14px 16px' }}>Type</th>
                  <th style={{ padding: '14px 16px' }}>Share</th>
                  <th style={{ padding: '14px 16px' }}>Amount (PKR)</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right' }}>Timeline</th>
                </tr>
              </thead>
              <tbody>
                {scheduleRows.map((r, idx) => (
                  <tr key={idx} className="minimal-schedule-row">
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#94a3b8' }}>{r.no}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#152247' }}>{r.stage}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '6px',
                          background:
                            r.type === 'Down Payment'
                              ? 'rgba(21, 34, 71, 0.08)'
                              : r.type === 'Final Handover'
                              ? 'rgba(21, 34, 71, 0.12)'
                              : 'rgba(37, 99, 235, 0.08)',
                          color:
                            r.type === 'Down Payment'
                              ? '#152247'
                              : r.type === 'Final Handover'
                              ? '#152247'
                              : '#1d4ed8',
                          border:
                            r.type === 'Down Payment'
                              ? '1px solid rgba(21, 34, 71, 0.15)'
                              : r.type === 'Final Handover'
                              ? '1px solid rgba(21, 34, 71, 0.2)'
                              : '1px solid rgba(37, 99, 235, 0.15)'
                        }}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#152247' }}>{r.share}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 900, color: '#152247' }}>
                      {formatPKR(r.amount)} PKR
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', color: '#475569', fontWeight: 600 }}>
                      {r.timeline}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Action */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px'
            }}
          >
            <div style={{ fontSize: '13.5px', color: '#64748b' }}>
              Guaranteed Rental Yield: <strong style={{ color: '#152247' }}>{current.roi}</strong>
            </div>
            <button
              className="reserve-btn-hover"
              onClick={() => onNavigate('book-now')}
              style={{
                background: '#152247',
                color: '#ffffff',
                padding: '12px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer'
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
