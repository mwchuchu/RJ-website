import React, { useState } from 'react';
import { PaymentPlanSection } from '../home/PaymentPlanSection';

interface PaymentPlanPageProps {
  onNavigate: (tabId: string, params?: { suiteType?: '1bed' | '2bed'; duration?: '6month' | '12month' }) => void;
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
        minHeight: 'auto',
        color: '#152247',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        paddingBottom: '48px'
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

        .schedule-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 650px;
        }

        .minimal-schedule-row {
          border-bottom: 1px solid #f1f5f9;
          font-size: 13.5px;
          color: #0f172a;
          position: relative;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.25s ease,
                      opacity 0.25s ease,
                      background 0.25s ease;
        }

        .minimal-total-row {
          position: relative;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.25s ease,
                      opacity 0.25s ease,
                      background 0.25s ease;
        }

        /* On hover to any row, make other lines blur and fade */
        .schedule-table:hover .minimal-schedule-row:not(:hover),
        .schedule-table:hover .minimal-total-row:not(:hover) {
          filter: blur(1.5px);
          opacity: 0.35;
        }

        /* Genuine floating 3D depth effect (No left strip) */
        .minimal-schedule-row:hover {
          background: #ffffff !important;
          transform: translateY(-2px) scale(1.006);
          box-shadow: 0 12px 28px -4px rgba(21, 34, 71, 0.14), 0 4px 12px -2px rgba(21, 34, 71, 0.08) !important;
          z-index: 10;
          border-radius: 8px;
        }

        .minimal-total-row:hover {
          background: #ffffff !important;
          transform: translateY(-2px) scale(1.006);
          box-shadow: 0 12px 28px -4px rgba(21, 34, 71, 0.16), 0 4px 12px -2px rgba(21, 34, 71, 0.08) !important;
          z-index: 10;
          border-radius: 8px;
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
      <section style={{ maxWidth: '1160px', margin: '40px auto 0 auto', padding: '0 24px' }}>
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

        {/* Unified Minimalist Schedule Table Card with Merged Filter Header */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(21, 34, 71, 0.04)',
            marginBottom: '24px'
          }}
        >
          {/* Minimal Merged Table Filter Header */}
          <div
            style={{
              padding: '14px 20px',
              background: '#ffffff',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px 24px'
            }}
          >
            {/* Filter 1: Apartment Type */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#152247'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#152247" strokeWidth="2.2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                <span>Apartment Type</span>
              </div>

              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <select
                  aria-label="Select apartment type"
                  value={selectedSuiteType}
                  onChange={(e) => setSelectedSuiteType(e.target.value as '1bed' | '2bed')}
                  style={{
                    padding: '7px 32px 7px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#152247',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                  }}
                >
                  <option value="1bed">1-Bedroom Suite </option>
                  <option value="2bed">2-Bedroom Luxury Suite</option>
                </select>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#152247"
                  strokeWidth="2.5"
                  style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            {/* Filter 2: Duration */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>And</span>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#152247'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#152247" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Plan Duration</span>
              </div>

              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <select
                  aria-label="Select plan duration"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value as '6month' | '12month')}
                  style={{
                    padding: '7px 32px 7px 14px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#152247',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                  }}
                >
                  <option value="12month">12-Month Plan</option>
                  <option value="6month">6-Month Plan</option>
                </select>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#152247"
                  strokeWidth="2.5"
                  style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div style={{ overflowX: 'auto', padding: '16px 20px 20px 20px' }}>
            <table className="schedule-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
              <thead>
                <tr
                  style={{
                    background: '#ffffff',
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
                              ? 'rgba(217, 119, 6, 0.09)'
                              : r.type === 'Final Handover'
                                ? 'rgba(5, 150, 105, 0.09)'
                                : 'rgba(21, 34, 71, 0.09)',
                          color:
                            r.type === 'Down Payment'
                              ? '#B45309'
                              : r.type === 'Final Handover'
                                ? '#059669'
                                : '#152247',
                          border:
                            r.type === 'Down Payment'
                              ? '1px solid rgba(217, 119, 6, 0.22)'
                              : r.type === 'Final Handover'
                                ? '1px solid rgba(5, 150, 105, 0.22)'
                                : '1px solid rgba(21, 34, 71, 0.24)'
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
              <tfoot>
                <tr
                  className="minimal-total-row"
                  style={{
                    background: '#ffffff',
                    borderTop: '2px solid #152247'
                  }}
                >
                  <td style={{ padding: '16px', fontWeight: 800, color: '#64748b' }}>—</td>
                  <td style={{ padding: '16px', fontWeight: 800, fontSize: '14px', color: '#152247' }}>
                    Total Value Price
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background: '#152247',
                        color: '#ffffff',
                        letterSpacing: '0.4px'
                      }}
                    >
                      100% Total
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontWeight: 800, fontSize: '14px', color: '#152247' }}>
                    100%
                  </td>
                  <td style={{ padding: '16px', fontWeight: 900, fontSize: '15px', color: '#152247' }}>
                    {formatPKR(current.totalPrice)} PKR
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right', color: '#475569', fontWeight: 700, fontSize: '12.5px' }}>
                    Rs. 26,500 / sq.ft • {current.sqft} SQFT
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Clean Reserve Unit Action Button (No grey box container) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button
            className="reserve-btn-hover"
            onClick={() => onNavigate('book-now', { suiteType: selectedSuiteType, duration: selectedDuration })}
            style={{
              background: '#152247',
              color: '#ffffff',
              padding: '14px 40px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(21, 34, 71, 0.2)',
              letterSpacing: '0.3px'
            }}
          >
            Reserve Your Unit Now →
          </button>
        </div>
      </section>
    </div>
  );
};
