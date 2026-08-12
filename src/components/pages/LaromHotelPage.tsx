import React, { useState, useRef, useEffect } from 'react';

interface LaromHotelPageProps {
  onNavigate: (tabId: string) => void;
}

interface SharedLayoutState {
  index: number;
  rect: DOMRect;
}

// Animated counter component for numerical values
const AnimatedCounter: React.FC<{ target: number; suffix?: string; prefix?: string; duration?: number }> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 2000
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutProgress * target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const LaromHotelPage: React.FC<LaromHotelPageProps> = ({ onNavigate }) => {
  const [sharedLayout, setSharedLayout] = useState<SharedLayoutState | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All Moments');

  // Agreement Signing Photos with categories for filter pill bar
  const signingPhotos = [
    {
      id: 1,
      category: 'Signing Ceremony',
      src: '/images/agreementsigining1.jpg',
      altSources: ['/images/agreementsigining1.png', '/images/agreementsigining1.jpeg', 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80'],
      caption: 'Franchise Signing Ceremony at Islamabad Club',
      subText: 'Khurram Hussain (Executive Director, LAROM) & Jawad Arif (Owner, RJ Developers)'
    },
    {
      id: 2,
      category: 'Document Exchange',
      src: '/images/agreementsigining2.jpg',
      altSources: ['/images/agreementsigining2.png', '/images/agreementsigining2.jpeg', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'],
      caption: 'Official Document Exchange & Partnership Handshake',
      subText: 'Formalizing Continent Worldwide Franchise Agreement for Islamabad Expressway'
    },
    {
      id: 3,
      category: 'VIP Assembly',
      src: '/images/agreementsigining3.jpg',
      altSources: ['/images/agreementsigining3.png', '/images/agreementsigining3.jpeg', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'],
      caption: 'Distinguished Guests & Real Estate Leadership Assembly',
      subText: 'Islamabad Club Gala Event with Business Leaders & Stakeholders'
    },
    {
      id: 4,
      category: 'Architectural Model',
      src: '/images/agreementsigining4.jpg',
      altSources: ['/images/agreementsigining4.png', '/images/agreementsigining4.jpeg', 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'],
      caption: 'Unveiling LAROM Hotel & Residences Architectural Model',
      subText: 'Introducing European & Turkish Hospitality Standards to Pakistan'
    },
    {
      id: 5,
      category: 'VIP Assembly',
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      altSources: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'],
      caption: 'Islamabad Club Gala Dinner & Executive Banquet',
      subText: 'Celebrating foreign investment and hospitality excellence in Pakistan'
    }
  ];

  const categories = ['All Moments', 'Signing Ceremony', 'Document Exchange', 'VIP Assembly', 'Architectural Model'];

  const filteredPhotos = activeFilter === 'All Moments'
    ? signingPhotos
    : signingPhotos.filter((p) => p.category === activeFilter);

  const safeIndex = activeGalleryIndex % filteredPhotos.length;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>, altSources: string[]) => {
    const target = e.currentTarget;
    const currentSrc = target.src;
    for (const alt of altSources) {
      if (!currentSrc.includes(alt)) {
        target.src = alt;
        return;
      }
    }
  };

  const handleOpenSharedLayout = (index: number) => {
    const cardEl = cardRefs.current[index];
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    setSharedLayout({ index, rect });
    setIsExpanding(false);
    setIsClosing(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsExpanding(true);
      });
    });
  };

  const handleCloseSharedLayout = () => {
    if (!sharedLayout) return;
    const cardEl = cardRefs.current[sharedLayout.index];
    if (cardEl) {
      setSharedLayout({ ...sharedLayout, rect: cardEl.getBoundingClientRect() });
    }
    setIsClosing(true);
    setIsExpanding(false);

    setTimeout(() => {
      setSharedLayout(null);
      setIsClosing(false);
    }, 450);
  };

  const selectedPhoto = sharedLayout ? signingPhotos[sharedLayout.index] : null;

  return (
    <div className="larom-hotel-page animate-fade-in" style={{ padding: '120px 48px 60px 48px', background: '#f8f9fa' }}>
      {/* TEMPLATE MATCHING SECTION: FIND PERFECT SPACE - BUILT FOR LIFESTYLE (EXACT MATCH TO TEMPLATE IMAGE) */}
      <div
        className="larom-partner-template-section"
        style={{
          background: '#ffffff',
          borderRadius: '32px',
          padding: '56px 48px',
          boxShadow: '0 24px 70px rgba(15, 23, 42, 0.07)',
          border: '1px solid #e5e7eb',
          marginBottom: '60px'
        }}
      >
        {/* Top Header Row matching Template Image */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '28px', marginBottom: '40px' }}>
          <div style={{ maxWidth: '800px' }}>
            <h2
              style={{
                fontSize: '48px',
                fontWeight: 900,
                color: '#0a0a0a',
                lineHeight: 1.12,
                margin: 0,
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                letterSpacing: '-1px'
              }}
            >
              FIND PERFECT SPACE{' '}
              <button
                onClick={() => window.open('https://laromhotelresidences.com/', '_blank')}
                style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '99px',
                  padding: '8px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  verticalAlign: 'middle',
                  margin: '0 10px',
                  boxShadow: '0 8px 20px rgba(2, 132, 199, 0.25)',
                  transition: 'all 0.3s ease'
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    color: '#0284c7',
                    fontSize: '11px',
                    fontWeight: 900
                  }}
                >
                  ↗
                </span>
                Explore Partner
              </button>{' '}
              — BUILT FOR LIFESTYLE
            </h2>
          </div>
          <div style={{ maxWidth: '320px' }}>
            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
              Explore beautifully crafted 5-star hotel suites, branded residences, and serviced apartments designed for modern living.
            </p>
          </div>
        </div>

        {/* Main Feature Container: Single Rectangle Boundary matching Template Image */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 20px 45px rgba(15, 23, 42, 0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            marginBottom: '52px'
          }}
        >
          {/* Left: Single Image of LAROM Hotel */}
          <div
            style={{
              position: 'relative',
              minHeight: '380px',
              overflow: 'hidden'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
              onError={(e) => handleImgError(e, ['/images/buildingimage.png', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'])}
              alt="LAROM Sophisticated Urban Architecture"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Bottom Counter Pill in Blue Shade */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                background: '#0284c7',
                color: '#ffffff',
                padding: '8px 20px',
                borderRadius: '99px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)'
              }}
            >
              <span style={{ cursor: 'pointer' }}>←</span>
              <span>01 / 05</span>
              <span style={{ cursor: 'pointer' }}>→</span>
            </div>
          </div>

          {/* Right: Informational Content without internal border */}
          <div
            style={{
              padding: '44px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#ffffff'
            }}
          >
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>
                • ABOUT PROJECT
              </span>
              <h3 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: '0 0 16px 0', lineHeight: 1.2, fontFamily: "'Space Grotesk', system-ui" }}>
                Sophisticated Urban Living
              </h3>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, margin: '0 0 28px 0', fontWeight: 400 }}>
                LAROM is a global luxury hospitality & branded residence concept blending 5-star hotel comfort with the privacy of premium residential living. Operating 180+ properties across 6 worldwide regions.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '13.5px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <span style={{ color: '#0284c7' }}>📍</span> Islamabad Expressway, Islamabad
              </div>
              <a
                href="https://laromhotelresidences.com/wp-content/uploads/2026/02/Larom-FRANCHISING-BUSINESS.pdf"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#0284c7',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Request Quote ↗
              </a>
            </div>
          </div>
        </div>

        {/* 3 Animated Stat Counters Row matching Template Image */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
            textAlign: 'center',
            padding: '36px 0',
            borderTop: '1px solid #e2e8f0',
            borderBottom: '1px solid #e2e8f0',
            marginBottom: '48px'
          }}
        >
          <div>
            <div style={{ fontSize: '54px', fontWeight: 900, color: '#0284c7', fontFamily: "'Space Grotesk', system-ui", lineHeight: 1 }}>
              <AnimatedCounter target={180} suffix="+" />
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '8px' }}>
              Properties & Developments
            </div>
          </div>

          <div>
            <div style={{ fontSize: '54px', fontWeight: 900, color: '#0284c7', fontFamily: "'Space Grotesk', system-ui", lineHeight: 1 }}>
              <AnimatedCounter target={250} suffix="M+" />
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '8px' }}>
              Total Portfolio Value
            </div>
          </div>

          <div>
            <div style={{ fontSize: '54px', fontWeight: 900, color: '#0284c7', fontFamily: "'Space Grotesk', system-ui", lineHeight: 1 }}>
              <AnimatedCounter target={20} suffix="Y+" />
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '8px' }}>
              Global Experience
            </div>
          </div>
        </div>

        {/* Lower Container: Our Properties (Soft Beige/Tan Canvas matching Template Image) */}
        <div
          style={{
            background: '#f4f3ef',
            borderRadius: '24px',
            padding: '40px 36px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <h3 style={{ fontSize: '30px', fontWeight: 900, color: '#0a0a0a', margin: 0, fontFamily: "'Space Grotesk', system-ui" }}>
              Our Properties
            </h3>
            <a
              href="https://laromhotelresidences.com/hotel/"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '13px', fontWeight: 700, color: '#4b5563', textDecoration: 'none' }}
            >
              View All Properties ↗
            </a>
          </div>

          {/* 2 Split Property Showcase Cards matching Template Image */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {[
              {
                title: '5-Star Hotel Suites & Serviced Living',
                location: 'Islamabad Expressway • Continent Worldwide',
                desc: 'Curated 5-star dining, 24/7 concierge, housekeeping, and executive room service.',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
              },
              {
                title: 'Branded Residences & Penthouses',
                location: 'Islamabad Expressway • Turnkey Decor',
                desc: 'Turnkey fully furnished apartments with keyless RFID access and private hotel amenities.',
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1.5px solid #e5e7eb',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {item.location}
                  </span>
                  <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0a0a0a', margin: '6px 0 8px 0' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#4b5563', lineHeight: 1.55, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
   
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="section-header-centered" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(2, 132, 199, 0.12)', border: '1px solid rgba(2, 132, 199, 0.3)', padding: '6px 16px', borderRadius: '99px', marginBottom: '16px' }}>
          <span style={{ fontSize: '16px' }}>🇹🇷</span>
          <span style={{ color: '#0369a1', fontSize: '12px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
            TURKISH HOSPITALITY BRAND • CONTINENT WORLDWIDE GROUP 🇵🇰
          </span>
        </div>

        <h2 className="section-main-title" style={{ fontSize: '38px', marginTop: '8px', color: '#0f172a', fontWeight: 900, lineHeight: 1.2 }}>
          LAROM Hotel & Residences by Continent
        </h2>
        <p className="section-description" style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.7', marginTop: '12px' }}>
          Turkey’s premier hospitality brand LAROM has officially entered the Pakistani market through a landmark franchise agreement awarded to <strong>RJ Developers</strong> for their flagship multi-tower development on Islamabad Expressway.
        </p>
      </div>

      {/* Franchise Ceremony Executive Banner */}
      <div className="executive-ceremony-banner" style={{ background: 'linear-gradient(135deg, #0b0f19 0%, #1a2234 100%)', color: '#ffffff', borderRadius: '28px', padding: '40px', border: '1px solid rgba(2, 132, 199, 0.4)', boxShadow: '0 20px 50px rgba(11, 15, 25, 0.3)', marginBottom: '56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(2, 132, 199, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px', alignItems: 'center' }}>
          <div>
            <span style={{ background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1px' }}>
              🤝 LANDMARK FRANCHISE AGREEMENT
            </span>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: '14px 0', lineHeight: 1.3, color: '#ffffff', fontFamily: 'Space Grotesk, system-ui' }}>
              Franchise Award Ceremony Held at Islamabad Club
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '14.5px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
              In a grand ceremony attended by distinguished guests, business leaders, and real estate stakeholders, the agreement was officially executed between <strong>Khurram Hussain</strong> (Executive Director, LAROM & Continent Worldwide) and <strong>Jawad Arif</strong> (Developer & Owner of RJ Developers).
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 18px', borderRadius: '14px' }}>
                <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700, display: 'block' }}>BRAND EXECUTIVE DIRECTOR</span>
                <strong style={{ fontSize: '14px', color: '#ffffff' }}>Khurram Hussain</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 18px', borderRadius: '14px' }}>
                <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700, display: 'block' }}>PROJECT OWNER & DEVELOPER</span>
                <strong style={{ fontSize: '14px', color: '#ffffff' }}>Jawad Arif</strong>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(2, 132, 199, 0.4)', boxShadow: '0 15px 40px rgba(0,0,0,0.5)' }}>
            <img
              src="/images/agreementsigining1.jpg"
              alt="Franchise Signing Ceremony Islamabad Club"
              onError={(e) => handleImgError(e, signingPhotos[0].altSources)}
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 0, inset: 'auto 0 0 0', background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)', padding: '16px 20px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8' }}>📍 ISLAMABAD CLUB CEREMONY</span>
              <p style={{ fontSize: '12px', color: '#ffffff', margin: '2px 0 0 0' }}>Signing between Khurram Hussain & Jawad Arif</p>
            </div>
          </div>
        </div>
      </div>

      {/* AGREEMENT SIGNING PHOTO GALLERY SECTION DESIGNED MATCHING THE TEMPLATE IMAGE */}
      <div
        className="signing-gallery-section"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f4f8fc 100%)',
          borderRadius: '32px',
          border: '1.5px solid rgba(2, 132, 199, 0.2)',
          boxShadow: '0 30px 80px rgba(15, 23, 42, 0.08)',
          padding: '56px 40px 60px 40px',
          marginBottom: '64px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Centered Gallery Header matching Template */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '2px',
              color: '#64748b',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px'
            }}
          >
            GALLERY
          </span>
          <h3
            style={{
              fontSize: '36px',
              color: '#0f172a',
              fontWeight: 900,
              margin: '0 0 10px 0',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}
          >
            Agreement Signing Ceremony Photo Gallery
          </h3>
          <p style={{ color: '#64748b', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>
            See history through our lens — capturing the landmark franchise partnership between Continent Worldwide & RJ Developers.
          </p>
        </div>

        {/* Filter Pill Bar matching Template */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setActiveGalleryIndex(0);
                }}
                style={{
                  background: isActive ? '#0f172a' : '#ffffff',
                  color: isActive ? '#ffffff' : '#475569',
                  border: isActive ? '1px solid #0f172a' : '1px solid #cbd5e1',
                  borderRadius: '99px',
                  padding: '8px 20px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 8px 20px rgba(15, 23, 42, 0.25)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3D Overlapping Coverflow Carousel Display matching Template */}
        <div
          style={{
            position: 'relative',
            height: '460px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px',
            marginBottom: '36px'
          }}
        >
          {filteredPhotos.map((photo, index) => {
            const offset = index - safeIndex;
            
            const isCenter = offset === 0;

            // Calculate 3D Overlapping Coverflow Layout transforms
            let transform = 'translateX(0) scale(1) translateZ(0)';
            let zIndex = 1;
            let opacity = 0;
            let filterBlur = 'none';

            if (isCenter) {
              transform = 'translateX(0) scale(1.15) translateZ(60px)';
              zIndex = 10;
              opacity = 1;
            } else if (offset === -1) {
              transform = 'translateX(-220px) scale(0.88) rotateY(18deg) translateZ(-40px)';
              zIndex = 5;
              opacity = 0.85;
              filterBlur = 'blur(1px)';
            } else if (offset === 1) {
              transform = 'translateX(220px) scale(0.88) rotateY(-18deg) translateZ(-40px)';
              zIndex = 5;
              opacity = 0.85;
              filterBlur = 'blur(1px)';
            } else if (offset <= -2) {
              transform = 'translateX(-380px) scale(0.7) rotateY(32deg) translateZ(-120px)';
              zIndex = 2;
              opacity = 0.45;
              filterBlur = 'blur(2.5px)';
            } else if (offset >= 2) {
              transform = 'translateX(380px) scale(0.7) rotateY(-32deg) translateZ(-120px)';
              zIndex = 2;
              opacity = 0.45;
              filterBlur = 'blur(2.5px)';
            }

            return (
              <div
                key={photo.id || index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => {
                  if (!isCenter) {
                    setActiveGalleryIndex(index);
                  } else {
                    handleOpenSharedLayout(index);
                  }
                }}
                style={{
                  position: 'absolute',
                  width: '320px',
                  height: '380px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: '#ffffff',
                  boxShadow: isCenter
                    ? '0 30px 70px rgba(15, 23, 42, 0.35)'
                    : '0 15px 35px rgba(15, 23, 42, 0.12)',
                  border: isCenter ? '2px solid rgba(2, 132, 199, 0.5)' : '1px solid rgba(203, 213, 225, 0.6)',
                  cursor: 'pointer',
                  transform,
                  zIndex,
                  opacity,
                  filter: filterBlur,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Photo Image */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    onError={(e) => handleImgError(e, photo.altSources)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease'
                    }}
                  />

                  {/* Dark Vignette Overlay for Title Text */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: '#38bdf8',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '4px'
                      }}
                    >
                      {photo.category}
                    </span>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                      {photo.caption}
                    </h4>
                    <p style={{ fontSize: '11.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.4, opacity: 0.9 }}>
                      {photo.subText}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Circular Arrow Navigation Controls matching Template */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}
        >
          <button
            onClick={() => setActiveGalleryIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: '1.5px solid #cbd5e1',
              background: '#ffffff',
              color: '#0f172a',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.25s ease'
            }}
            title="Previous Photo"
          >
            ←
          </button>

          <button
            onClick={() => setActiveGalleryIndex((prev) => (prev + 1) % filteredPhotos.length)}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: '1.5px solid #cbd5e1',
              background: '#ffffff',
              color: '#0f172a',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.25s ease'
            }}
            title="Next Photo"
          >
            →
          </button>
        </div>
      </div>

      {/* CONTINENT WORLDWIDE & TURKISH HOSPITALITY BRAND PROFILE */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 14px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1px' }}>
            🏢 BRAND PROFILE & LEGACY
          </span>
          <h3 style={{ fontSize: '28px', color: '#0f172a', fontWeight: 800, marginTop: '8px' }}>
            Continent Worldwide Hospitality Group
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          <div className="profile-feature-card floating-card-hover" style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 12px 35px rgba(0,0,0,0.06)' }}>
            <span style={{ fontSize: '36px', display: 'inline-block', marginBottom: '12px' }}>🇹🇷</span>
            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Turkish Excellence</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              Recognized internationally for excellence in European and Middle Eastern hospitality, bringing global standards of service, architecture, and luxury living to Pakistan.
            </p>
          </div>

          <div className="profile-feature-card floating-card-hover" style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 12px 35px rgba(0,0,0,0.06)' }}>
            <span style={{ fontSize: '36px', display: 'inline-block', marginBottom: '12px' }}>🏨</span>
            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Branded Residences</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              Introduces hotel-standard housekeeping, 24/7 concierge, room service, and hands-off property management for all 78 serviced apartments and 2 sky penthouses.
            </p>
          </div>

          <div className="profile-feature-card floating-card-hover" style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 12px 35px rgba(0,0,0,0.06)' }}>
            <span style={{ fontSize: '36px', display: 'inline-block', marginBottom: '12px' }}>📈</span>
            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Investor Confidence</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              Strategic location opposite IMARAT Downtown and Monal Restaurant on main Islamabad Expressway, driving 6–7% rental yields for overseas Pakistani investors.
            </p>
          </div>
        </div>
      </div>

      {/* INFORMATIONAL DISCLAIMER SECTION */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px 32px', marginBottom: '40px' }}>
        <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' }}>
          ℹ️ OFFICIAL PRESS DISCLAIMER
        </h5>
        <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
          This information is based on publicly reported franchise announcements between Continent Worldwide Hospitality Group and RJ Developers. Property specifications, amenities, and handover dates remain governed by official buyer-seller contracts registered under CDA and Bahria Town guidelines.
        </p>
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          className="hero-btn"
          onClick={() => onNavigate('serviced-apartments')}
          style={{ background: '#0f172a', color: '#ffffff', padding: '14px 36px', borderRadius: '99px', fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(15,23,42,0.2)' }}
        >
          Explore Serviced Apartments & Floorplans →
        </button>
      </div>

      {/* SHARED LAYOUT MORPHING TRANSITION CONTAINER (FLIP ANIMATION) */}
      {sharedLayout && selectedPhoto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: isExpanding && !isClosing ? 'rgba(11, 15, 25, 0.88)' : 'rgba(11, 15, 25, 0)',
            backdropFilter: isExpanding && !isClosing ? 'blur(12px)' : 'blur(0px)',
            transition: 'background 0.45s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handleCloseSharedLayout}
        >
          {/* Morphing Shared Layout Card Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: isExpanding && !isClosing ? '50%' : `${sharedLayout.rect.top}px`,
              left: isExpanding && !isClosing ? '50%' : `${sharedLayout.rect.left}px`,
              width: isExpanding && !isClosing ? 'min(90vw, 860px)' : `${sharedLayout.rect.width}px`,
              height: isExpanding && !isClosing ? 'min(80vh, 580px)' : `${sharedLayout.rect.height}px`,
              transform: isExpanding && !isClosing ? 'translate(-50%, -50%)' : 'translate(0, 0)',
              borderRadius: isExpanding && !isClosing ? '24px' : '20px',
              overflow: 'hidden',
              background: '#0b0f19',
              border: '2px solid #0284c7',
              boxShadow: isExpanding && !isClosing ? '0 25px 60px rgba(0, 0, 0, 0.6)' : '0 10px 30px rgba(0,0,0,0.06)',
              transition: 'all 0.48s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                onError={(e) => handleImgError(e, selectedPhoto.altSources)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={handleCloseSharedLayout}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(2, 132, 199, 0.4)',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '16px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '20px 24px', background: '#0f172a', color: '#ffffff', borderTop: '1px solid rgba(2, 132, 199, 0.3)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                🤝 SHARED LAYOUT MORPH • ISLAMABAD CLUB CEREMONY
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '4px 0', color: '#ffffff' }}>{selectedPhoto.caption}</h3>
              <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0 }}>{selectedPhoto.subText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
