import React, { useState, useEffect, useRef } from 'react';

// Helper function to calculate Donut Chart SVG Slice paths
function getDonutSlice(startAngle: number, endAngle: number, outerR: number, innerR: number, cx: number, cy: number) {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + outerR * Math.cos(startRad);
  const y1 = cy + outerR * Math.sin(startRad);
  const x2 = cx + outerR * Math.cos(endRad);
  const y2 = cy + outerR * Math.sin(endRad);

  const x3 = cx + innerR * Math.cos(endRad);
  const y3 = cy + innerR * Math.sin(endRad);
  const x4 = cx + innerR * Math.cos(startRad);
  const y4 = cy + innerR * Math.sin(startRad);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
}

// Helper function to calculate Pie Chart SVG Slice paths
function getPieSlice(startAngle: number, endAngle: number, r: number, cx: number, cy: number) {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

// Helper function to calculate SVG Path with top-only rounded corners (no bottom gap)
function getTopRoundedPath(x: number, y: number, w: number, h: number, r: number = 6) {
  if (h <= 0) return '';
  const actualR = Math.min(r, h, w / 2);
  return `M ${x} ${y + actualR} Q ${x} ${y} ${x + actualR} ${y} L ${x + w - actualR} ${y} Q ${x + w} ${y} ${x + w} ${y + actualR} L ${x + w} ${y + h} L ${x} ${y + h} Z`;
}

// Donut slices data
const donutSlices = [
  { label: 'Luxury Serviced Apartment', share: '31%', start: 0, end: 111.6, color: '#152247' },
  { label: 'Mid-Range Serviced Apartments', share: '22%', start: 111.6, end: 190.8, color: '#1F3063' },
  { label: 'Budget Serviced Apartment', share: '18%', start: 190.8, end: 255.6, color: '#2D437F' },
  { label: 'Boutique Serviced Apartment', share: '15%', start: 255.6, end: 309.6, color: '#0C142B' },
  { label: 'Extended Stay Hotels', share: '14%', start: 309.6, end: 360, color: 'rgba(21, 34, 71, 0.25)' }
];

// Pie slices data
const pieSlices = [
  { label: 'Direct Booking', share: '33%', start: 0, end: 118.8, color: '#152247' },
  { label: 'Corporate Contracts', share: '42%', start: 118.8, end: 270, color: '#1F3063' },
  { label: 'Online Travel Agencies', share: '25%', start: 270, end: 360, color: '#2D437F' }
];

// Homepage-Style Scroll Animate Section Component
const ScrollAnimateSection: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}> = ({ children, style = {}, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.01 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.99)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

interface WhyToInvestPageProps {
  onNavigate: (page: string) => void;
}

export const WhyToInvestPage: React.FC<WhyToInvestPageProps> = ({ onNavigate }) => {
  const [selectedMetric, setSelectedMetric] = useState<'yield' | 'price' | 'escalation'>('yield');
  const [hoveredDonut, setHoveredDonut] = useState<number | null>(null);
  const [hoveredPie, setHoveredPie] = useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [donutAnimated, setDonutAnimated] = useState(false);
  const [pieAnimated, setPieAnimated] = useState(false);
  const [barAnimated, setBarAnimated] = useState(false);
  const [isLocationVisible, setIsLocationVisible] = useState(false);

  const locationGridRef = useRef<HTMLDivElement>(null);
  const donutChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === locationGridRef.current) setIsLocationVisible(true);
            if (entry.target === donutChartRef.current) setDonutAnimated(true);
            if (entry.target === pieChartRef.current) setPieAnimated(true);
            if (entry.target === barChartRef.current) setBarAnimated(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (donutChartRef.current) observer.observe(donutChartRef.current);
    if (pieChartRef.current) observer.observe(pieChartRef.current);
    if (barChartRef.current) observer.observe(barChartRef.current);
    if (locationGridRef.current) observer.observe(locationGridRef.current);

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.transform = 'translateY(-6px)';
    card.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
    card.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
    card.style.setProperty('--light-opacity', '1');
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0)';
    card.style.setProperty('--light-opacity', '0');
  };

  const locationBenefits = [
    {
      title: 'Main Islamabad Expressway',
      sub: 'Primary artery linking Islamabad & Rawalpindi twin cities.',
      badge: '02',
      unit: 'MINS',
      time: '02:00 MIN',
      color: '#0284c7',
      darkColor: '#0369a1',
      image: 'https://images.unsplash.com/photo-1590800752883-6446fe1d3da6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
      icon: '🚗'
    },
    {
      title: 'Monal Restaurant (IMARAT)',
      sub: 'Directly opposite — iconic dining & commercial landmark.',
      badge: '00',
      unit: 'MIN',
      time: '00:00 MIN',
      color: '#059669',
      darkColor: '#047857',
      image: 'https://images.unsplash.com/photo-1780541555058-92ed9cfce7a8?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
      icon: '🍽️'
    },
    {
      title: 'Mall of Arabia',
      sub: 'Adjacent to building — premier shopping & entertainment hub.',
      badge: '01',
      unit: 'MIN',
      time: '01:00 MIN',
      color: '#d97706',
      darkColor: '#b45309',
      image: 'https://images.unsplash.com/photo-1614521084980-811d04f6c6cb?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&w=800&q=80',
      icon: '🛍️'
    },
    {
      title: 'Jamia Masjid',
      sub: '5 min walk — convenient daily prayer access & musalla.',
      badge: '05',
      unit: 'WALK',
      time: '05:00 MIN',
      color: '#7c3aed',
      darkColor: '#6d28d9',
      image: 'https://plus.unsplash.com/premium_photo-1678129531809-0b4c24671913?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hc2ppZHxlbnwwfHwwfHx8MA%3D%3D&fit=crop&w=800&q=80',
      icon: '🕌'
    },
    {
      title: 'PWD Commercial Market',
      sub: '7 min walk — vibrant commercial & retail center.',
      badge: '07',
      unit: 'WALK',
      time: '07:00 MIN',
      color: '#2563eb',
      darkColor: '#1d4ed8',
      image: 'https://images.unsplash.com/photo-1760782065835-a6a5e06509c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
      icon: '🛒'
    },
    {
      title: 'Chinnar Hospital',
      sub: '10 min drive — premier healthcare & emergency facility.',
      badge: '10',
      unit: 'DRIVE',
      time: '10:00 MIN',
      color: '#e11d48',
      darkColor: '#be123c',
      image: 'https://images.unsplash.com/photo-1710074213374-e68503a1b795?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
      icon: '🏥'
    },
    {
      title: 'Attock Petrol Station',
      sub: '10 min drive — 24/7 fuel and express convenience.',
      badge: '10',
      unit: 'DRIVE',
      time: '10:00 MIN',
      color: '#0d9488',
      darkColor: '#0f766e',
      image: 'https://images.unsplash.com/photo-1629241290025-6bb716261f5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
      icon: '⛽'
    },
    {
      title: 'Schools & Universities',
      sub: 'Educational hubs & campuses within a few miles radius.',
      badge: '15',
      unit: 'RADIUS',
      time: '15:00 MIN',
      color: '#4f46e5',
      darkColor: '#4338ca',
      image: 'https://images.unsplash.com/photo-1745692608263-0f2c254cac75?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
      icon: '🎓'
    }
  ];

  return (
    <div className="why-invest-page animate-fade-in" style={{ padding: '120px 48px 60px', background: '#f8f9fa' }}>
      <div className="section-header-centered" style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 48px' }}>
        <span className="section-subtitle-pill" style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>
          INVESTMENT CASE & LOCATION BENCHMARKS
        </span>
        <h2 className="section-main-title" style={{ fontSize: '36px', marginTop: '12px', color: '#0f172a' }}>
          Why Invest in RJ's Larom Residences
        </h2>
        <p className="section-description" style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginTop: '8px' }}>
          Islamabad leads Pakistan with 6.75% gross rental yields, 10% annual rental escalation, and unmatched pre-completion price positioning.
        </p>
      </div>

      {/* SECTION 1: Serviced Apartment Market Graph Visualizer with Mouse-Tracking Hover Effects */}
      <div className="interactive-market-graph-card">
        <div className="card-spotlight-glow" />
        <div style={{ position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '1px' }}>INTERACTIVE MARKET GRAPH</span>
            <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', margin: '4px 0', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Serviced Apartment Yield & Price Performance</h3>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setSelectedMetric('yield')}
              style={{
                padding: '10px 20px',
                borderRadius: '0px',
                fontSize: '13px',
                fontWeight: 800,
                background: selectedMetric === 'yield' ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : '#ffffff',
                color: selectedMetric === 'yield' ? '#ffffff' : '#475569',
                border: selectedMetric === 'yield' ? '1px solid #0f172a' : '1px solid #cbd5e1',
                boxShadow: selectedMetric === 'yield' ? '0 6px 20px rgba(15, 23, 42, 0.25)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: "'Space Grotesk', system-ui, sans-serif"
              }}
            >
              Rental Yields %
            </button>
            <button
              onClick={() => setSelectedMetric('price')}
              style={{
                padding: '8px 18px',
                borderRadius: '0px',
                fontSize: '12px',
                fontWeight: 800,
                background: selectedMetric === 'price' ? '#152247' : '#ffffff',
                color: selectedMetric === 'price' ? '#ffffff' : '#64748b',
                border: selectedMetric === 'price' ? '1px solid #152247' : '1px solid #cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              5-Year Capital Growth (%)
            </button>
            <button
              onClick={() => setSelectedMetric('escalation')}
              style={{
                padding: '8px 18px',
                borderRadius: '0px',
                fontSize: '12px',
                fontWeight: 800,
                background: selectedMetric === 'escalation' ? '#152247' : '#ffffff',
                color: selectedMetric === 'escalation' ? '#ffffff' : '#64748b',
                border: selectedMetric === 'escalation' ? '1px solid #152247' : '1px solid #cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              Annual Rent Escalation (%)
            </button>
          </div>
        </div>

        {/* Visual Bar Chart Comparison Representation with Interactive Row Hover Effects */}
        <div key={selectedMetric} style={{ background: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)' }}>
          {selectedMetric === 'yield' && (
            <div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '24px', color: '#0f172a', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Gross Rental Yield Comparison (% per Annum)</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="market-bar-row highlighted-larom">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>
                    <span style={{ color: '#152247' }}>RJ's Larom Serviced Apartments (Islamabad)</span>
                    <span className="market-metric-badge" style={{ background: 'rgba(21, 34, 71, 0.08)', color: '#152247' }}>6.75% Gross Yield</span>
                  </div>
                  <div className="market-bar-track">
                    <div className="animate-bar-grow market-bar-fill" style={{ width: '85%', background: '#152247' }}></div>
                  </div>
                </div>

                <div className="market-bar-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                    <span style={{ color: '#475569' }}>Standard Residential Apartments (Lahore / Karachi)</span>
                    <span className="market-metric-badge" style={{ background: '#f1f5f9', color: '#475569' }}>4.20% Gross Yield</span>
                  </div>
                  <div className="market-bar-track">
                    <div className="animate-bar-grow market-bar-fill" style={{ width: '50%', background: '#94a3b8' }}></div>
                  </div>
                </div>

                <div className="market-bar-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                    <span style={{ color: '#475569' }}>Traditional Commercial Bank Fixed Deposit</span>
                    <span className="market-metric-badge" style={{ background: '#f1f5f9', color: '#475569' }}>5.10% Net Yield</span>
                  </div>
                  <div className="market-bar-track">
                    <div className="animate-bar-grow market-bar-fill" style={{ width: '60%', background: '#cbd5e1' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMetric === 'price' && (
            <div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '24px', color: '#152247', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Forecasted Capital Growth (5-Year Horizon)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="market-bar-row highlighted-larom">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>
                    <span style={{ color: '#152247' }}>Larom Bahria Expressway Location</span>
                    <span className="market-metric-badge" style={{ background: 'rgba(21, 34, 71, 0.08)', color: '#152247' }}>+65% Projected Value Growth</span>
                  </div>
                  <div className="market-bar-track">
                    <div className="animate-bar-grow market-bar-fill" style={{ width: '85%', background: '#152247' }}></div>
                  </div>
                </div>
                <div className="market-bar-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                    <span style={{ color: '#475569' }}>Average Islamabad Sector Appreciation</span>
                    <span className="market-metric-badge" style={{ background: '#f1f5f9', color: '#475569' }}>+32% Value Growth</span>
                  </div>
                  <div className="market-bar-track">
                    <div className="animate-bar-grow market-bar-fill" style={{ width: '42%', background: '#64748b' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMetric === 'escalation' && (
            <div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '24px', color: '#152247', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Annual Rental Value Escalation (% YoY)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="market-bar-row highlighted-larom">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>
                    <span style={{ color: '#152247' }}>Islamabad Branded Residences Rental Index</span>
                    <span className="market-metric-badge" style={{ background: 'rgba(21, 34, 71, 0.08)', color: '#152247' }}>10.0% Annual Escalation</span>
                  </div>
                  <div className="market-bar-track">
                    <div className="animate-bar-grow market-bar-fill" style={{ width: '90%', background: '#152247' }}></div>
                  </div>
                </div>
                <div className="market-bar-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                    <span style={{ color: '#475569' }}>National Housing Inflation Rate</span>
                    <span className="market-metric-badge" style={{ background: '#f1f5f9', color: '#475569' }}>6.5% Annual Escalation</span>
                  </div>
                  <div className="market-bar-track">
                    <div className="animate-bar-grow market-bar-fill" style={{ width: '60%', background: '#94a3b8' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ margin: '60px 0' }}>
        <ScrollAnimateSection>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-subtitle-pill" style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 14px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px' }}>
              GLOBAL INDUSTRY DATA & FORECAST (2024–2034)
            </span>
            <h3 style={{ fontSize: '32px', fontWeight: 900, margin: '10px 0 8px 0', color: '#0f172a' }}>
              Serviced Apartment Market Intelligence
            </h3>
            <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '750px', margin: '0 auto' }}>
              Global market segmentation, booking channel distributions, and 10-year growth projection showing expansion to $397.7 Billion by 2034.
            </p>
          </div>
        </ScrollAnimateSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* CHART 1: Market Segmentation Donut Chart */}
          <ScrollAnimateSection delay={100}>
            <div
              ref={donutChartRef}
              style={{
                background: '#ffffff',
                padding: '36px',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 12px 32px rgba(2, 132, 199, 0.08)',
                color: '#0f172a',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ marginBottom: '24px' }}>
                <span style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                  MARKET SEGMENTATION
                </span>
                <h4 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: '8px 0 2px 0', fontFamily: "'Space Grotesk', 'Inter', -apple-system, sans-serif" }}>
                  Global Serviced Apartment Market Segmentation
                </h4>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  By Type ( in value % ) — Hover on slices to inspect market share
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '36px' }}>
                <div style={{ position: 'relative', width: '260px', height: '260px', flexShrink: 0 }}>
                  <svg
                    width="260"
                    height="260"
                    viewBox="0 0 260 260"
                    style={{
                      overflow: 'visible',
                      opacity: donutAnimated ? 1 : 0,
                      transform: donutAnimated ? 'rotate(0deg) scale(1)' : 'rotate(-120deg) scale(0.2)',
                      transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {donutSlices.map((slice, idx) => {
                      const isHovered = hoveredDonut === idx;
                      const midAngle = (slice.start + slice.end) / 2;
                      const midRad = (midAngle - 90) * (Math.PI / 180);
                      const popX = isHovered ? Math.cos(midRad) * 8 : 0;
                      const popY = isHovered ? Math.sin(midRad) * 8 : 0;

                      const outerR = isHovered ? 116 : 108;
                      const pathD = getDonutSlice(slice.start, slice.end, outerR, 68, 130, 130);

                      return (
                        <g key={idx} transform={`translate(${popX}, ${popY})`} style={{ transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                          <path
                            d={pathD}
                            fill={slice.color}
                            style={{
                              transition: `all 0.4s ease ${idx * 90}ms`,
                              cursor: 'pointer',
                              filter: isHovered ? 'drop-shadow(0 8px 16px rgba(2, 132, 199, 0.45))' : 'none'
                            }}
                            onMouseEnter={() => setHoveredDonut(idx)}
                            onMouseLeave={() => setHoveredDonut(null)}
                          />
                        </g>
                      );
                    })}

                    {/* Donut Center Hub */}
                    <circle
                      cx="130"
                      cy="130"
                      r="64"
                      fill="#ffffff"
                      stroke="#e2e8f0"
                      strokeWidth="2.5"
                      style={{
                        filter: 'drop-shadow(0 4px 10px rgba(15, 23, 42, 0.06))',
                        opacity: donutAnimated ? 1 : 0,
                        transform: donutAnimated ? 'scale(1)' : 'scale(0)',
                        transformOrigin: '130px 130px',
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                      }}
                    />
                    {hoveredDonut !== null ? (
                      <g>
                        <text
                          x="130"
                          y="122"
                          textAnchor="middle"
                          fill="#0284c7"
                          fontSize="22"
                          fontWeight="900"
                          fontFamily="'Space Grotesk', 'Inter', -apple-system, sans-serif"
                        >
                          {donutSlices[hoveredDonut].share}
                        </text>
                        <text
                          x="130"
                          y="142"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="11"
                          fontWeight="800"
                          fontFamily="'Outfit', 'Inter', -apple-system, sans-serif"
                        >
                          {donutSlices[hoveredDonut].label.split(' ')[0]}
                        </text>
                      </g>
                    ) : (
                      <g style={{ opacity: donutAnimated ? 1 : 0, transition: 'opacity 0.6s ease 0.5s' }}>
                        <text
                          x="130"
                          y="125"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="14"
                          fontWeight="900"
                          fontFamily="'Space Grotesk', 'Inter', -apple-system, sans-serif"
                        >
                          Market
                        </text>
                        <text
                          x="130"
                          y="142"
                          textAnchor="middle"
                          fill="#0284c7"
                          fontSize="12"
                          fontWeight="800"
                          fontFamily="'Outfit', 'Inter', -apple-system, sans-serif"
                        >
                          Segmentation
                        </text>
                      </g>
                    )}
                  </svg>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', flex: 1, minWidth: '260px' }}>
                  {donutSlices.map((slice, idx) => {
                    const isHovered = hoveredDonut === idx;
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredDonut(idx)}
                        onMouseLeave={() => setHoveredDonut(null)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          background: isHovered ? '#f0f9ff' : '#f8fafc',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: isHovered ? '2px solid #0284c7' : '1px solid #e2e8f0',
                          transform: isHovered ? 'translateY(-3px)' : 'none',
                          boxShadow: isHovered ? '0 8px 20px rgba(2, 132, 199, 0.18)' : 'none',
                          opacity: donutAnimated ? 1 : 0,
                          transition: `all 0.5s ease ${200 + idx * 80}ms`,
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ width: '16px', height: '16px', borderRadius: '4px', background: slice.color, display: 'inline-block', flexShrink: 0 }} />
                        <div>
                          <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '13px', fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif" }}>{slice.label}</div>
                          <div style={{ color: '#0284c7', fontSize: '12px', fontWeight: 800, fontFamily: "'Space Grotesk', 'Inter', -apple-system, sans-serif" }}>{slice.share} Market Share</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollAnimateSection>

          {/* CHART 2: Booking Channels Pie Chart */}
          <ScrollAnimateSection delay={150}>
            <div
              ref={pieChartRef}
              style={{
                background: '#ffffff',
                padding: '36px',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 12px 32px rgba(2, 132, 199, 0.08)',
                color: '#0f172a',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ marginBottom: '24px' }}>
                <span style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                  BOOKING CHANNELS (2024)
                </span>
                <h4 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: '8px 0 2px 0', fontFamily: "'Space Grotesk', 'Inter', -apple-system, sans-serif" }}>
                  Serviced Apartment Market Share
                </h4>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                  Share, by Booking Mode, 2024 (%) — Hover on slices to inspect channels
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '36px' }}>
                <div style={{ position: 'relative', width: '260px', height: '260px', flexShrink: 0 }}>
                  <svg
                    width="260"
                    height="260"
                    viewBox="0 0 260 260"
                    style={{
                      overflow: 'visible',
                      opacity: pieAnimated ? 1 : 0,
                      transform: pieAnimated ? 'rotate(0deg) scale(1)' : 'rotate(-140deg) scale(0.25)',
                      transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {pieSlices.map((slice, idx) => {
                      const isHovered = hoveredPie === idx;
                      const midAngle = (slice.start + slice.end) / 2;
                      const midRad = (midAngle - 90) * (Math.PI / 180);
                      const popX = isHovered ? Math.cos(midRad) * 10 : 0;
                      const popY = isHovered ? Math.sin(midRad) * 10 : 0;

                      const radius = isHovered ? 116 : 108;
                      const pathD = getPieSlice(slice.start, slice.end, radius, 130, 130);

                      // Text position on slice
                      const labelRadius = isHovered ? 75 : 68;
                      const labelX = 130 + Math.cos(midRad) * labelRadius;
                      const labelY = 130 + Math.sin(midRad) * labelRadius;

                      return (
                        <g key={idx} transform={`translate(${popX}, ${popY})`} style={{ transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                          <path
                            d={pathD}
                            fill={slice.color}
                            style={{
                              transition: `all 0.4s ease ${idx * 120}ms`,
                              cursor: 'pointer',
                              filter: isHovered ? 'drop-shadow(0 8px 18px rgba(2, 132, 199, 0.45))' : 'none'
                            }}
                            onMouseEnter={() => setHoveredPie(idx)}
                            onMouseLeave={() => setHoveredPie(null)}
                          />
                          <text
                            x={labelX}
                            y={labelY + 4}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize={isHovered ? '16' : '14'}
                            fontWeight="900"
                            fontFamily="'Space Grotesk', 'Inter', -apple-system, sans-serif"
                            style={{
                              pointerEvents: 'none',
                              opacity: pieAnimated ? 1 : 0,
                              transition: `opacity 0.5s ease ${0.4 + idx * 0.1}s, font-size 0.3s ease`
                            }}
                          >
                            {slice.share}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, minWidth: '260px' }}>
                  {pieSlices.map((slice, idx) => {
                    const isHovered = hoveredPie === idx;
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredPie(idx)}
                        onMouseLeave={() => setHoveredPie(null)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          background: isHovered ? '#f0f9ff' : '#f8fafc',
                          padding: '14px 18px',
                          borderRadius: '14px',
                          border: isHovered ? '2px solid #0284c7' : '1px solid #e2e8f0',
                          transform: isHovered ? 'translateY(-3px)' : 'none',
                          boxShadow: isHovered ? '0 8px 20px rgba(2, 132, 199, 0.18)' : 'none',
                          opacity: pieAnimated ? 1 : 0,
                          transition: `all 0.5s ease ${200 + idx * 100}ms`,
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ width: '16px', height: '16px', borderRadius: '4px', background: slice.color, display: 'inline-block' }} />
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '14px', fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif" }}>{slice.label}</span>
                          <span style={{ color: '#0284c7', fontWeight: 900, fontSize: '15px', fontFamily: "'Space Grotesk', 'Inter', -apple-system, sans-serif" }}>{slice.share}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollAnimateSection>

          {/* LINE 3 / CHART 3: Unified SVG Stacked Bar Chart & Slope Line */}
          <ScrollAnimateSection delay={200}>
            <div
              ref={barChartRef}
              style={{
                background: '#ffffff',
                padding: '40px',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 12px 32px rgba(2, 132, 199, 0.08)',
                color: '#0f172a',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
                <div>
                  <span style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                    10-YEAR GROWTH TRAJECTORY
                  </span>
                  <h4 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '8px 0 2px 0', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    Serviced Apartment Market Size
                  </h4>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                    Size, by Type, 2024-2034 (USD Billion) — Features Slope Line Fitted Directly to Every Bar
                  </p>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#f8fafc', padding: '10px 20px', borderRadius: '99px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <span style={{ width: '14px', height: '14px', background: '#38bdf8', borderRadius: '4px', display: 'inline-block' }} />
                    <span style={{ color: '#0f172a', fontWeight: 700 }}>Short-Term (&lt;30 Nights)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <span style={{ width: '14px', height: '14px', background: '#0284c7', borderRadius: '4px', display: 'inline-block' }} />
                    <span style={{ color: '#0f172a', fontWeight: 700 }}>Long-Term (&gt;30 Nights)</span>
                  </div>
                </div>
              </div>

              {/* Pure SVG Unified Graphic: Bars + Slope Line + Labels + Node Circles */}
              <div style={{ position: 'relative', width: '100%', overflowX: 'auto', padding: '10px 0' }}>
                <div style={{ minWidth: '880px' }}>
                  <svg width="880" height="320" viewBox="0 0 880 320" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                    
                    {/* Y-Axis Value Labels & Baseline */}
                    {[0, 100, 200, 300, 400].map((yVal) => {
                      const yPos = 270 - (yVal / 450) * 210;
                      return (
                        <g key={yVal}>
                          <text x="36" y={yPos + 4} textAnchor="end" fill="#64748b" fontSize="12" fontWeight="700">
                            {yVal}
                          </text>
                        </g>
                      );
                    })}

                    {/* Baseline X-Axis Line */}
                    <line x1="45" y1="270" x2="855" y2="270" stroke="#cbd5e1" strokeWidth="2" />

                    {/* 11 Yearly Stacked Bars (SVG Rects) with Column Hover Highlights & Tooltips */}
                    {[
                      { year: '2024', total: 120.3, longTerm: 78.2, shortTerm: 42.1, cx: 85.9 },
                      { year: '2025', total: 135.6, longTerm: 88.1, shortTerm: 47.5, cx: 157.7 },
                      { year: '2026', total: 152.8, longTerm: 99.3, shortTerm: 53.5, cx: 229.5 },
                      { year: '2027', total: 172.2, longTerm: 111.9, shortTerm: 60.3, cx: 301.3 },
                      { year: '2028', total: 194.1, longTerm: 126.2, shortTerm: 67.9, cx: 373.1 },
                      { year: '2029', total: 218.7, longTerm: 142.2, shortTerm: 76.5, cx: 444.9 },
                      { year: '2030', total: 246.5, longTerm: 160.2, shortTerm: 86.3, cx: 516.7 },
                      { year: '2031', total: 277.8, longTerm: 180.6, shortTerm: 97.2, cx: 588.5 },
                      { year: '2032', total: 313.1, longTerm: 203.5, shortTerm: 109.6, cx: 660.3 },
                      { year: '2033', total: 352.8, longTerm: 229.3, shortTerm: 123.5, cx: 732.1 },
                      { year: '2034', total: 397.7, longTerm: 258.5, shortTerm: 139.2, cx: 803.9, isPeak: true }
                    ].map((item, idx) => {
                      const isHovered = hoveredBar === idx;
                      const totalHeight = barAnimated ? (item.total / 450) * 210 : 0;
                      const longHeight = barAnimated ? (item.longTerm / 450) * 210 : 0;
                      const shortHeight = barAnimated ? (item.shortTerm / 450) * 210 : 0;

                      const barTopY = 270 - totalHeight;
                      const longTopY = 270 - longHeight;
                      const barX = item.cx - 17;

                      return (
                        <g
                          key={item.year}
                          cursor="pointer"
                          onMouseEnter={() => setHoveredBar(idx)}
                          onMouseLeave={() => setHoveredBar(null)}
                          style={{ transition: 'all 0.3s ease' }}
                        >
                          {/* Invisible hover trigger area covering the column */}
                          <rect
                            x={item.cx - 24}
                            y="30"
                            width="48"
                            height="240"
                            fill="transparent"
                          />

                          {/* Long-Term Segment (Bottom - #0284c7) */}
                          <rect
                            x={barX}
                            y={longTopY}
                            width="34"
                            height={longHeight}
                            fill={isHovered ? '#0369a1' : '#0284c7'}
                            style={{
                              transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 50}ms`,
                              filter: isHovered ? 'brightness(1.15) drop-shadow(0 6px 14px rgba(2, 132, 199, 0.45))' : 'none'
                            }}
                          />

                          {/* Short-Term Segment (Top - #38bdf8 with top-only rounded corners) */}
                          <path
                            d={getTopRoundedPath(barX, barTopY, 34, shortHeight, 6)}
                            fill={isHovered ? '#7dd3fc' : '#38bdf8'}
                            style={{
                              transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 50}ms`,
                              filter: isHovered ? 'brightness(1.15) drop-shadow(0 6px 14px rgba(2, 132, 199, 0.45))' : 'none'
                            }}
                          />

                          {/* Year Label Below Baseline */}
                          <text
                            x={item.cx}
                            y="294"
                            textAnchor="middle"
                            fill={isHovered ? '#0284c7' : item.isPeak ? '#0284c7' : '#0f172a'}
                            fontSize="13"
                            fontWeight={isHovered || item.isPeak ? '900' : '700'}
                          >
                            {item.year}
                          </text>

                          {/* Total Value Text / Highlight Badge Above Bar */}
                          {item.isPeak ? (
                            <g transform={`translate(${item.cx - 28}, ${barTopY - 28})`}>
                              <rect width="56" height="22" rx="6" ry="6" fill="url(#blueGrad)" />
                              <text x="28" y="15" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
                                397.7
                              </text>
                            </g>
                          ) : (
                            <text
                              x={item.cx}
                              y={barTopY - 10}
                              textAnchor="middle"
                              fill={isHovered ? '#0284c7' : '#0f172a'}
                              fontSize={isHovered ? '13' : '11'}
                              fontWeight="900"
                              style={{ opacity: barAnimated ? 1 : 0, transition: `opacity 0.4s ease ${0.4 + idx * 0.05}s` }}
                            >
                              {item.total}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Gradient Definition for 2034 Peak Badge */}
                    <defs>
                      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0284c7" />
                        <stop offset="100%" stopColor="#0369a1" />
                      </linearGradient>
                    </defs>

                    {/* Solid Growth Slope Line - Touches EXACT top center of EVERY bar */}
                    <path
                      d="M 85.9 213.9 L 157.7 206.7 L 229.5 198.7 L 301.3 189.6 L 373.1 179.4 L 444.9 167.9 L 516.7 155.0 L 588.5 140.4 L 660.3 123.9 L 732.1 105.4 L 803.9 84.4"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="4"
                      strokeDasharray="1200"
                      strokeDashoffset={barAnimated ? 0 : 1200}
                      style={{
                        filter: 'drop-shadow(0 4px 10px rgba(2, 132, 199, 0.45))',
                        transition: 'stroke-dashoffset 1.4s ease-out 0.2s'
                      }}
                    />

                    {/* Slope Point Node Circles directly on top of EVERY bar */}
                    {[
                      { cx: 85.9, cy: 213.9 },
                      { cx: 157.7, cy: 206.7 },
                      { cx: 229.5, cy: 198.7 },
                      { cx: 301.3, cy: 189.6 },
                      { cx: 373.1, cy: 179.4 },
                      { cx: 444.9, cy: 167.9 },
                      { cx: 516.7, cy: 155.0 },
                      { cx: 588.5, cy: 140.4 },
                      { cx: 660.3, cy: 123.9 },
                      { cx: 732.1, cy: 105.4 },
                      { cx: 803.9, cy: 84.4 }
                    ].map((pt, i) => {
                      const isHovered = hoveredBar === i;
                      return (
                        <circle
                          key={i}
                          cx={pt.cx}
                          cy={pt.cy}
                          r={isHovered ? 8.5 : 6}
                          fill={isHovered ? '#0284c7' : '#ffffff'}
                          stroke={isHovered ? '#ffffff' : '#0284c7'}
                          strokeWidth="3"
                          style={{
                            opacity: barAnimated ? 1 : 0,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={() => setHoveredBar(i)}
                          onMouseLeave={() => setHoveredBar(null)}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Bottom Highlight Callout Banner */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e2e8f0', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', padding: '20px 24px', borderRadius: '16px' }}>
                <span style={{ fontSize: '32px', fontWeight: 900, color: '#0284c7', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>12.7%</span>
                <div style={{ fontSize: '15px', color: '#0f172a', fontWeight: 700 }}>
                  The Forecasted Market Size for 2034 in USD <strong style={{ color: '#0284c7', fontSize: '22px', marginLeft: '6px', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>$397.7 Billion</strong>
                </div>
              </div>
            </div>
          </ScrollAnimateSection>

        </div>
      </div>

      <div>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-subtitle-pill" style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>
            UNMATCHED CONNECTIVITY
          </span>
          <h3 style={{ fontSize: '28px', margin: '8px 0', color: '#0f172a' }}>Prime Location Benefits</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Plot 13, Bahria Lifestyle, Islamabad Expressway — The City's Best at Your Doorstep.</p>
        </div>

        {/* Grid of Prime Location Event-Style Cards matching reference mockup */}
        <div ref={locationGridRef} className="prime-location-event-grid">
          {locationBenefits.map((item, idx) => {
            return (
              <ScrollAnimateSection key={idx} delay={idx * 60}>
                <div
                  className="location-event-card-item"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    '--card-theme-color': item.color,
                    '--card-theme-dark': item.darkColor
                  } as any}
                >
                  {/* Full Bleed Background Image */}
                  <img src={item.image} alt={item.title} className="location-event-bg-img" />

                  {/* Top-to-Bottom Curtain Drop Overlay Animation on Scroll */}
                  <div
                    className={`prime-location-curtain-overlay ${isLocationVisible ? 'curtain-drop' : ''}`}
                    style={{ transitionDelay: `${idx * 120}ms` }}
                  />

                  {/* Color Gradient Overlay */}
                  <div className="location-event-gradient-overlay" />

                  {/* Card Content Body */}
                  <div className="location-event-card-body">
                    <h4 className="location-event-card-title">{item.title}</h4>

                    {/* Bottom Detail Glass Bar */}
                    <div className="location-event-meta-bar">
                      {/* Left Badge Box */}
                      <div className="location-event-badge-box">
                        <span className="location-event-badge-top">{item.badge}</span>
                        <span className="location-event-badge-bottom">{item.unit}</span>
                      </div>

                      {/* Center Info Text */}
                      <div className="location-event-meta-info">
                        <span className="location-event-meta-sub">{item.sub}</span>
                      </div>

                      {/* Right Time Pill */}
                      <span className="location-event-time-pill">{item.time}</span>
                    </div>
                  </div>
                </div>
              </ScrollAnimateSection>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <button
          className="hero-btn"
          onClick={() => onNavigate('book-now')}
          style={{ background: '#121318', color: '#ffffff', padding: '14px 36px', borderRadius: '0px', fontSize: '15px', fontWeight: 700 }}
        >
          Book Your Unit
        </button>
      </div>
    </div>
  );
};

