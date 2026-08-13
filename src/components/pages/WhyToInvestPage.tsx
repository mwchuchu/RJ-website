import React, { useState, useEffect, useRef } from 'react';

// Helper function to calculate SVG Path with top-only rounded corners
function getTopRoundedPath(x: number, y: number, w: number, h: number, r: number = 6) {
  if (h <= 0) return '';
  const actualR = Math.min(r, h, w / 2);
  return `M ${x} ${y + actualR} Q ${x} ${y} ${x + actualR} ${y} L ${x + w - actualR} ${y} Q ${x + w} ${y} ${x + w} ${y + actualR} L ${x + w} ${y + h} L ${x} ${y + h} Z`;
}

// Scroll Animate Wrapper Component
const ScrollAnimateSection: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}> = ({ children, style = {}, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Image Tray Component with 4 columns decreasing in size from left to right on white background
const SlideshowImageTray: React.FC = () => {
  const slides = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2aW5nJTIwYXJlYXxlbnwwfHwwfHx8MA%3D%3D',
      altSources: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
      alt: 'Luxury Serviced Suite Living Area'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      altSources: ['https://images.unsplash.com/photo-1617098900591-3f90928e8c54?auto=format&fit=crop&w=1200&q=80'],
      alt: 'Luxury Master Bedroom Suite'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&auto=format&fit=crop&q=80',
      altSources: ['https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=1200&q=80'],
      alt: 'Modern Living Room Lounge'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1634822929331-ee4dc2c97fc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVzaWduZXIlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D',
      altSources: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'],
      alt: 'Designer Serviced Apartment Interior'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      altSources: ['https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80'],
      alt: 'Penthouse Living Room'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D',
      altSources: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80'],
      alt: 'Executive Bedroom Suite'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1616593969747-4797dc75033e?q=80&w=1200&auto=format&fit=crop&q=80',
      altSources: ['https://images.unsplash.com/photo-1591944438730-23dbc9076a9a?auto=format&fit=crop&w=1200&q=80'],
      alt: 'Private Balcony View'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const trayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    if (trayRef.current) {
      observer.observe(trayRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [slides.length]);

  const getSlideAt = (offset: number) => {
    return slides[(currentIndex + offset) % slides.length];
  };

  // Height steps decreasing from left to right
  const cardHeights = ['380px', '325px', '270px', '215px'];

  return (
    <div
      ref={trayRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '420px',
        marginBottom: '80px',
        background: 'transparent',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Background Architectural Vector Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, rgba(2, 132, 199, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(2, 132, 199, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          zIndex: 1
        }}
      />

      {/* 4 Image Columns Decreasing in Height to the Right */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 0.85fr 0.7fr',
          height: '100%',
          gap: '16px',
          padding: '20px',
          alignItems: 'center'
        }}
      >
        {[0, 1, 2, 3].map((offset) => {
          const slide = getSlideAt(offset);
          const height = cardHeights[offset];

          return (
            <div
              key={offset}
              style={{
                height: height,
                width: '100%',
                overflow: 'hidden',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                boxShadow: offset === 0 ? '0 12px 30px rgba(15, 23, 42, 0.08)' : '0 6px 18px rgba(15, 23, 42, 0.04)',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0) scale(1)' : `translateY(${20 + offset * 10}px) scale(0.95)`,
                transition: `all 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${offset * 80}ms`
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (slide.altSources && slide.altSources.length > 0) {
                    target.src = slide.altSources[0];
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: offset === 0 ? 'top center' : 'center',
                  display: 'block',
                  transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface WhyToInvestPageProps {
  onNavigate: (page: string) => void;
}

export const WhyToInvestPage: React.FC<WhyToInvestPageProps> = ({ onNavigate }) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [isYieldVisible, setIsYieldVisible] = useState(false);
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const [isLocationVisible, setIsLocationVisible] = useState(false);

  const yieldSectionRef = useRef<HTMLDivElement>(null);
  const graphSectionRef = useRef<HTMLDivElement>(null);
  const locationGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === yieldSectionRef.current) {
            setIsYieldVisible(entry.isIntersecting);
          }
          if (entry.target === graphSectionRef.current) {
            setIsGraphVisible(entry.isIntersecting);
          }
          if (entry.target === locationGridRef.current) {
            setIsLocationVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    if (yieldSectionRef.current) observer.observe(yieldSectionRef.current);
    if (graphSectionRef.current) observer.observe(graphSectionRef.current);
    if (locationGridRef.current) observer.observe(locationGridRef.current);
    return () => observer.disconnect();
  }, []);



  const locationBenefits = [
    {
      title: 'Main Islamabad Expressway',
      sub: 'Primary artery linking Islamabad & Rawalpindi twin cities.',
      badge: '02',
      unit: 'MINS',
      time: '02:00 MIN',
      color: '#0284c7',
      darkColor: '#0369a1',
      image: 'https://images.unsplash.com/photo-1590800752883-6446fe1d3da6?q=80&w=687&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1780541555058-92ed9cfce7a8?q=80&w=737&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1614521084980-811d04f6c6cb?q=80&w=735&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://plus.unsplash.com/premium_photo-1678129531809-0b4c24671913?w=600&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1760782065835-a6a5e06509c3?q=80&w=1170&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1710074213374-e68503a1b795?q=80&w=736&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1629241290025-6bb716261f5f?q=80&w=1170&auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1745692608263-0f2c254cac75?q=80&w=1074&auto=format&fit=crop&w=800&q=80',
      icon: '🎓'
    }
  ];



  // 11 Yearly Stacked Data Points for 2024–2034 Market Size Graph
  const yearlyMarketData = [
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
  ];

  return (
    <div className="why-invest-page animate-fade-in" style={{ padding: '120px 48px 60px', background: '#f8f9fa', color: '#0f172a' }}>

      {/* SECTION 1: HEADER & AUTOPLAY SLIDESHOW IMAGE TRAY (EXACT MATCH TO REFERENCE MOCKUP UI) */}
      <ScrollAnimateSection>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '48px',
            alignItems: 'start',
            marginBottom: '48px'
          }}
        >
          {/* Left Column: Bold Headline */}
          <div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '44px',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                margin: 0
              }}
            >
              THE PERFECT PARTNER<br />FOR YOUR REAL ESTATE NEEDS
            </h1>
          </div>

          {/* Right Column: Clean Muted Paragraph */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '14.5px',
                lineHeight: '1.7',
                color: '#475569',
                margin: 0
              }}
            >
              At RJ Developers, We Believe That Finding Your Dream Investment Should Be An Enjoyable & High-Yield Experience. With Over 15 Years Of Proven Real Estate Leadership, Our Team Is Dedicated To Delivering Premium Hospitality & Branded Residence Assets That Cater To Your Long-Term Capital Growth And Passive Income Goals.
            </p>
          </div>
        </div>

        {/* Interactive Image Tray Decreasing in Height to the Right */}
        <SlideshowImageTray />
      </ScrollAnimateSection>


      {/* SECTION 3: VERTICAL RENTAL YIELD PERFORMANCE COMPARISON GRAPH */}
      <ScrollAnimateSection>
        <div ref={yieldSectionRef} style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <h3
              style={{
                fontSize: '30px',
                fontWeight: 900,
                color: '#0f172a',
                margin: '0 0 10px 0',
                fontFamily: "'Space Grotesk', system-ui, sans-serif"
              }}
            >
              Serviced Apartment Yield & Price Performance
            </h3>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '14.5px', color: '#64748b', margin: 0 }}>
              Gross annual rental yield comparison benchmarked against standard residential apartments & traditional bank assets.
            </p>
          </div>

          {/* 3 Vertical Bar Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              maxWidth: '850px',
              margin: '0 auto',
              alignItems: 'flex-end',
              paddingTop: '20px'
            }}
          >
            {[
              {
                title: "RJ's Larom Serviced Apartments",
                location: 'Islamabad Expressway',
                value: '6.75%',
                label: 'Gross Yield',
                height: 210,
                isPrimary: true
              },
              {
                title: 'Standard Residential Apartments',
                location: 'Lahore / Karachi Average',
                value: '4.20%',
                label: 'Gross Yield',
                height: 130,
                isPrimary: false
              },
              {
                title: 'Traditional Fixed Deposit',
                location: 'Commercial Bank Rate',
                value: '5.10%',
                label: 'Net Yield',
                height: 160,
                isPrimary: false
              }
            ].map((item, idx) => {
              const animatedHeight = isYieldVisible ? item.height : 0;

              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  {/* Top Value Badge */}
                  <div
                    style={{
                      opacity: isYieldVisible ? 1 : 0,
                      transform: isYieldVisible ? 'translateY(0) scale(1)' : 'translateY(15px) scale(0.9)',
                      transition: `opacity 0.5s ease ${300 + idx * 100}ms, transform 0.5s ease ${300 + idx * 100}ms`,
                      marginBottom: '14px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: item.isPrimary ? '26px' : '20px',
                        fontWeight: 900,
                        color: item.isPrimary ? '#152247' : '#475569',
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        display: 'block'
                      }}
                    >
                      {item.value}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {item.label}
                    </span>
                  </div>

                  {/* Vertical Bar Track & Pillar */}
                  <div
                    style={{
                      width: item.isPrimary ? '24px' : '16px',
                      height: '240px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      background: '#f1f5f9',
                      borderRadius: '12px',
                      padding: '3px',
                      overflow: 'hidden',
                      marginBottom: '20px',
                      border: item.isPrimary ? '1px solid rgba(21, 34, 71, 0.15)' : '1px solid #e2e8f0',
                      boxShadow: item.isPrimary ? '0 10px 25px rgba(21, 34, 71, 0.12)' : 'none'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: `${animatedHeight}px`,
                        background: item.isPrimary
                          ? 'linear-gradient(to top, #152247 0%, #0284c7 100%)'
                          : 'linear-gradient(to top, #475569 0%, #94a3b8 100%)',
                        borderRadius: '9px',
                        transition: `height 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 120}ms`,
                        boxShadow: item.isPrimary ? '0 6px 16px rgba(2, 132, 199, 0.3)' : 'none'
                      }}
                    />
                  </div>

                  {/* Bottom Title Label */}
                  <div
                    style={{
                      opacity: isYieldVisible ? 1 : 0,
                      transform: isYieldVisible ? 'translateY(0)' : 'translateY(10px)',
                      transition: `opacity 0.5s ease ${400 + idx * 100}ms, transform 0.5s ease ${400 + idx * 100}ms`
                    }}
                  >
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      {item.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollAnimateSection>

      {/* SECTION 4: 10-YEAR MARKET SIZE GRAPH ($397.7 BILLION PEAK) */}
      <ScrollAnimateSection>
        <div ref={graphSectionRef} style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <h3
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '32px',
                fontWeight: 900,
                color: '#0f172a',
                margin: '0 0 10px 0',
                textTransform: 'uppercase'
              }}
            >
              Serviced Apartment Market Intelligence
            </h3>

            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '14.5px', color: '#64748b', margin: 0 }}>
              10-year growth projection showing expansion to $397.7 Billion by 2034.
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '28px' }}>
              {/* Legend */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#f8fafc', padding: '10px 20px', borderRadius: '99px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ width: '12px', height: '12px', background: '#38bdf8', borderRadius: '3px', display: 'inline-block' }} />
                  <span style={{ color: '#0f172a', fontWeight: 700 }}>Short-Term (&lt;30 Nights)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ width: '12px', height: '12px', background: '#152247', borderRadius: '3px', display: 'inline-block' }} />
                  <span style={{ color: '#0f172a', fontWeight: 700 }}>Long-Term (&gt;30 Nights)</span>
                </div>
              </div>
            </div>

            {/* Pure SVG Graphic: 11 Yearly Stacked Bars + Thinner Slope Line + Peak Badge */}
            <div style={{ position: 'relative', width: '100%', overflowX: 'auto', padding: '10px 0', marginBottom: '32px' }}>
              <div style={{ minWidth: '880px' }}>
                <svg width="880" height="320" viewBox="0 0 880 320" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>

                  {/* Y-Axis Value Labels & Thinner Grid Lines */}
                  {[0, 100, 200, 300, 400].map((yVal) => {
                    const yPos = 270 - (yVal / 450) * 210;
                    return (
                      <g key={yVal}>
                        <text x="36" y={yPos + 4} textAnchor="end" fill="#64748b" fontSize="12" fontWeight="700">
                          {yVal}
                        </text>
                        {yVal > 0 && (
                          <line x1="45" y1={yPos} x2="855" y2={yPos} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                        )}
                      </g>
                    );
                  })}

                  {/* Thinner Baseline X-Axis Line */}
                  <line x1="45" y1="270" x2="855" y2="270" stroke="#cbd5e1" strokeWidth="1" />

                  {/* 11 Yearly Stacked Bars (SVG Rects) */}
                  {yearlyMarketData.map((item, idx) => {
                    const isHovered = hoveredBar === idx;
                    const totalHeight = (item.total / 450) * 210;
                    const longHeight = (item.longTerm / 450) * 210;
                    const shortHeight = (item.shortTerm / 450) * 210;

                    // Animated Values based on scroll visibility
                    const currentLongHeight = isGraphVisible ? longHeight : 0;
                    const currentLongTopY = isGraphVisible ? 270 - longHeight : 270;
                    const currentShortHeight = isGraphVisible ? shortHeight : 0;
                    const currentBarTopY = isGraphVisible ? 270 - totalHeight : 270;
                    const barX = item.cx - 6;

                    return (
                      <g
                        key={item.year}
                        cursor="pointer"
                        onMouseEnter={() => setHoveredBar(idx)}
                        onMouseLeave={() => setHoveredBar(null)}
                        style={{ transition: 'all 0.3s ease' }}
                      >
                        {/* Invisible hover trigger area */}
                        <rect
                          x={item.cx - 24}
                          y="30"
                          width="48"
                          height="240"
                          fill="transparent"
                        />

                        {/* Long-Term Segment (Bottom - Deep Navy #152247) */}
                        <rect
                          x={barX}
                          y={currentLongTopY}
                          width="12"
                          height={currentLongHeight}
                          fill={isHovered ? '#0C142B' : '#152247'}
                          style={{
                            transition: `height 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 60}ms, y 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 60}ms, fill 0.3s ease`,
                            filter: isHovered ? 'brightness(1.15) drop-shadow(0 4px 10px rgba(21, 34, 71, 0.35))' : 'none'
                          }}
                        />

                        {/* Short-Term Segment (Top - High-Contrast Vibrant Sky Blue #38bdf8) */}
                        <path
                          d={getTopRoundedPath(barX, currentBarTopY, 12, currentShortHeight, 3)}
                          fill={isHovered ? '#7dd3fc' : '#38bdf8'}
                          style={{
                            transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 60}ms`,
                            filter: isHovered ? 'brightness(1.15) drop-shadow(0 4px 10px rgba(56, 189, 248, 0.35))' : 'none'
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
                          <g
                            transform={`translate(${item.cx - 28}, ${currentBarTopY - 28})`}
                            style={{
                              opacity: isGraphVisible ? 1 : 0,
                              transition: `opacity 0.5s ease ${600 + idx * 40}ms`
                            }}
                          >
                            <rect width="56" height="22" rx="6" ry="6" fill="url(#blueGrad)" />
                            <text x="28" y="15" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">
                              397.7
                            </text>
                          </g>
                        ) : (
                          <text
                            x={item.cx}
                            y={currentBarTopY - 10}
                            textAnchor="middle"
                            fill={isHovered ? '#0284c7' : '#0f172a'}
                            fontSize={isHovered ? '13' : '11'}
                            fontWeight="900"
                            style={{
                              opacity: isGraphVisible ? 1 : 0,
                              transition: `opacity 0.5s ease ${600 + idx * 40}ms`
                            }}
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

                  {/* Animated Sleeker Growth Slope Line */}
                  <path
                    d="M 85.9 213.9 L 157.7 206.7 L 229.5 198.7 L 301.3 189.6 L 373.1 179.4 L 444.9 167.9 L 516.7 155.0 L 588.5 140.4 L 660.3 123.9 L 732.1 105.4 L 803.9 84.4"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.8"
                    strokeDasharray="900"
                    strokeDashoffset={isGraphVisible ? 0 : 900}
                    style={{
                      transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
                      filter: 'drop-shadow(0 2px 6px rgba(2, 132, 199, 0.35))'
                    }}
                  />

                  {/* Slope Point Node Circles */}
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
                        r={isHovered ? 6.5 : 4}
                        fill={isHovered ? '#0284c7' : '#ffffff'}
                        stroke={isHovered ? '#ffffff' : '#0284c7'}
                        strokeWidth="1.5"
                        style={{
                          opacity: isGraphVisible ? 1 : 0,
                          transform: isGraphVisible ? 'scale(1)' : 'scale(0)',
                          transformOrigin: `${pt.cx}px ${pt.cy}px`,
                          transition: `opacity 0.4s ease ${600 + i * 40}ms, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${600 + i * 40}ms, fill 0.3s ease`,
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


          </div>
        </div>
      </ScrollAnimateSection>

      {/* SECTION 5: PRIME LOCATION BENEFIT CARDS (8 LANDMARK CONNECTIVITY CARDS) */}
      <ScrollAnimateSection>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h3 style={{ fontSize: '28px', margin: '8px 0', color: '#0f172a', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Prime Location Benefits</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Plot 13, Bahria Lifestyle, Islamabad Expressway — The City's Best at Your Doorstep.</p>
        </div>

        {/* Grid of Prime Location Event-Style Cards */}
        <div ref={locationGridRef} className="prime-location-event-grid">
          {locationBenefits.map((item, idx) => {
            return (
              <ScrollAnimateSection key={idx} delay={idx * 60}>
                <div
                  className="location-event-card-item"
                  style={{
                    '--card-theme-color': item.color,
                    '--card-theme-dark': item.darkColor
                  } as any}
                >
                  {/* Full Bleed Background Image */}
                  <img src={item.image} alt={item.title} className="location-event-bg-img" />

                  {/* Left-to-Right Curtain Drop Overlay Animation on Scroll */}
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
      </ScrollAnimateSection>

      <div style={{ textAlign: 'center', marginTop: '64px' }}>
        <button
          className="hero-btn"
          onClick={() => onNavigate('book-now')}
          style={{
            background: '#152247',
            color: '#ffffff',
            padding: '16px 42px',
            borderRadius: '0px',
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 12px 30px rgba(21, 34, 71, 0.25)',
            transition: 'all 0.3s ease',
            fontFamily: "'Space Grotesk', system-ui, sans-serif"
          }}
        >
          Book Your Unit Today
        </button>
      </div>
    </div>
  );
};
