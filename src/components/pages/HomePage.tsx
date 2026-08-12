import React from 'react';
import { Hero } from '../Hero';
import { BrandedResidencyShowcase } from '../home/BrandedResidencyShowcase';
import { PaymentPlanSection } from '../home/PaymentPlanSection';

interface HomePageProps {
  onNavigate: (tabId: string) => void;
}

const ScrollAnimateSection: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; className?: string }> = ({
  children,
  style = {},
  className = ''
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
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
      { threshold: 0.15 }
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
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.97)',
        filter: isVisible ? 'blur(0)' : 'blur(4px)',
        transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), filter 1s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [progress, setProgress] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
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
      { threshold: 0.2 }
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

  React.useEffect(() => {
    if (!isVisible) return;

    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 60) return prev + 1;
        clearInterval(timer);
        return 60;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [isVisible]);

  const fanCards = [
    {
      id: 1,
      number: '106',
      unitLabel: 'UNITS',
      heading: '106 Total Units',
      badge: 'TOTAL CAPACITY',
      desc: 'Total 106 Units Comprising of Commercials and residential facilities for businesses and families.',
      image: 'https://images.unsplash.com/photo-1696778089330-48995c755358?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      fallbackImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      actionTab: 'serviced-apartments'
    },
    {
      id: 2,
      number: '14',
      unitLabel: 'STOREYS',
      heading: '14 Storeys Elevation',
      badge: 'ELEVATION HEIGHT',
      desc: 'A 14 storey building located directly opposite IMARAT Downtown & Monal Restaurant.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      actionTab: 'why-invest'
    },
    {
      id: 3,
      number: '78',
      unitLabel: 'APARTMENTS',
      heading: '78 Serviced Apartments',
      badge: 'RESIDENTIAL SUITES',
      desc: 'Fully serviced 1 & 2 bedroom hotel apartments with 24/7 concierge and room service.',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      actionTab: 'serviced-apartments'
    },
    {
      id: 4,
      number: '2',
      unitLabel: 'PENTHOUSES',
      heading: '2 Sky Penthouses',
      badge: 'TOP FLOOR LUXURY',
      desc: '360-degree panoramic Margalla views, private sky lounge, Jacuzzi terrace & elevator key.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      actionTab: 'larom-hotel-residencies'
    },
    {
      id: 5,
      number: '7',
      unitLabel: 'RETAIL SHOPS',
      heading: '7 Retail Shops',
      badge: 'COMMERCIAL SHOPS',
      desc: 'Ground-floor luxury commercial retail shops driving premium brand presence.',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
      actionTab: 'book-now'
    },
    {
      id: 6,
      number: '20',
      unitLabel: 'COMMERCIAL KIOSKS',
      heading: '20 Standalone Kiosks',
      badge: 'PROMENADE KIOSKS',
      desc: '20 standalone retail & service kiosks offering coffee bars, boutique goods, and interactive terminals across the ground-floor promenade.',
      image: 'https://images.unsplash.com/photo-1687969962129-dd77e13b95b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2lvc2t8ZW58MHx8MHx8fDA%3D',
      actionTab: 'book-now'
    }
  ];

  const [activeAmenitySlide, setActiveAmenitySlide] = React.useState(0);

  const amenitySlides = [
    {
      id: 1,
      title: 'TechnoGym & Fitness Center',
      centerImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      leftImg: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
      rightImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Rooftop Infinity Pool',
      
      centerImg: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
      leftImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      rightImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Marble Spa & Sauna',
      centerImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      leftImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      rightImg: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveAmenitySlide((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page-container animate-fade-in">
      {/* Hero Banner Component */}
      <ScrollAnimateSection>
        <Hero onNavigate={onNavigate} />
      </ScrollAnimateSection>

      {/* Editorial Branded Residency Section with 5 Characteristics Slideshow & Vector Building Graphics */}
      <ScrollAnimateSection>
        <BrandedResidencyShowcase onNavigate={onNavigate} />
      </ScrollAnimateSection>

      {/* World's Best 33+ Amenities Showcase Section (Stadium Capsule Layout with Slideshow & Ease-In Animation) */}
      <ScrollAnimateSection>
        <section
          ref={amenitiesSectionRef}
          className="stadium-amenities-showcase-section"
          style={{
            background: '#ffffff',
            padding: '100px 48px',
            borderBottom: '1px solid #e2e8f0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '60px', alignItems: 'center' }}>
            {/* Left Column: Headline with Blue Wavy Underline, Single Explore More Button, & 3 Stat Cards */}
            <div>
              <span
                style={{
                  background: 'rgba(2, 132, 199, 0.12)',
                  color: '#0369a1',
                  padding: '5px 16px',
                  borderRadius: '99px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '16px'
                }}
              >
                ⭐ WORLD'S BEST 33+ AMENITIES
              </span>
              <h2
                style={{
                  fontSize: '44px',
                  fontWeight: 900,
                  color: '#0f172a',
                  lineHeight: '1.2',
                  margin: '0 0 18px 0',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif"
                }}
              >
                Discover{' '}
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    color: '#0284c7'
                  }}
                >
                  Amenities
                  <svg
                    style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: 0,
                      width: '100%',
                      height: '8px'
                    }}
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 10 Q 25 20, 50 10 T 100 10"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                Tailored to Your Perfect Lifestyle.
              </h2>
              <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.65', marginBottom: '32px', maxWidth: '540px' }}>
                Experience Pakistan's premier hotel-managed residence featuring 33+ world-class amenities, state-of-the-art TechnoGym fitness center, rooftop infinity pool, 5-star Turkish hospitality, RFID elevator security, and 24/7 concierge.
              </p>

              {/* Action Button */}
              <div style={{ marginBottom: '44px' }}>
                <button
                  className="stadium-explore-btn"
                  onClick={() => onNavigate('amenities')}
                  style={{
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                    color: '#ffffff',
                    padding: '16px 44px',
                    borderRadius: '99px',
                    fontSize: '15px',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 12px 32px rgba(2, 132, 199, 0.35)',
                    transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  Explore Amenities →
                </button>
              </div>

              {/* Bottom 3 Stat Cards Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '540px' }}>
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    33+ <span style={{ fontSize: '14px', color: '#0284c7' }}>→</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>
                    World-Class Amenities
                  </div>
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    100% <span style={{ fontSize: '14px', color: '#0284c7' }}>→</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>
                    Hotel Managed
                  </div>
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    6–7% <span style={{ fontSize: '14px', color: '#0284c7' }}>→</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>
                    Rental Yield
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Trio of Stadium Capsule Cards Slideshow + Clickable Carousel Dots */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '-20px',
                  position: 'relative',
                  width: '100%',
                  padding: '20px 0'
                }}
              >
                {/* Left Stadium Capsule */}
                <div
                  className="stadium-capsule-card left-capsule"
                  style={{
                    width: '160px',
                    height: '350px',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    border: '4px solid #ffffff',
                    boxShadow: '0 20px 50px rgba(2, 132, 199, 0.2)',
                    transform: 'translateX(20px) scale(0.92)',
                    zIndex: 2,
                    transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  <img
                    src={amenitySlides[activeAmenitySlide].leftImg}
                    alt="Amenity Preview Left"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }}
                  />
                </div>

                {/* Center Stadium Capsule (Main Focus with Active Badge) */}
                <div
                  className="stadium-capsule-card center-capsule"
                  style={{
                    width: '210px',
                    height: '430px',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    border: '6px solid #ffffff',
                    boxShadow: '0 30px 70px rgba(2, 132, 199, 0.35)',
                    zIndex: 10,
                    position: 'relative',
                    transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  <img
                    src={amenitySlides[activeAmenitySlide].centerImg}
                    alt={amenitySlides[activeAmenitySlide].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }}
                  />
                
                </div>

                {/* Right Stadium Capsule */}
                <div
                  className="stadium-capsule-card right-capsule"
                  style={{
                    width: '160px',
                    height: '350px',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    border: '4px solid #ffffff',
                    boxShadow: '0 20px 50px rgba(2, 132, 199, 0.2)',
                    transform: 'translateX(-20px) scale(0.92)',
                    zIndex: 2,
                    transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  <img
                    src={amenitySlides[activeAmenitySlide].rightImg}
                    alt="Amenity Preview Right"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }}
                  />
                </div>
              </div>

              {/* Interactive Carousel Pagination Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '24px' }}>
                {amenitySlides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveAmenitySlide(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    style={{
                      width: activeAmenitySlide === dotIdx ? '28px' : '10px',
                      height: '10px',
                      borderRadius: '99px',
                      background: activeAmenitySlide === dotIdx ? '#0284c7' : '#cbd5e1',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: activeAmenitySlide === dotIdx ? '0 0 12px rgba(2, 132, 199, 0.6)' : 'none',
                      transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimateSection>

      {/* Fanning Out Card Cluster Effect Section (Light Theme) */}
      <ScrollAnimateSection>
        <section className="hero-fanning-section" style={{ background: '#f8f9fa', padding: '70px 48px', overflow: 'hidden' }}>
          <div className="hero-fanning-header">
            
            <h2 style={{ fontSize: '36px', marginTop: '12px', color: '#0f172a', fontWeight: 800 }}>
              Key Specifications & Building Highlights
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0' }}>
              Hover over the card deck below to fan out and explore building statistics like a hand of playing cards.
            </p>
          </div>

          <div className="hero-fanning-container">
            {fanCards.map((card) => (
              <div
                key={card.id}
                className="hero-fan-card"
                onClick={() => onNavigate(card.actionTab)}
              >
                <div>
                  <span style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 10px', borderRadius: '99px', fontSize: '10px', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
                    {card.badge}
                  </span>
                  <div className="fan-stat-num">{card.number}</div>
                  <div className="fan-stat-label">{card.unitLabel}</div>
                  <h3 className="fan-card-title">{card.heading}</h3>
                  <p className="fan-card-desc">{card.desc}</p>
                </div>

                <div style={{ width: '100%', height: '100px', borderRadius: '14px', overflow: 'hidden', marginTop: '14px', border: '1px solid #e2e8f0' }}>
                  <img
                    src={card.image}
                    alt={card.heading}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if ('fallbackImage' in card && card.fallbackImage && target.src !== card.fallbackImage) {
                        target.src = card.fallbackImage as string;
                      }
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimateSection>

      {/* Minimal 2D Vector Architectural Progress Motion Graphic Section */}
      <ScrollAnimateSection>
        <section className={`architectural-progress-section ${isVisible ? 'in-view' : ''}`} ref={sectionRef}>
          <div className="arch-progress-container">
            <div className="arch-header"> 
              <h2 className="arch-headline">60% Construction Achieved</h2>
              <p className="arch-subtext">
                14-Storey landmark high-rise structure actively erecting on Islamabad Expressway. On schedule for June 2027 handover.
              </p>
            </div>

            <div className="arch-motion-card">
              <div className="arch-motion-grid">
                {/* Enhanced 2D Vector Animated SVG Building Wireframe & Fill */}
                <div className="arch-svg-wrapper">
                  <svg className="arch-svg-blueprint" viewBox="0 0 280 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Subtle Grid Background */}
                    <g opacity="0.25">
                      {[...Array(9)].map((_, i) => (
                        <line key={`vgrid-${i}`} x1={i * 35} y1="0" x2={i * 35} y2="340" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 3" />
                      ))}
                      {[...Array(11)].map((_, i) => (
                        <line key={`hgrid-${i}`} x1="0" y1={i * 34} x2="280" y2={i * 34} stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 3" />
                      ))}
                    </g>

                    {/* Ground Base Axis Line */}
                    <line x1="20" y1="315" x2="260" y2="315" stroke="#0284c7" strokeWidth="2.5" />
                    <circle cx="20" cy="315" r="4" fill="#0284c7" />
                    <circle cx="260" cy="315" r="4" fill="#0284c7" />

                    {/* Building Outer Frame */}
                    <rect x="55" y="45" width="170" height="270" rx="8" stroke="#0284c7" strokeWidth="2.5" fill="#ffffff" />

                    {/* 14-Storey Floor Dividers & Window Rows */}
                    {[...Array(14)].map((_, i) => {
                      const yPos = 45 + i * 19.2;
                      return (
                        <g key={`floor-${i}`}>
                          <line x1="55" y1={yPos} x2="225" y2={yPos} stroke="rgba(2, 132, 199, 0.3)" strokeWidth="1" />
                          {/* Windows per floor */}
                          <rect x="70" y={yPos + 4} width="22" height="11" rx="2" fill="rgba(2, 132, 199, 0.12)" stroke="rgba(2, 132, 199, 0.3)" strokeWidth="0.8" />
                          <rect x="102" y={yPos + 4} width="22" height="11" rx="2" fill="rgba(2, 132, 199, 0.12)" stroke="rgba(2, 132, 199, 0.3)" strokeWidth="0.8" />
                          <rect x="134" y={yPos + 4} width="22" height="11" rx="2" fill="rgba(2, 132, 199, 0.12)" stroke="rgba(2, 132, 199, 0.3)" strokeWidth="0.8" />
                          <rect x="166" y={yPos + 4} width="22" height="11" rx="2" fill="rgba(2, 132, 199, 0.12)" stroke="rgba(2, 132, 199, 0.3)" strokeWidth="0.8" />
                          <rect x="198" y={yPos + 4} width="16" height="11" rx="2" fill="rgba(2, 132, 199, 0.12)" stroke="rgba(2, 132, 199, 0.3)" strokeWidth="0.8" />
                        </g>
                      );
                    })}

                    {/* 60% Construction Fill Layer (Rises from bottom y:315 up to y:153) */}
                    <rect className="arch-smooth-rise" x="57" y="153" width="166" height="161" fill="url(#blueSoftGradient)" />

                    {/* Animated Construction Laser Scan Line */}
                    <g className="arch-laser-scan">
                      <line x1="30" y1="153" x2="250" y2="153" stroke="#0284c7" strokeWidth="3" strokeDasharray="6 3" />
                      <rect x="110" y="140" width="60" height="24" rx="12" fill="#0284c7" />
                      <text x="140" y="156" fill="#ffffff" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="Space Grotesk">60%</text>
                    </g>

                    {/* Animated Construction Crane Assembly Line at top */}
                    <g className="arch-crane-arm">
                      <line x1="140" y1="45" x2="140" y2="15" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />
                      <line x1="100" y1="15" x2="230" y2="15" stroke="#0284c7" strokeWidth="2.5" />
                      <line x1="200" y1="15" x2="200" y2="70" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="2 2" />
                      <rect x="195" y="70" width="10" height="10" rx="2" fill="#0284c7" />
                    </g>

                    {/* Gradient Definitions */}
                    <defs>
                      <linearGradient id="blueSoftGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Progress Tracker & Metrics */}
                <div className="arch-metrics-box">
                  {/* Building Construction Work In Progress Roller Loading Bar */}
                  <div className="progress-bar-container construction-roller-container">
                    <div className="progress-bar-label">
                      <span className="construction-badge-tag">
                        <span className="hazard-icon">🚧</span> WORK IN PROGRESS
                      </span>
                      <span className="percent-text">
                        <span className="construction-percent-num">{progress}%</span>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>COMPLETED</span>
                      </span>
                    </div>

                    {/* Outer Roller Track Frame */}
                    <div className="roller-track-frame">
                      {/* Dynamic Animated Hazard Fill */}
                      <div className="roller-hazard-fill" style={{ width: `${progress}%` }}>
                        <div className="hazard-stripe-pattern"></div>
                        
                        {/* Paint Roller Tool Icon attached to 60% edge */}
                        <div className="roller-tool-wrapper">
                          <svg className="roller-tool-svg" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Roller Cylinder */}
                            <rect x="5" y="8" width="16" height="32" rx="3" fill="#0284c7" stroke="#0f172a" strokeWidth="2.5" />
                            <line x1="5" y1="16" x2="21" y2="16" stroke="#0f172a" strokeWidth="1.5" />
                            <line x1="5" y1="24" x2="21" y2="24" stroke="#0f172a" strokeWidth="1.5" />
                            <line x1="5" y1="32" x2="21" y2="32" stroke="#0f172a" strokeWidth="1.5" />
                            {/* Metal Frame Arm */}
                            <path d="M13 8V2H32V24H44" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Grip Handle */}
                            <rect x="38" y="20" width="10" height="8" rx="2" fill="#0f172a" />
                          </svg>
                        </div>
                      </div>

                      {/* Unfinished Track Area */}
                      <div className="roller-unfinished-track">
                        <span className="unfinished-label">HANDOVER JUNE 2027</span>
                      </div>

                      {/* 100% Finish Building Marker */}
                      <div className="roller-handover-marker">
                        <div className="marker-pin">🏢</div>
                        <span className="marker-tag">100% DELIVERY</span>
                      </div>
                    </div>

                    {/* Bottom Subtext Typography as shown in reference */}
                    <div className="construction-bottom-caption">
                      <span>STRUCTURE ERECTING ON ISLAMABAD EXPRESSWAY</span>
                      <span className="blue-separator">•</span>
                      <span className="bold-wip">WORK IN PROGRESS</span>
                    </div>
                  </div>

                  <div className="arch-milestone-list">
                    <div className="milestone-item active">
                      <span className="status-dot completed">✓</span>
                      <div>
                        <strong>Basements & Foundation</strong>
                        <p>100% Excavation & Concrete Pours Completed</p>
                      </div>
                    </div>

                    <div className="milestone-item active highlight-milestone">
                      <span className="status-dot in-progress">⏳</span>
                      <div>
                        <strong>Superstructure (14 Storeys)</strong>
                        <p>60% Formwork & Slab Construction Active</p>
                      </div>
                    </div>

                    <div className="milestone-item">
                      <span className="status-dot pending">○</span>
                      <div>
                        <strong>Finishing & Handover</strong>
                        <p>Scheduled Delivery: June 2027</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimateSection>

      {/* Payment Plan Section with Live Animated Pie Chart & Explore Button */}
      <ScrollAnimateSection>
        <PaymentPlanSection onNavigate={onNavigate} />
      </ScrollAnimateSection>
    </div>
  );
};








