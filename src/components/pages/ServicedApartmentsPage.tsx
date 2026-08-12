import React, { useState, useEffect, useRef } from 'react';
import type { Property } from '../../types/index';
import { ONE_BEDROOM_FALLBACK, TWO_BEDROOM_FALLBACK } from '../../data/floorplanAssets';

interface ServicedApartmentsPageProps {
  onSelectProperty?: (property: Property) => void;
  onNavigate: (tabId: string) => void;
}

// Interactive Moving Image Tray Carousel Component (Central Image Focused & Animated Loop)
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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trayImages.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [trayImages.length]);

  const leftIndex = (activeIndex - 1 + trayImages.length) % trayImages.length;
  const rightIndex = (activeIndex + 1) % trayImages.length;

  return (
    <div style={{ marginBottom: '84px', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {/* Left Preview Image Card */}
        <div
          style={{
            flex: '0 0 25%',
            height: '340px',
            borderRadius: '4px',
            overflow: 'hidden',
            opacity: 0.65,
            transform: 'scale(0.92)',
            transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
          }}
          onClick={() => setActiveIndex(leftIndex)}
        >
          <img
            src={trayImages[leftIndex].url}
            alt={trayImages[leftIndex].title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Center Main Focused Image */}
        <div
          style={{
            flex: '0 0 50%',
            height: '430px',
            borderRadius: '4px',
            overflow: 'hidden',
            opacity: 1,
            transform: 'scale(1.05)',
            transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            boxShadow: '0 25px 60px rgba(21, 34, 71, 0.2)',
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
              transition: 'opacity 0.6s ease'
            }}
          />
        </div>

        {/* Right Preview Image Card */}
        <div
          style={{
            flex: '0 0 25%',
            height: '340px',
            borderRadius: '4px',
            overflow: 'hidden',
            opacity: 0.65,
            transform: 'scale(0.92)',
            transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
          }}
          onClick={() => setActiveIndex(rightIndex)}
        >
          <img
            src={trayImages[rightIndex].url}
            alt={trayImages[rightIndex].title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Active Image Title Caption */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A99AD', fontWeight: 500, margin: 0 }}>
          {trayImages[activeIndex].title}
        </p>
      </div>
    </div>
  );
};

// Directional Scroll Ease-In Wrapper Component
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
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(false);
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

// Drop Curtain Reveal Image Component for Editorial Grid
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
          background: '#f8fafc',
          boxShadow: '0 12px 30px rgba(21, 34, 71, 0.06)'
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
            background: '#ffffff',
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
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isRevealed ? 'scale(1)' : 'scale(1.18)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'block'
          }}
        />
      </div>

      {/* Caption Text Below Image — Strictly following design image */}
      <div style={{ marginTop: '14px' }}>
        <h4
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: '13px',
            fontWeight: 800,
            color: '#152247',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 1.3
          }}
        >
          {caption}
        </h4>
      </div>
    </div>
  );
};

// Card Component with Curtain Reveal UP (Bottom-to-Top) Animation (No Numbering)
const CurtainUpCard: React.FC<{
  item: { title: string; image: string; alt: string; isLayout?: boolean };
  delay?: number;
}> = ({ item, delay = 0 }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isLayout = item.isLayout || item.title.includes('LAYOUT');

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
    <div
      ref={cardRef}
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '350px',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.16)',
        border: '1px solid #f1f5f9',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Upper Section: Right-aligned offset image container */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', height: '240px', width: '100%' }}>
        <div
          style={{
            position: 'relative',
            width: '78%',
            height: '100%',
            borderRadius: '6px',
            overflow: 'hidden',
            background: isLayout ? '#ffffff' : '#f8fafc',
            border: isLayout ? '1px solid #e2e8f0' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Curtain Overlay: Animates UP from translateY(0%) to translateY(-100%) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '#ffffff',
              transform: isRevealed ? 'translateY(-100%)' : 'translateY(0%)',
              transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          />

          {/* Interior / Layout Photograph with Zoom reveal */}
          <img
            src={item.image}
            alt={item.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: isLayout ? 'contain' : 'cover',
              padding: isLayout ? '12px' : '0',
              transform: isRevealed ? 'scale(1)' : (isLayout ? 'scale(0.95)' : 'scale(1.15)'),
              transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* Bottom Left Title Label */}
      <div>
        <h4
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: '12.5px',
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
  );
};

// "WHAT WE OFFER" Section with Navy Blue Background, 1 & 2 Bed Interiors & Layouts
const WhatWeOfferSection: React.FC<{ onNavigate: (tabId: string) => void }> = ({ onNavigate }) => {
  const offerItems = [
    {
      title: 'One bed apartment.',
      image: 'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?auto=format&fit=crop&w=1200&q=80',
      alt: 'Luxury 1-Bedroom Serviced Suite Interior',
      isLayout: false
    },
    {
      title: 'LAYOUT ',
      image: ONE_BEDROOM_FALLBACK,
      alt: '1-Bedroom Apartment Floor Plan Layout',
      isLayout: true
    },
    {
      title: 'Two bed apartment.',
      image: 'https://images.unsplash.com/photo-1720582611572-baf85ba10ed3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHdvJTIwYmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=1200&q=80?auto=format&fit=crop&w=1200&q=80',
      alt: 'Executive 2-Bedroom Serviced Suite Interior',
      isLayout: false
    },
    {
      title: 'Layout',
      image: TWO_BEDROOM_FALLBACK,
      alt: '2-Bedroom Apartment Floor Plan Layout',
      isLayout: true
    }
  ];

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(21, 34, 71, 0.88) 0%, rgba(15, 25, 55, 0.90) 100%), url("https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
        padding: '72px 56px',
        marginBottom: '96px',
        boxShadow: '0 24px 60px rgba(21, 34, 71, 0.35)',
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
              RESIDENCES & LAYOUTS
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
              WHAT WE<br />
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 400, textTransform: 'capitalize', fontSize: '56px' }}>
                Offer
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
              Discover our luxury 1 & 2 Bedroom Serviced Suites featuring bespoke interior architecture and detailed floor plan layouts crafted for elegant living.
            </p>

            <button
              onClick={() => onNavigate('book-now')}
              style={{
                background: '#ffffff',
                border: 'none',
                color: '#152247',
                padding: '14px 32px',
                borderRadius: '99px',
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
                fontFamily: "'Space Grotesk', system-ui, sans-serif"
              }}
            >
              BOOK NOW <span style={{ fontSize: '15px' }}>→</span>
            </button>
          </div>
        </div>

        {/* Right Column: 2x2 Grid of Cards (No Numbering, Interior & Floor Plan Layouts) */}
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px'
            }}
          >
            {offerItems.map((item, index) => (
              <CurtainUpCard key={index} item={item} delay={index * 150} />
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
              5-Star Branded Serviced Residences by Continent Hotels & Resorts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exterior Architecture & Amenities Section (Heading Left, Clean Editorial Text Right)
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
      {/* Top Header: Left Side Heading, Right Side Clean Editorial Text */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 42%) 1fr',
          gap: '64px',
          alignItems: 'start',
          marginBottom: '72px'
        }}
      >
        {/* Left Column: Exterior Heading (Eases in from LEFT) */}
        <ScrollEaseIn direction="left">
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#777777', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
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
                margin: 0
              }}
            >
              EXTERIOR
            </h3>
          </div>
        </ScrollEaseIn>

        {/* Right Column: Two Paragraphs matching Interior section (Eases in from RIGHT) */}
        <ScrollEaseIn direction="right">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '15.5px',
                color: '#475569',
                lineHeight: '1.7',
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
                lineHeight: '1.7',
                margin: 0
              }}
            >
              Designed for holistic urban living, residents enjoy a TechnoGym fitness center, artisanal coffee shop & lounge, rooftop infinity swimming pool, executive business meeting suite, indoor games lounge, serene prayer sanctuary, and 24/7 covered basement parking.
            </p>
          </div>
        </ScrollEaseIn>
      </div>

      {/* 4-Image Exterior & Amenity Gallery Grid with Drop Curtain Reveal */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
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


export const ServicedApartmentsPage: React.FC<ServicedApartmentsPageProps> = ({
  onNavigate,
}) => {

  return (
    <div
      className="serviced-apartments-page animate-fade-in"
      style={{
        padding: '120px 48px 80px',
        background: '#ffffff',
        fontFamily: "'Space Grotesk', system-ui, sans-serif"
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>

        {/* 1. TOP EDITORIAL HEADING */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '48px',
              fontWeight: 900,
              color: '#152247',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              lineHeight: '1.15',
              margin: 0
            }}
          >
            FULLY FURNISHED SERVICED APARTMENTS
          </h1>
        </div>

        {/* 2. MOVING IMAGE TRAY CAROUSEL (Central Image Focused & Animated Loop) */}
        <MovingImageTray />

        {/* 3. QUOTATION HEADLINE & RIGHT-SIDE PARAGRAPH SECTION */}
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
          {/* Left Column: Vision Title (Eases in from LEFT) */}
          <ScrollEaseIn direction="left">
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#777777', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
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
                  margin: 0
                }}
              >
                SERVICED TO PERFECTION
              </h2>
            </div>
          </ScrollEaseIn>

          {/* Right Column: Paragraph Description (Eases in from RIGHT) */}
          <ScrollEaseIn direction="right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '15.5px',
                  color: '#475569',
                  lineHeight: '1.7',
                  margin: 0
                }}
              >
                At RJ's Larom Residences, we believe that spaces should do more than function — they should resonate. Each serviced suite is a quiet dialogue between ambient light, material, and form, crafted with clarity and emotional depth.
              </p>
            </div>
          </ScrollEaseIn>
        </div>

        {/* 4. INTERIOR GALLERY SECTION (Text Left, INTERIOR Heading Right) */}
        <div style={{ marginBottom: '96px', paddingTop: '40px' }}>
          {/* Interior Heading & Description Paragraph Section */}
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
            {/* Left Column: Paragraph Description (Eases in from LEFT) */}
            <ScrollEaseIn direction="left">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '15.5px',
                    color: '#475569',
                    lineHeight: '1.7',
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
                    lineHeight: '1.7',
                    margin: 0
                  }}
                >
                  An expansive open-plan living room merges seamlessly into an artisanal fine dining area, equipped with integrated appliances, custom stone dining surfaces, and designer cookware.
                </p>
              </div>
            </ScrollEaseIn>

            {/* Right Column: Interior Title (Breathes in / eases in from RIGHT) */}
            <ScrollEaseIn direction="right">
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#777777', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
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
                    margin: 0
                  }}
                >
                  INTERIOR
                </h3>
              </div>
            </ScrollEaseIn>
          </div>

          {/* 8-Image Editorial Staggered Grid with Drop Curtain Reveal on Scroll */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '32px 32px',
              alignItems: 'start'
            }}
          >
            {/* Row 1 - Image 1: Bedroom (Far Left - Tall Portrait) */}
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGJlZHJvb218ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=1200&q=80"
              alt="Bespoke Master Bedroom Suite"
              caption="SPACES THAT BREATHE"
              height="440px"
              delay={0}
            />

            {/* Row 1 - Image 2: Dining (Middle-Left - Square/Medium) */}
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1633505412556-82c0921e8f4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRpbmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=1200&q=80"
              alt="Artisanal Fine Dining Table & Suite Dining"
              caption="TEXTURES OF STILLNESS"
              height="290px"
              delay={150}
            />

            {/* Row 1 - Image 3: Washroom (Middle-Right - Square/Medium, Vertical Offset near bottom baseline) */}
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1661107259637-4e1c55462428?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2FzaHJvb218ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=1200&q=80"
              alt="Calacatta Marble Washroom"
              caption="LIGHT AS A MATERIAL"
              height="300px"
              marginTop="120px"
              delay={300}
            />

            {/* Row 1 - Image 4: Living Room (Far Right - Medium Portrait) */}
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
              alt="Open-Concept Living Room Lounge"
              caption="THE BEAUTY OF RESTRAINT"
              height="360px"
              delay={450}
            />

            {/* Row 2 - Image 5: Kitchen Island Bar */}
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
              alt="Artisanal Kitchen Island & Fine Dining Bar"
              caption="CRAFTED FOR HARMONY"
              height="340px"
              marginTop="40px"
              delay={0}
            />

            {/* Row 2 - Image 6: Sky Balcony */}
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1591944438730-23dbc9076a9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEJBTENPTll8ZW58MHx8MHx8fDA%3D"
              alt="Private Suite Terrace & Panoramic Sky View"
              caption="WHERE SKY MEETS STILLNESS"
              height="420px"
              delay={150}
            />

            {/* Row 2 - Image 7: Sunlit Lounge Nook */}
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80"
              alt="Sunlit Executive Reading & Leisure Lounge"
              caption="SANCTUARY OF MORNING LIGHT"
              height="300px"
              marginTop="60px"
              delay={300}
            />

            {/* Row 2 - Image 8: Bespoke Dressing Suite */}
            <CurtainRevealImage
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QkVTUE9LRSUyMEJFRFJPT018ZW58MHx8MHx8fDA%3D"
              alt="Bespoke Master Bedroom Suite"
              caption="THE ART OF REFINEMENT"
              height="380px"
              delay={450}
            />
          </div>
        </div>

        {/* 5. EXTERIOR ARCHITECTURE & AMENITIES SECTION (Left Heading, Right Text & Amenity Cards) */}
        <ExteriorAmenitiesSection />

        {/* 6. WHAT WE OFFER SECTION (Navy Blue Background, 1 & 2 Bed Interiors & Layouts) */}
        <WhatWeOfferSection onNavigate={onNavigate} />

      </div>
    </div>
  );
};
