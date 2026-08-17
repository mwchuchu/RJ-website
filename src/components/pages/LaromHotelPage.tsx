import React, { useState, useRef, useEffect } from 'react';

interface LaromHotelPageProps {
  onNavigate: (tabId: string) => void;
}

interface SharedLayoutState {
  index: number;
  rect: DOMRect;
}



// Drop Curtain Reveal Image Component for Larom Page (Top-to-Bottom Drop)
const CurtainRevealImage: React.FC<{
  src: string;
  alt: string;
  height: string;
  marginTop?: string;
  delay?: number;
  overlayColor?: string;
  objectPosition?: string;
  style?: React.CSSProperties;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}> = ({
  src,
  alt,
  height,
  marginTop = '0px',
  delay = 0,
  overlayColor = '#ffffff',
  objectPosition = 'center',
  style = {},
  onError
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsRevealed(true);
            }, delay);
          } else {
            setIsRevealed(false);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div style={{ marginTop }}>
      {/* Image Wrapper Container with Drop Curtain Effect */}
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          height: height,
          width: '100%',
          overflow: 'hidden',
          background: '#ffffff',
          ...style
        }}
      >
        {/* Drop Curtain Overlay: Drops from Top to Bottom to reveal image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: overlayColor,
            transform: isRevealed ? 'translateY(100%)' : 'translateY(0%)',
            transition: 'transform 1.4s cubic-bezier(0.77, 0, 0.175, 1)',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        />

        {/* Interior Photograph with subtle zoom reveal */}
        <img
          src={src}
          alt={alt}
          onError={onError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition,
            transform: isRevealed ? 'scale(1)' : 'scale(1.18)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'block'
          }}
        />
      </div>
    </div>
  );
};

export const LaromHotelPage: React.FC<LaromHotelPageProps> = () => {
  const [sharedLayout, setSharedLayout] = useState<SharedLayoutState | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const laromEditorialSectionRef = useRef<HTMLDivElement>(null);
  const [isLaromSectionVisible, setIsLaromSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === laromEditorialSectionRef.current && entry.isIntersecting) {
            setIsLaromSectionVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (laromEditorialSectionRef.current) observer.observe(laromEditorialSectionRef.current);
    return () => observer.disconnect();
  }, []);

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
    <div className="larom-hotel-page animate-fade-in" style={{ padding: '120px 48px 60px 48px', background: '#ffffff' }}>
      {/* EDITORIAL PARTNER SHOWCASE SECTION (EXACT MATCH TO REFERENCE MOCKUP UI) */}
      <div
        ref={laromEditorialSectionRef}
        className="larom-editorial-partner-section"
        style={{
          position: 'relative',
          borderRadius: '0px',
          overflow: 'hidden',
          minHeight: '600px',
          padding: '64px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '60px',
          background: '#12141a',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.35)'
        }}
      >
        {/* Full-Bleed Dark Architectural Canvas Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/images/larom-building image.png'), url('/images/buildingimage.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            filter: 'brightness(0.32) contrast(1.1) blur(2px)',
            transform: 'scale(1.05)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(18, 20, 26, 0.4) 0%, rgba(18, 20, 26, 0.85) 100%)'
          }}
        />

        {/* Outer Content Layout (Relative z-index 5) */}
        <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '1100px', textAlign: 'center' }}>
          {/* Top Category Label */}
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '3px',
              color: 'rgba(255, 255, 255, 0.75)',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}
          >
            OUR PARTNER
          </div>

          {/* Main Editorial Headline */}
          <h2
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '48px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: '0 0 44px 0',
              lineHeight: 1.1
            }}
          >
            LAROM HOTEL & RESIDENCES
          </h2>

          {/* Center Elevated White Card with Curtain Drop Animation */}
          <div
            style={{
              position: 'relative',
              maxWidth: '460px',
              margin: '0 auto',
              borderRadius: '0px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Curtain Drop Overlay Animation on Scroll */}
            <div
              className={`larom-card-curtain-overlay ${isLaromSectionVisible ? 'curtain-drop' : ''}`}
            />

            <div
              style={{
                background: '#ffffff',
                padding: '24px 24px 32px 24px',
                textAlign: 'center'
              }}
            >
              {/* Center Image with Drop Curtain Effect */}
              <div style={{ marginBottom: '24px' }}>
                <CurtainRevealImage
                  src="/images/larom-building image.png"
                  alt="LAROM Hotel & Residences Building"
                  height="260px"
                  overlayColor="#ffffff"
                  objectPosition="top center"
                  onError={(e) => handleImgError(e, ['/images/buildingimage.png'])}
                />
              </div>

              {/* Card Title */}
              <h3
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '17px',
                  fontWeight: 900,
                  color: '#0f172a',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 12px 0'
                }}
              >
                GLOBAL HOSPITALITY BRAND
              </h3>

              {/* Card Description */}
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '13.5px',
                  lineHeight: '1.65',
                  color: '#475569',
                  margin: 0,
                  fontWeight: 400
                }}
              >
                LAROM is a global luxury hospitality & branded residence concept blending 5-star hotel comfort with the privacy of premium residential living. Operating 180+ properties across 6 worldwide regions. It is powered by world-class service and architectural excellence
              </p>
            </div>
          </div>
        </div>

        {/* Left Side Label */}
        <div
          style={{
            position: 'absolute',
            left: '32px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: 'rgba(255, 255, 255, 0.65)',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          hospitality at glance
        </div>

        {/* Right Side Label */}
        <div
          style={{
            position: 'absolute',
            right: '32px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: 'rgba(255, 255, 255, 0.65)',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Scroll to explore ↓
        </div>
      </div>

      {/* STRONG PRESENCE • ANIMATED TYPOGRAPHY WALL & BUILDING CARD (EXACT MATCH TO REFERENCE MOCKUP UI) */}
      <div
        className="larom-strong-presence-section"
        style={{
          background: 'transparent',
          borderRadius: '0px',
          border: 'none',
          padding: '40px 0',
          marginBottom: '30px',
          boxShadow: 'none',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 340px', gap: '32px', alignItems: 'center' }}>
          {/* Left Column: Animated Marquee Typography Wall */}
          <div style={{ position: 'relative', overflow: 'hidden', padding: '16px 0' }}>
            {/* Subtitle / Category Label */}
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '2.5px',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  display: 'block'
                }}
              >
                STRONG PRESENCE
              </span>
            </div>

            {/* Stacked Marquee Text Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Row 1: GLOBAL HOSPITALITY (Animates Left to Right, Dim Pulse 1) */}
              <div style={{ overflow: 'hidden', width: '100%', whiteSpace: 'nowrap' }}>
                <div className="marquee-track scroll-left-dim-1">
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '32px',
                      fontWeight: 900,
                      letterSpacing: '2px',
                      color: '#64748b',
                      textTransform: 'uppercase'
                    }}
                  >
                    A TURKISH HOSPITALITY BRAND &nbsp;&nbsp;•&nbsp;&nbsp; A TURKISH HOSPITALITY BRAND &nbsp;&nbsp;•&nbsp;&nbsp; A TURKISH HOSPITALITY BRAND&nbsp;&nbsp;•&nbsp;&nbsp; A TURKISH HOSPITALITY BRAND &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '32px',
                      fontWeight: 900,
                      letterSpacing: '2px',
                      color: '#64748b',
                      textTransform: 'uppercase'
                    }}
                  >
                    A TURKISH HOSPITALITY BRAND &nbsp;&nbsp;•&nbsp;&nbsp; A TURKISH HOSPITALITY BRAND &nbsp;&nbsp;•&nbsp;&nbsp; A TURKISH HOSPITALITY BRAND&nbsp;&nbsp;•&nbsp;&nbsp; A TURKISH HOSPITALITY BRAND &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                  </span>
                </div>
              </div>

              {/* Row 2: INTERNATIONAL PRESENCE (Animates Right to Left, Dim Pulse 2) */}
              <div style={{ overflow: 'hidden', width: '100%', whiteSpace: 'nowrap' }}>
                <div className="marquee-track scroll-right-dim-2">
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '34px',
                      fontWeight: 900,
                      letterSpacing: '2px',
                      color: '#475569',
                      textTransform: 'uppercase'
                    }}
                  >
                    FIRST TIME IN PAKISTAN &nbsp;&nbsp;•&nbsp;&nbsp; FIRST TIME IN PAKISTAN &nbsp;&nbsp;•&nbsp;&nbsp; FIRST TIME IN PAKISTAN &nbsp;&nbsp;•&nbsp;&nbsp; FIRST TIME IN PAKISTAN &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '34px',
                      fontWeight: 900,
                      letterSpacing: '2px',
                      color: '#475569',
                      textTransform: 'uppercase'
                    }}
                  >
                     FIRST TIME IN PAKISTAN &nbsp;&nbsp;•&nbsp;&nbsp; FIRST TIME IN PAKISTAN &nbsp;&nbsp;•&nbsp;&nbsp; FIRST TIME IN PAKISTAN &nbsp;&nbsp;•&nbsp;&nbsp; FIRST TIME IN PAKISTAN &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                  </span>
                </div>
              </div>

              {/* Row 3: ACROSS THE GLOBE (Main Highlighted Sharp Text Row, Animates Left to Right) */}
              <div style={{ overflow: 'hidden', width: '100%', whiteSpace: 'nowrap' }}>
                <div className="marquee-track scroll-left-highlight">
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '38px',
                      fontWeight: 900,
                      letterSpacing: '1.5px',
                      color: '#0f172a',
                      textTransform: 'uppercase'
                    }}
                  >
                    ACROSS THE GLOBE &nbsp;&nbsp;•&nbsp;&nbsp; ACROSS THE GLOBE &nbsp;&nbsp;•&nbsp;&nbsp; ACROSS THE GLOBE &nbsp;&nbsp;•&nbsp;&nbsp; ACROSS THE GLOBE &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '38px',
                      fontWeight: 900,
                      letterSpacing: '1.5px',
                      color: '#0f172a',
                      textTransform: 'uppercase'
                    }}
                  >
                    ACROSS THE GLOBE &nbsp;&nbsp;•&nbsp;&nbsp; ACROSS THE GLOBE &nbsp;&nbsp;•&nbsp;&nbsp; ACROSS THE GLOBE &nbsp;&nbsp;•&nbsp;&nbsp; ACROSS THE GLOBE &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                  </span>
                </div>
              </div>

              {/* Row 4: GLOBALLY RECOGNIZED (Animates Right to Left, Dim Pulse 3) */}
              <div style={{ overflow: 'hidden', width: '100%', whiteSpace: 'nowrap' }}>
                <div className="marquee-track scroll-right-dim-3">
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '32px',
                      fontWeight: 900,
                      letterSpacing: '2px',
                      color: '#64748b',
                      textTransform: 'uppercase'
                    }}
                  >
                    GLOBALLY RECOGNIZED &nbsp;&nbsp;•&nbsp;&nbsp; GLOBALLY RECOGNIZED &nbsp;&nbsp;•&nbsp;&nbsp; GLOBALLY RECOGNIZED &nbsp;&nbsp;•&nbsp;&nbsp; GLOBALLY RECOGNIZED &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '32px',
                      fontWeight: 900,
                      letterSpacing: '2px',
                      color: '#64748b',
                      textTransform: 'uppercase'
                    }}
                  >
                    GLOBALLY RECOGNIZED &nbsp;&nbsp;•&nbsp;&nbsp; GLOBALLY RECOGNIZED &nbsp;&nbsp;•&nbsp;&nbsp; GLOBALLY RECOGNIZED &nbsp;&nbsp;•&nbsp;&nbsp; GLOBALLY RECOGNIZED &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photo Card Squeezed to Right */}
          <div style={{ width: '100%', maxWidth: '340px', justifySelf: 'end' }}>
            <CurtainRevealImage
              src="/images/larom-building image.png"
              alt="LAROM Building Architecture"
              height="460px"
              overlayColor="#ffffff"
              objectPosition="top center"
              style={{
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                border: 'none'
              }}
              onError={(e) => handleImgError(e, ['/images/buildingimage.png'])}
            />
          </div>
        </div>
      </div>

      {/* GLOBAL REGIONS STAGGERED GALLERY (ASIA, EUROPE, MIDDLE EAST, UNITED STATES - EXACT MATCH TO REFERENCE MOCKUP UI) */}
      <div
        className="larom-global-regions-section"
        style={{
          background: 'transparent',
          borderRadius: '0px',
          padding: '40px 0',
          marginBottom: '60px',
          border: 'none',
          boxShadow: 'none',
          position: 'relative'
        }}
      >
        {/* Editorial Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '3px',
              color: '#64748b',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '10px'
            }}
          >
            GLOBAL PORTFOLIO
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '44px',
              fontWeight: 900,
              color: '#0f172a',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: 0
            }}
          >
            WORLDWIDE REGIONS OF LAROM
          </h2>
        </div>

        {/* 4-Card Staggered Architectural Grid matching Reference Image */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '28px',
            alignItems: 'start'
          }}
        >
          {[
            {
              title: 'ASIA',
              sub: 'Luxury urban retreats & beachfront resorts across 8 countries',
              height: '380px',
              marginTop: '0px',
              image: 'https://images.unsplash.com/photo-1522547902298-51566e4fb383?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXNpYXxlbnwwfHwwfHx8MA%3D%3D'
            },
            {
              title: 'EUROPE',
              sub: 'Heritage boutique suites & Mediterranean branded residences',
              height: '280px',
              marginTop: '0px',
              image: 'https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXVyb3BlfGVufDB8fDB8fHww'
            },
            {
              title: 'MIDDLE EAST',
              sub: 'Flagship high-rise developments & executive penthouses',
              height: '280px',
              marginTop: '60px',
              image: 'https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlkZGxlJTIwZWFzdHxlbnwwfHwwfHx8MA%3D%3D'
            },
            {
              title: 'UNITED STATES',
              sub: 'Metropolitan luxury towers & keyless residential suites',
              height: '380px',
              marginTop: '0px',
              image: 'https://images.unsplash.com/photo-1576606970009-7ddc4229ced7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VVNBfGVufDB8fDB8fHww'
            }
          ].map((item, idx) => (
            <div key={idx} style={{ marginTop: item.marginTop }}>
              {/* Image Box with Top-to-Bottom Curtain Drop Animation on Scroll */}
              <CurtainRevealImage
                src={item.image}
                alt={item.title}
                height={item.height}
                delay={idx * 120}
                overlayColor="#ffffff"
                style={{
                  boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
                  marginBottom: '16px'
                }}
              />

              {/* Card Label & Subtext */}
              <div>
                <h4
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '15px',
                    fontWeight: 900,
                    color: '#0f172a',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: '0 0 6px 0'
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '12.5px',
                    lineHeight: '1.5',
                    color: '#64748b',
                    margin: 0
                  }}
                >
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES & ACCOMMODATIONS STAGGERED GALLERY (GENERAL ROOM, DELUXE ROOM, EXECUTIVE SUITES, PRESIDENTIAL SUITES) */}
      <div
        className="larom-services-accommodations-section"
        style={{
          background: 'transparent',
          borderRadius: '0px',
          padding: '40px 0',
          marginBottom: '60px',
          border: 'none',
          boxShadow: 'none',
          position: 'relative'
        }}
      >
        {/* Editorial Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '3px',
              color: '#64748b',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '10px'
            }}
          >
            SERVICES & ACCOMMODATIONS
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '44px',
              fontWeight: 900,
              color: '#0f172a',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: 0
            }}
          >
            LUXURY SUITES & ROOM CATEGORIES
          </h2>
        </div>

        {/* 4-Card Staggered Architectural Grid matching Reference Image */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '28px',
            alignItems: 'start'
          }}
        >
          {[
            {
              title: 'General Room',
              sub: 'Smart automated climate control, plush bedding, and high-speed fiber Wi-Fi',
              height: '380px',
              marginTop: '0px',
              image: 'https://images.unsplash.com/photo-1723642613875-d71af917a99e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGFwYXJ0bWVudCUyMGJhc2ljfGVufDB8fDB8fHww'
            },
            {
              title: 'Deluxe Room',
              sub: 'Expanded floor plan, designer lounge seating, and complimentary breakfast',
              height: '280px',
              marginTop: '0px',
              image: 'https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsdXhlJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D'
            },
            {
              title: 'Executive Suites',
              sub: 'Separate living & workspace area, 24/7 butler service, and private dining',
              height: '280px',
              marginTop: '60px',
              image: 'https://images.unsplash.com/photo-1754611362309-71297e9f42fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByZW1pdW0lMjByb29tfGVufDB8fDB8fHwy'
            },
            {
              title: 'Presidential Suites',
              sub: 'Top-floor penthouse, private terrace with jacuzzi, and dedicated concierge',
              height: '380px',
              marginTop: '0px',
              image: 'https://images.unsplash.com/photo-1760072513367-55182245e76c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByZW1pdW0lMjByb29tfGVufDB8fDB8fHwy'
            }
          ].map((item, idx) => (
            <div key={idx} style={{ marginTop: item.marginTop }}>
              {/* Image Box with Top-to-Bottom Curtain Drop Animation on Scroll */}
              <CurtainRevealImage
                src={item.image}
                alt={item.title}
                height={item.height}
                delay={idx * 120}
                overlayColor="#ffffff"
                style={{
                  boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
                  marginBottom: '16px'
                }}
              />

              {/* Card Label & Subtext */}
              <div>
                <h4
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '15px',
                    fontWeight: 900,
                    color: '#0f172a',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: '0 0 6px 0'
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '12.5px',
                    lineHeight: '1.5',
                    color: '#64748b',
                    margin: 0
                  }}
                >
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OUR PARTNERSHIP SECTION (SLATE/NAVY CARD WITH ISLAMABAD CLUB CEREMONY PHOTOS & CURTAIN ANIMATION) */}
      <div
        className="larom-signing-ceremony-section"
        style={{
          position: 'relative',
          borderRadius: '0px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 41, 59, 0.96) 100%), url("/images/agreementsigining1.jpg") center/cover no-repeat',
          padding: '72px 56px',
          marginBottom: '96px',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.35)',
          color: '#ffffff'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 34%) 1fr',
            gap: '56px',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Heading & Paragraph */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                  display: 'block',
                  marginBottom: '16px'
                }}
              >
                MILESTONE PARTNERSHIP
              </span>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                  fontSize: '52px',
                  fontWeight: 500,
                  lineHeight: '1.05',
                  color: '#ffffff',
                  margin: '0 0 24px 0',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
              >
                OUR<br />
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 400, textTransform: 'capitalize', fontSize: '56px' }}>
                  Partnership
                </span>
              </h2>

              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '14.5px',
                  lineHeight: '1.75',
                  color: '#cbd5e1',
                  marginBottom: '36px',
                  maxWidth: '380px'
                }}
              >
                RJ Developers and Continent Worldwide Hotels celebrated the official signing of LAROM Hotel & Residences at the prestigious Islamabad Club ceremony.
              </p>

              <a
                href="https://laromhotelresidences.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#ffffff',
                  border: 'none',
                  color: '#0f172a',
                  padding: '14px 32px',
                  borderRadius: '0px',
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  textDecoration: 'none'
                }}
              >
                VISIT LAROM WEBSITE <span style={{ fontSize: '15px' }}>→</span>
              </a>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Ceremony Cards */}
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px'
              }}
            >
              {[
                {
                  title: 'Signing Ceremony',
                  image: '/images/agreementsigining1.jpg',
                  alt: 'Islamabad Club Agreement Signing Ceremony'
                },
                {
                  title: 'Document Exchange',
                  image: '/images/agreementsigining2.jpg',
                  alt: 'Official Franchise & Management Agreement Exchange'
                },
                {
                  title: 'VIP Assembly',
                  image: '/images/agreementsigining3.jpg',
                  alt: 'Executive Board Members & Leadership Assembly'
                },
                {
                  title: 'Closing Ceremony',
                  image: '/images/agreementsigining4.jpg',
                  alt: 'Islamabad Club Closing Ceremony & Celebration'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  onClick={() => handleOpenSharedLayout(index)}
                  style={{
                    background: '#ffffff',
                    borderRadius: '0px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '320px',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
                    border: '1px solid #f1f5f9',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                >
                  <CurtainRevealImage
                    src={item.image}
                    alt={item.alt}
                    height="220px"
                    delay={index * 120}
                    overlayColor="#ffffff"
                  />
                  <div style={{ marginTop: '14px' }}>
                    <h4
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '13px',
                        fontWeight: 800,
                        color: '#152247',
                        letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                        margin: 0
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Right Subtitle */}
            <div style={{ textAlign: 'right', marginTop: '24px' }}>
              <p
                style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  margin: 0,
                  fontStyle: 'italic',
                  fontFamily: "'Cormorant Garamond', Georgia, serif"
                }}
              >
                Islamabad Club Official Partnership Ceremony • Continent Hotels & Resorts
              </p>
            </div>
          </div>
        </div>
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
