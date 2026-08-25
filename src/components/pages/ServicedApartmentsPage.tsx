import React, { useState, useEffect, useRef } from 'react';
import type { Property } from '../../types/index';
import { ONE_BEDROOM_FALLBACK, TWO_BEDROOM_FALLBACK } from '../../data/floorplanAssets';

interface ServicedApartmentsPageProps {
  onSelectProperty?: (property: Property) => void;
  onNavigate: (tabId: string) => void;
}

// ─── Inject scoped keyframes & utility styles ───
const ScopedStyles: React.FC = () => (
  <style>{`
    @keyframes saGradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes saFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @keyframes saPulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    @keyframes saSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes saShimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes saRevealLine {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    .sa-card-hover:hover {
      transform: translateY(-6px) !important;
      box-shadow: 0 28px 60px rgba(21, 34, 71, 0.22) !important;
    }
    .sa-card-hover:hover img {
      transform: scale(1.06) !important;
    }
    .sa-btn-glow:hover {
      box-shadow: 0 0 0 2px rgba(21,34,71,0.15), 0 14px 35px rgba(21,34,71,0.25) !important;
      transform: translateY(-2px) !important;
    }
    .sa-img-zoom:hover img {
      transform: scale(1.05) !important;
    }
    .sa-curtain-card:hover .sa-curtain-overlay-caption {
      opacity: 1 !important;
    }
  `}</style>
);

// ─── Scroll-triggered fade/slide component ───
const ScrollEaseIn: React.FC<{
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up';
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}> = ({ children, direction = 'up', delay = 0, style = {}, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  let initialTransform = 'translateY(40px)';
  if (direction === 'left') initialTransform = 'translateX(-50px)';
  if (direction === 'right') initialTransform = 'translateX(50px)';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : initialTransform,
        transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

// ─── Parallax Hero Banner ───
const HeroBanner: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        height: '520px',
        overflow: 'hidden',
        marginBottom: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Parallax BG image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.25}px) scale(1.1)`,
          transition: 'transform 0.1s linear',
          filter: 'brightness(0.35)'
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(21,34,71,0.7) 0%, rgba(21,34,71,0.3) 50%, rgba(21,34,71,0.85) 100%)'
        }}
      />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '20px',
            animation: 'saSlideUp 1s ease-out 0.2s both'
          }}
        >
          RJ'S LAROM RESIDENCES
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(32px, 5vw, 58px)',
            fontWeight: 900,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            lineHeight: 1.1,
            margin: '0 0 24px 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 40%, #ffffff 60%, #94a3b8 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'saShimmer 6s ease-in-out infinite, saSlideUp 1s ease-out 0.4s both'
          }}
        >
          FULLY FURNISHED<br />SERVICED APARTMENTS
        </h1>
        {/* Decorative line */}
        <div
          style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
            margin: '0 auto 20px',
            animation: 'saRevealLine 1.2s ease-out 0.8s both',
            transformOrigin: 'center'
          }}
        />
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '18px',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.65)',
            fontWeight: 400,
            margin: 0,
            animation: 'saSlideUp 1s ease-out 0.6s both'
          }}
        >
          Where architecture meets the art of living
        </p>
      </div>
    </div>
  );
};

// ─── Image Carousel with dot indicators ───
const MovingImageTray: React.FC = () => {
  const trayImages = [
    {
      url: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&fit=crop&w=1200&q=80',
      title: 'Luxury Serviced Suite Lounge'
    },
    {
      url: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGludGVyaW9yfGVufDB8fDB8fHww?auto=format&fit=crop&w=1200&q=80',
      title: 'Warm Minimal Timber Interior'
    },
    {
      url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      title: 'Bespoke Master Bedroom Suite'
    },
    {
      url: 'https://images.unsplash.com/photo-1616486886892-ff366aa67ba4?auto=format&fit=crop&w=1200&q=80',
      title: 'Artisanal Dining & Stone Details'
    },
    {
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      title: 'Calacatta Marble Bath Sanctuary'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trayImages.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [trayImages.length, isPaused]);

  const leftIndex = (activeIndex - 1 + trayImages.length) % trayImages.length;
  const rightIndex = (activeIndex + 1) % trayImages.length;

  return (
    <div
      style={{ marginBottom: '80px', position: 'relative' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {/* Left preview */}
        <div
          className="sa-img-zoom"
          style={{
            flex: '0 0 24%',
            height: '340px',
            overflow: 'hidden',
            opacity: 0.5,
            transform: 'scale(0.88)',
            transition: 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
          }}
          onClick={() => setActiveIndex(leftIndex)}
        >
          <img
            src={trayImages[leftIndex].url}
            alt={trayImages[leftIndex].title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          />
        </div>

        {/* Center main */}
        <div
          style={{
            flex: '0 0 50%',
            height: '440px',
            overflow: 'hidden',
            transform: 'scale(1.04)',
            transition: 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
            boxShadow: '0 30px 70px rgba(21, 34, 71, 0.25)',
            zIndex: 10,
            position: 'relative'
          }}
        >
          <img
            key={activeIndex}
            src={trayImages[activeIndex].url}
            alt={trayImages[activeIndex].title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.7s ease'
            }}
          />
          {/* Bottom gradient overlay on active */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(transparent, rgba(21,34,71,0.5))',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Right preview */}
        <div
          className="sa-img-zoom"
          style={{
            flex: '0 0 24%',
            height: '340px',
            overflow: 'hidden',
            opacity: 0.5,
            transform: 'scale(0.88)',
            transition: 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
          }}
          onClick={() => setActiveIndex(rightIndex)}
        >
          <img
            src={trayImages[rightIndex].url}
            alt={trayImages[rightIndex].title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          />
        </div>
      </div>

      {/* Caption + Dot indicators */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <p
          style={{
            fontSize: '0.82rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#8A99AD',
            fontWeight: 500,
            margin: '0 0 16px 0'
          }}
        >
          {trayImages[activeIndex].title}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {trayImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === activeIndex ? '28px' : '8px',
                height: '8px',
                background: idx === activeIndex ? '#152247' : 'rgba(21,34,71,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                padding: 0
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Drop Curtain Reveal Image with hover overlay ───
const CurtainRevealImage: React.FC<{
  src: string;
  alt: string;
  caption: string;
  height: string;
  marginTop?: string;
  delay?: number;
}> = ({ src, alt, caption, height, marginTop = '0px', delay = 0 }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsRevealed(true), delay);
          } else {
            setIsRevealed(false);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div style={{ marginTop }} className="sa-curtain-card">
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          height,
          width: '100%',
          overflow: 'hidden',
          background: '#f1f5f9'
        }}
      >
        {/* Curtain overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#ffffff',
            transform: isRevealed ? 'translateY(100%)' : 'translateY(0%)',
            transition: 'transform 1.4s cubic-bezier(0.77, 0, 0.175, 1)',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        />
        {/* Image */}
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isRevealed ? 'scale(1)' : 'scale(1.18)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'block'
          }}
        />
        {/* Hover caption overlay */}
        <div
          className="sa-curtain-overlay-caption"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '32px 16px 16px',
            background: 'linear-gradient(transparent, rgba(21,34,71,0.75))',
            opacity: 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none'
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}
          >
            {caption}
          </span>
        </div>
      </div>
      {/* Caption below */}
      <div style={{ marginTop: '12px' }}>
        <h4
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: '12px',
            fontWeight: 700,
            color: '#152247',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 1.4
          }}
        >
          {caption}
        </h4>
      </div>
    </div>
  );
};

// ─── "What We Offer" Section — Modern Interactive Tabbed Showcase ───
const WhatWeOfferSection: React.FC<{ onNavigate: (tabId: string) => void }> = ({ onNavigate }) => {
  const residences = [
    {
      id: 'one-bed',
      label: '01',
      title: 'One Bedroom',
      subtitle: 'Serviced Suite',
      image: 'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?auto=format&fit=crop&w=1200&q=80',
      layout: ONE_BEDROOM_FALLBACK,
      alt: 'Luxury 1-Bedroom Serviced Suite Interior',
      layoutAlt: '1-Bedroom Apartment Floor Plan Layout',
      description: 'An intimate sanctuary of 650 sq. ft. designed for the discerning individual — featuring a bespoke master bedroom, open-plan living, and artisanal kitchen island.',
      features: ['King Master Suite', 'Open-Plan Living', 'Designer Kitchen', 'Marble Bathroom']
    },
    {
      id: 'two-bed',
      label: '02',
      title: 'Two Bedroom',
      subtitle: 'Executive Residence',
      image: 'https://images.unsplash.com/photo-1720582611572-baf85ba10ed3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHdvJTIwYmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=1200&q=80',
      layout: TWO_BEDROOM_FALLBACK,
      alt: 'Executive 2-Bedroom Serviced Suite Interior',
      layoutAlt: '2-Bedroom Apartment Floor Plan Layout',
      description: 'A generous 1,050 sq. ft. residence crafted for families and professionals — with dual master suites, expansive entertaining spaces, and panoramic city views.',
      features: ['Dual Master Suites', 'Separate Dining', 'Private Balcony', 'Walk-In Closets']
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [showLayout, setShowLayout] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);

  const CYCLE_DURATION = 6000;

  useEffect(() => {
    if (isPaused) {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let start: number | null = null;
    const startProgress = progressRef.current;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const remaining = CYCLE_DURATION * (1 - startProgress / 100);
      const newProgress = startProgress + ((elapsed / remaining) * (100 - startProgress));

      if (newProgress >= 100) {
        progressRef.current = 0;
        setProgress(0);
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveIdx(prev => (prev + 1) % residences.length);
          setShowLayout(false);
          setTimeout(() => setIsTransitioning(false), 50);
        }, 300);
        start = null;
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        progressRef.current = newProgress;
        setProgress(newProgress);
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPaused, activeIdx, residences.length]);

  const handleTabClick = (idx: number) => {
    if (idx === activeIdx) return;
    setIsTransitioning(true);
    progressRef.current = 0;
    setProgress(0);
    setTimeout(() => {
      setActiveIdx(idx);
      setShowLayout(false);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const active = residences[activeIdx];

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '96px'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top label bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '48px'
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#94a3b8'
          }}
        >
          RESIDENCES & LAYOUTS
        </span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(21,34,71,0.15), transparent)' }} />
      </div>

      {/* Section heading */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '56px',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(40px, 5vw, 60px)',
              fontWeight: 500,
              lineHeight: 1.05,
              color: '#152247',
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            WHAT WE<br />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 400,
                textTransform: 'capitalize',
                fontSize: 'clamp(44px, 5.5vw, 66px)'
              }}
            >
              Offer
            </span>
          </h2>
        </div>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '14.5px',
            lineHeight: 1.7,
            color: '#64748b',
            maxWidth: '420px',
            margin: 0
          }}
        >
          Discover our luxury Serviced Suites featuring bespoke interior architecture and detailed floor plan layouts crafted for elegant living.
        </p>
      </div>

      {/* Interactive Showcase Panel */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          minHeight: '560px',
          background: '#0C142B',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(21, 34, 71, 0.35)'
        }}
      >
        {/* Left: Vertical Tab Nav */}
        <div
          style={{
            background: 'linear-gradient(180deg, #0f1a3a 0%, #0C142B 100%)',
            padding: '48px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          <div>
            {/* Tab buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
              {residences.map((res, idx) => (
                <button
                  key={res.id}
                  onClick={() => handleTabClick(idx)}
                  style={{
                    background: idx === activeIdx ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: 'none',
                    padding: '20px 24px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Active bar */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '3px',
                      height: '100%',
                      background: idx === activeIdx ? '#ffffff' : 'transparent',
                      transition: 'background 0.3s ease'
                    }}
                  />
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '2px',
                      color: idx === activeIdx ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
                      marginBottom: '6px',
                      transition: 'color 0.3s ease',
                      fontFamily: "'Space Grotesk', system-ui, sans-serif"
                    }}
                  >
                    {res.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '16px',
                      fontWeight: 700,
                      color: idx === activeIdx ? '#ffffff' : 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      transition: 'color 0.3s ease',
                      lineHeight: 1.3
                    }}
                  >
                    {res.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '14px',
                      fontStyle: 'italic',
                      color: idx === activeIdx ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                      transition: 'color 0.3s ease',
                      marginTop: '2px'
                    }}
                  >
                    {res.subtitle}
                  </div>
                  {/* Progress bar */}
                  {idx === activeIdx && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '2px',
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.6))',
                        transition: 'width 0.1s linear'
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Description */}
            <div style={{ padding: '0 4px' }}>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '13.5px',
                  lineHeight: 1.7,
                  color: 'rgba(203, 213, 225, 0.8)',
                  margin: '0 0 28px 0',
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease'
                }}
              >
                {active.description}
              </p>

              {/* Feature pills */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
                  transition: 'opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s'
                }}
              >
                {active.features.map((feat, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.6)',
                      padding: '6px 14px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: "'Space Grotesk', system-ui, sans-serif"
                    }}
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ marginTop: '36px' }}>
            <button
              onClick={() => onNavigate('book-now')}
              className="sa-btn-glow"
              style={{
                background: '#ffffff',
                border: 'none',
                color: '#152247',
                padding: '14px 32px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                width: '100%',
                justifyContent: 'center'
              }}
            >
              BOOK NOW <span style={{ fontSize: '15px' }}>→</span>
            </button>
            <p
              style={{
                fontSize: '11px',
                color: 'rgba(148, 163, 184, 0.5)',
                margin: '14px 0 0 0',
                fontStyle: 'italic',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                textAlign: 'center'
              }}
            >
              5-Star Branded Residences by Continent Hotels & Resorts.
            </p>
          </div>
        </div>

        {/* Right: Split Visual Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative' }}>
          {/* Interior Photo */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onClick={() => setShowLayout(false)}
          >
            <img
              src={active.image}
              alt={active.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'scale(1.08)' : 'scale(1)',
                transition: 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'block'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '40px 24px 20px',
                background: 'linear-gradient(transparent, rgba(12,20,43,0.8))'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  opacity: isTransitioning ? 0 : 1,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <div style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.8)'
                  }}
                >
                  INTERIOR VIEW
                </span>
              </div>
            </div>
            {!showLayout && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '2px solid rgba(255,255,255,0.2)',
                  pointerEvents: 'none'
                }}
              />
            )}
          </div>

          {/* Floor Plan */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setShowLayout(true)}
          >
            <img
              src={active.layout}
              alt={active.layoutAlt}
              style={{
                maxWidth: '90%',
                maxHeight: '85%',
                objectFit: 'contain',
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'scale(0.92)' : 'scale(1)',
                transition: 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                opacity: isTransitioning ? 0 : 1,
                transition: 'opacity 0.3s ease'
              }}
            >
              <div style={{ width: '24px', height: '1px', background: 'rgba(21,34,71,0.3)' }} />
              <span
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: '#152247'
                }}
              >
                FLOOR PLAN
              </span>
            </div>
            {showLayout && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '2px solid rgba(21,34,71,0.15)',
                  pointerEvents: 'none'
                }}
              />
            )}
          </div>

          {/* View toggle pills */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              display: 'flex',
              gap: '4px',
              zIndex: 10
            }}
          >
            <button
              onClick={() => setShowLayout(false)}
              style={{
                background: !showLayout ? '#152247' : 'rgba(255,255,255,0.85)',
                color: !showLayout ? '#ffffff' : '#152247',
                border: 'none',
                padding: '7px 16px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)'
              }}
            >
              Interior
            </button>
            <button
              onClick={() => setShowLayout(true)}
              style={{
                background: showLayout ? '#152247' : 'rgba(255,255,255,0.85)',
                color: showLayout ? '#ffffff' : '#152247',
                border: 'none',
                padding: '7px 16px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)'
              }}
            >
              Layout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Exterior Architecture & Amenities Section ───
const ExteriorAmenitiesSection: React.FC = () => {
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1775257796019-3e8db981a1a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29uY2VpcmdlfGVufDB8fDB8fHww?auto=format&fit=crop&w=1200&q=80',
      alt: '24/7 Executive Room Service & Suite Dining',
      caption: 'CARE WITHOUT BOUNDARIES',
      height: '380px',
      delay: 0
    },
    {
      src: 'https://images.unsplash.com/photo-1519162952575-c6c7199502a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kb29yJTIwZ2FtZXN8ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=800&q=80',
      alt: 'Indoor Games and Snooker Lounge',
      caption: 'THE RHYTHM OF LEISURE',
      height: '280px',
      delay: 150
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1676925924664-f501b552a788?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHByYXllciUyMHJvb218ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=800&q=80',
      alt: 'Executive Prayer Room Sanctuary',
      caption: 'SANCTUARY OF STILLNESS',
      height: '300px',
      marginTop: '80px',
      delay: 300
    },
    {
      src: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
      alt: 'Secure Basement Car Parking & Surveillance Entrance',
      caption: 'QUIET ASSURANCE OF PEACE',
      height: '340px',
      delay: 450
    },
    {
      src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      alt: 'TechnoGym Fitness Center & Wellness Suite',
      caption: 'VITALITY IN MOTION',
      height: '360px',
      marginTop: '40px',
      delay: 0
    },
    {
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      alt: 'Artisanal Coffee Shop & Executive Lounge',
      caption: 'MOMENTS BREWED IN GOLD',
      height: '300px',
      delay: 150
    },
    {
      src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      alt: 'Rooftop Infinity Swimming Pool',
      caption: 'REFLECTIONS OF HORIZON',
      height: '410px',
      marginTop: '60px',
      delay: 300
    },
    {
      src: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1lZXRpbmclMjByb29tfGVufDB8fDB8fHww',
      alt: 'Executive Meeting Room & Business Center',
      caption: 'WHERE VISION ALIGNS',
      height: '330px',
      delay: 450
    }
  ];

  return (
    <div style={{ marginBottom: '96px', paddingTop: '32px' }}>
      {/* Header row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 42%) 1fr',
          gap: '64px',
          alignItems: 'start',
          marginBottom: '72px'
        }}
      >
        <ScrollEaseIn direction="left">
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#94a3b8',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: '10px'
              }}
            >
              GRACEFULLY HANDLED
            </div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '38px',
                fontWeight: 900,
                color: '#152247',
                letterSpacing: '0.5px',
                lineHeight: '1.15',
                textTransform: 'uppercase',
                margin: '0 0 12px 0'
              }}
            >
              EXTERIOR
            </h3>
            {/* Accent line */}
            <div
              style={{
                width: '40px',
                height: '2px',
                background: 'linear-gradient(90deg, #152247, transparent)',
                marginTop: '4px'
              }}
            />
          </div>
        </ScrollEaseIn>

        <ScrollEaseIn direction="right">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '15.5px',
                color: '#475569',
                lineHeight: '1.75',
                margin: 0
              }}
            >
              Rising gracefully along the Islamabad Expressway, RJ's Larom Residences marries bold exterior architectural elevation with curated 5-star resident amenities tailored for elevated living.
            </p>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '15px',
                color: '#64748b',
                lineHeight: '1.75',
                margin: 0
              }}
            >
              Designed for holistic urban living, residents enjoy a TechnoGym fitness center, artisanal coffee shop & lounge, rooftop infinity swimming pool, executive business meeting suite, indoor games lounge, serene prayer sanctuary, and 24/7 covered basement parking.
            </p>
          </div>
        </ScrollEaseIn>
      </div>

      {/* Gallery grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '28px',
          alignItems: 'start'
        }}
      >
        {galleryImages.map((img, idx) => (
          <CurtainRevealImage
            key={idx}
            src={img.src}
            alt={img.alt}
            caption={img.caption}
            height={img.height}
            marginTop={img.marginTop}
            delay={img.delay}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Floating Scroll-to-Top Button ───
const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '48px',
        height: '48px',
        background: '#152247',
        color: '#ffffff',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(21,34,71,0.35)',
        zIndex: 999,
        transition: 'all 0.3s ease',
        animation: 'saSlideUp 0.4s ease-out'
      }}
    >
      ↑
    </button>
  );
};

// ─── Section Divider ───
const SectionDivider: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      margin: '0 auto',
      maxWidth: '200px',
      padding: '8px 0',
      ...style
    }}
  >
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(21,34,71,0.15))' }} />
    <div style={{ width: '6px', height: '6px', background: '#152247', transform: 'rotate(45deg)', opacity: 0.3 }} />
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(21,34,71,0.15), transparent)' }} />
  </div>
);


// ═══════════════════════════════════════════════
// ─── Main Page Export ───
// ═══════════════════════════════════════════════
export const ServicedApartmentsPage: React.FC<ServicedApartmentsPageProps> = ({
  onNavigate,
}) => {
  return (
    <div
      className="serviced-apartments-page"
      style={{
        background: '#ffffff',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        paddingTop: '72px'
      }}
    >
      <ScopedStyles />
      <ScrollToTopButton />

      {/* 1. HERO BANNER with parallax */}
      <HeroBanner />

      {/* Contained content */}
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 48px 80px' }}>

        {/* 2. MOVING IMAGE TRAY CAROUSEL */}
        <MovingImageTray />

        {/* Divider */}
        <SectionDivider style={{ marginBottom: '64px' }} />

        {/* 3. VISION / SERVICED TO PERFECTION */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 44%) 1fr',
            gap: '64px',
            alignItems: 'start',
            marginBottom: '96px',
            overflow: 'hidden'
          }}
        >
          <ScrollEaseIn direction="left">
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#94a3b8',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                VISION
              </div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '42px',
                  fontWeight: 900,
                  color: '#152247',
                  letterSpacing: '0.5px',
                  lineHeight: '1.15',
                  textTransform: 'uppercase',
                  margin: '0 0 12px 0'
                }}
              >
                SERVICED TO PERFECTION
              </h2>
              {/* Accent line */}
              <div
                style={{
                  width: '40px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #152247, transparent)'
                }}
              />
            </div>
          </ScrollEaseIn>

          <ScrollEaseIn direction="right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '15.5px',
                  color: '#475569',
                  lineHeight: '1.75',
                  margin: 0
                }}
              >
                At RJ's Larom Residences, we believe that spaces should do more than function — they should resonate. Each serviced suite is a quiet dialogue between ambient light, material, and form, crafted with clarity and emotional depth.
              </p>
            </div>
          </ScrollEaseIn>
        </div>

        {/* 4. INTERIOR SECTION */}
        <div style={{ marginBottom: '96px', paddingTop: '40px' }}>
          {/* Header: Text left, Interior heading right */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr minmax(320px, 44%)',
              gap: '64px',
              alignItems: 'start',
              marginBottom: '72px',
              overflow: 'hidden'
            }}
          >
            <ScrollEaseIn direction="left">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '15.5px',
                    color: '#475569',
                    lineHeight: '1.75',
                    margin: 0
                  }}
                >
                  Crafted with architectural precision and warm luxury, the Bedroom Serviced Apartment at RJ's Larom Residences is a curated living space. The private master bedroom features bespoke wood paneling, plush king bedding, and ambient cove lighting.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '15px',
                    color: '#64748b',
                    lineHeight: '1.75',
                    margin: 0
                  }}
                >
                  An expansive open-plan living room merges seamlessly into an artisanal fine dining area, equipped with integrated appliances, custom stone dining surfaces, and designer cookware.
                </p>
              </div>
            </ScrollEaseIn>

            <ScrollEaseIn direction="right">
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#94a3b8',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    marginBottom: '10px'
                  }}
                >
                  DESIGN PHILOSOPHY
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '38px',
                    fontWeight: 900,
                    color: '#152247',
                    letterSpacing: '0.5px',
                    lineHeight: '1.15',
                    textTransform: 'uppercase',
                    margin: '0 0 12px 0'
                  }}
                >
                  INTERIOR
                </h3>
                {/* Accent line right-aligned */}
                <div
                  style={{
                    width: '40px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #152247)',
                    marginLeft: 'auto'
                  }}
                />
              </div>
            </ScrollEaseIn>
          </div>

          {/* Interior image grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '28px',
              alignItems: 'start'
            }}
          >
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGJlZHJvb218ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=1200&q=80"
              alt="Bespoke Master Bedroom Suite"
              caption="SPACES THAT BREATHE"
              height="440px"
              delay={0}
            />
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1633505412556-82c0921e8f4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRpbmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=1200&q=80"
              alt="Artisanal Fine Dining Table & Suite Dining"
              caption="TEXTURES OF STILLNESS"
              height="290px"
              delay={150}
            />
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1661107259637-4e1c55462428?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2FzaHJvb218ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=1200&q=80"
              alt="Calacatta Marble Washroom"
              caption="LIGHT AS A MATERIAL"
              height="300px"
              marginTop="120px"
              delay={300}
            />
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
              alt="Open-Concept Living Room Lounge"
              caption="THE BEAUTY OF RESTRAINT"
              height="360px"
              delay={450}
            />
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2l0Y2hlbiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Modern Luxury Kitchen Interior"
              caption="CRAFTED FOR HARMONY"
              height="340px"
              marginTop="40px"
              delay={0}
            />
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1591944438730-23dbc9076a9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEJBTENPTll8ZW58MHx8MHx8fDA%3D"
              alt="Private Suite Terrace & Panoramic Sky View"
              caption="WHERE SKY MEETS STILLNESS"
              height="420px"
              delay={150}
            />
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80"
              alt="Sunlit Executive Reading & Leisure Lounge"
              caption="SANCTUARY OF MORNING LIGHT"
              height="300px"
              marginTop="60px"
              delay={300}
            />
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QkVTUE9LRSUyMEJFRFJPT018ZW58MHx8MHx8fDA%3D"
              alt="Bespoke Master Bedroom Suite"
              caption="THE ART OF REFINEMENT"
              height="380px"
              delay={450}
            />
          </div>
        </div>

        {/* 5. EXTERIOR & AMENITIES */}
        <ExteriorAmenitiesSection />

        {/* 6. WHAT WE OFFER */}
        <WhatWeOfferSection onNavigate={onNavigate} />
      </div>
    </div>
  );
};
