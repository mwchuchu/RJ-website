import React, { useState } from 'react';

interface PaymentPlanSectionProps {
  onNavigate: (tabId: string) => void;
}

export const PaymentPlanSection: React.FC<PaymentPlanSectionProps> = ({ onNavigate }) => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [selectedSuite, setSelectedSuite] = useState<'1bed' | '2bed'>('1bed');

  // Suite pricing details for live interactive feedback (Only 1 & 2 Bedroom Suites)
  const suitePricing = {
    '1bed': { title: '1-Bedroom Luxury Suite', price: 'PKR 22.8 Million', downPayment: 'PKR 5.7 M', monthly: 'PKR 325,000 / mo', possession: 'PKR 3.42 M' },
    '2bed': { title: '2-Bedroom Luxury Suite', price: 'PKR 38.5 Million', downPayment: 'PKR 9.625 M', monthly: 'PKR 550,000 / mo', possession: 'PKR 5.775 M' }
  };

  const currentSuite = suitePricing[selectedSuite];

  const segments = [
    {
      id: 0,
      name: 'Down Payment',
      percentage: 25,
      color: '#2563EB', // High-Contrast Vibrant Royal Blue
      hoverColor: '#1D4ED8',
      description: 'Immediate booking & suite allocation upon 25% down payment.',
      detailKey: 'downPayment' as const,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      id: 1,
      name: 'Easy Installments',
      percentage: 60,
      color: '#152247', // Deep Primary Navy
      hoverColor: '#1F3063',
      description: '60% spread over 3.5 years (42 monthly or 14 quarterly installments).',
      detailKey: 'monthly' as const,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#152247" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      )
    },
    {
      id: 2,
      name: 'On Possession',
      percentage: 15,
      color: '#0284c7', // Distinct Lighter Azure/Sky Blue
      hoverColor: '#0369a1',
      description: '15% final payment due upon key handover (June 2027).',
      detailKey: 'possession' as const,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
        </svg>
      )
    }
  ];

  // Calculate Pie Chart Path Arc parameters (25%, 60%, 15%)
  const getPiePath = (startPercent: number, endPercent: number, radius = 115, innerRadius = 65, cx = 140, cy = 140, isHovered = false) => {
    const scale = isHovered ? 1.06 : 1;
    const r = radius * scale;
    const ir = innerRadius * scale;

    const startAngle = (startPercent / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (endPercent / 100) * 2 * Math.PI - Math.PI / 2;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    const ix1 = cx + ir * Math.cos(endAngle);
    const iy1 = cy + ir * Math.sin(endAngle);
    const ix2 = cx + ir * Math.cos(startAngle);
    const iy2 = cy + ir * Math.sin(startAngle);

    const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;

    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${ir} ${ir} 0 ${largeArcFlag} 0 ${ix2} ${iy2} Z`;
  };

  return (
    <section
      style={{
        background: '#ffffff',
        color: '#0f172a',
        padding: '80px 32px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Space Grotesk', system-ui, sans-serif"
      }}
    >
      {/* Keyframe animations */}
      <style>{`
        @keyframes pulseGlowRingLight {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.08); opacity: 0.45; }
        }
        @keyframes pieSpinIn {
          0% { transform: rotate(-90deg) scale(0.7); opacity: 0; }
          100% { transform: rotate(0deg) scale(1); opacity: 1; }
        }
        @keyframes floatCircle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .pie-slice-path {
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .pie-slice-path:hover {
          filter: drop-shadow(0 4px 18px rgba(2, 132, 199, 0.45));
        }
        .suite-pill-btn {
          padding: 10px 24px;
          border-radius: 0px !important;
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 700;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #152247;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          z-index: 1;
          transition: color 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .suite-pill-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background: #152247;
          transition: height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: -1;
          border-radius: inherit;
        }
        .suite-pill-btn:hover::before {
          height: 100%;
        }
        .suite-pill-btn:hover {
          color: #ffffff;
          border-color: #152247;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(21, 34, 71, 0.25);
        }
        .suite-pill-btn.active {
          background: #152247;
          color: #ffffff;
          border-color: #152247;
          box-shadow: 0 6px 18px rgba(21, 34, 71, 0.3);
        }
        .circle-poster-node {
          width: 135px;
          height: 135px;
          border-radius: 50%;
          border: 1.5px solid rgba(2, 132, 199, 0.25);
          background: #f0f9ff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 8px 24px rgba(2, 132, 199, 0.08);
          transition: all 0.35s ease;
        }
        .circle-poster-node:hover {
          transform: translateY(-6px) scale(1.05);
          border-color: #0284c7;
          background: #e0f2fe;
          box-shadow: 0 14px 32px rgba(2, 132, 199, 0.2);
        }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          
          <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#0f172a', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
            Investor Payment Plan & Structure
          </h2>

          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '680px', margin: '0 auto', lineHeight: '1.6' }}>
            Book your luxury fully furnished serviced 1 & 2 bedroom suite with a 25% down payment, 60% easy monthly installments over 3.5 years, and 15% at possession.
          </p>

          {/* Interactive Suite Selector Buttons (Only 1 & 2 Bedroom Suites) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '22px' }}>
            <button
              className={`suite-pill-btn ${selectedSuite === '1bed' ? 'active' : ''}`}
              onClick={() => setSelectedSuite('1bed')}
            >
              1-Bedroom Luxury Suite
            </button>
            <button
              className={`suite-pill-btn ${selectedSuite === '2bed' ? 'active' : ''}`}
              onClick={() => setSelectedSuite('2bed')}
            >
              2-Bedroom Luxury Suite
            </button>
          </div>
        </div>

        {/* 3 Overlapping Feature Poster Circles (Pure White & Blue Palette) */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '50px' }}>
          <div className="circle-poster-node" style={{ animation: 'floatCircle 6s ease-in-out infinite', borderColor: '#2563EB', background: '#ffffff' }}>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#2563EB', lineHeight: '1' }}>25%</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>Down Payment</div>
          </div>

          <div className="circle-poster-node" style={{ zIndex: 2, transform: 'scale(1.12)', borderColor: '#152247', background: '#152247', animation: 'floatCircle 6s ease-in-out infinite 0.5s', boxShadow: '0 10px 25px rgba(21, 34, 71, 0.35)' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', lineHeight: '1' }}>60%</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#e2e8f0', marginTop: '4px' }}>Easy Installments</div>
          </div>

          <div className="circle-poster-node" style={{ animation: 'floatCircle 6s ease-in-out infinite 1s', borderColor: '#0284c7', background: '#ffffff' }}>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#0284c7', lineHeight: '1' }}>15%</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>On Possession</div>
          </div>
        </div>

        {/* Main 2-Column Grid: Left Breakdown Details | Right Live Pie Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(320px, 440px)', gap: '50px', alignItems: 'center' }}>
          
          {/* Left Column: Suite Pricing, Milestone Segment Cards & Explore Button */}
          <div>
            {/* Active Suite Total Price Display Banner */}
            <div style={{ background: '#f0f4ff', border: '1px solid rgba(37, 99, 235, 0.25)', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {currentSuite.title}
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>
                  {currentSuite.price}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Estimated Handover</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB' }}>June 2027 (Possession)</div>
              </div>
            </div>

            {/* 3 Milestone Segment Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '30px' }}>
              {segments.map((seg) => {
                const isHovered = activeSegment === seg.id;
                const valueText = currentSuite[seg.detailKey];

                return (
                  <div
                    key={seg.id}
                    onMouseEnter={() => setActiveSegment(seg.id)}
                    onMouseLeave={() => setActiveSegment(null)}
                    style={{
                      background: isHovered ? '#f0f4ff' : '#ffffff',
                      border: isHovered ? `1.5px solid ${seg.color}` : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '18px 22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.25s ease',
                      transform: isHovered ? 'translateX(6px)' : 'none',
                      boxShadow: isHovered ? `0 8px 24px ${seg.color}25` : '0 4px 12px rgba(15, 23, 42, 0.03)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: `${seg.color}15`,
                          border: `1px solid ${seg.color}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px'
                        }}
                      >
                        {seg.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                          {seg.name} ({seg.percentage}%)
                        </div>
                        <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
                          {seg.description}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', minWidth: '130px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: isHovered ? seg.color : '#0f172a' }}>
                        {valueText}
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                        STAGE VALUE
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explore Payment Plan Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button
                className="home-curtain-btn"
                onClick={() => onNavigate('payment-plan')}
                style={{
                  background: '#152247',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 800,
                  padding: '16px 36px',
                  borderRadius: '0px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 28px rgba(21, 34, 71, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  letterSpacing: '0.5px'
                }}
              >
                <span>Explore Payment Plan</span>
                <span style={{ fontSize: '18px' }}>→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Animated SVG Pie Chart & Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            {/* Soft Blue Glow Behind Chart */}
            <div
              style={{
                position: 'absolute',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(2, 132, 199, 0.15) 0%, rgba(2, 132, 199, 0) 70%)',
                animation: 'pulseGlowRingLight 4s ease-in-out infinite',
                pointerEvents: 'none'
              }}
            />

            {/* Live Interactive SVG Pie Chart */}
            <svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              style={{
                animation: 'pieSpinIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                overflow: 'visible'
              }}
            >
              {/* Segment 0: 25% Down Payment (0% to 25%) */}
              <path
                d={getPiePath(0, 25, 115, 65, 140, 140, activeSegment === 0)}
                fill={activeSegment === 0 ? segments[0].hoverColor : segments[0].color}
                className="pie-slice-path"
                onMouseEnter={() => setActiveSegment(0)}
                onMouseLeave={() => setActiveSegment(null)}
              />

              {/* Segment 1: 60% Easy Installments (25% to 85%) */}
              <path
                d={getPiePath(25, 85, 115, 65, 140, 140, activeSegment === 1)}
                fill={activeSegment === 1 ? segments[1].hoverColor : segments[1].color}
                className="pie-slice-path"
                onMouseEnter={() => setActiveSegment(1)}
                onMouseLeave={() => setActiveSegment(null)}
              />

              {/* Segment 2: 15% On Possession (85% to 100%) */}
              <path
                d={getPiePath(85, 100, 115, 65, 140, 140, activeSegment === 2)}
                fill={activeSegment === 2 ? segments[2].hoverColor : segments[2].color}
                className="pie-slice-path"
                onMouseEnter={() => setActiveSegment(2)}
                onMouseLeave={() => setActiveSegment(null)}
              />

              {/* Center Donut Hole Hub Content (No hovered stage line) */}
              <circle cx="140" cy="140" r="58" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
              
              <text x="140" y="136" textAnchor="middle" fill="#152247" fontSize="24" fontWeight="900" fontFamily="Space Grotesk">
                {activeSegment !== null ? `${segments[activeSegment].percentage}%` : '100%'}
              </text>
              <text x="140" y="156" textAnchor="middle" fill="#152247" fontSize="12" fontWeight="700">
                {activeSegment !== null ? segments[activeSegment].name : "RJ's Larom"}
              </text>
            </svg>

            {/* Interactive Pie Chart Legend */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              {segments.map((s) => (
                <div
                  key={s.id}
                  onMouseEnter={() => setActiveSegment(s.id)}
                  onMouseLeave={() => setActiveSegment(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    opacity: activeSegment === null || activeSegment === s.id ? 1 : 0.45,
                    transition: 'opacity 0.25s ease'
                  }}
                >
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                    {s.name} ({s.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
