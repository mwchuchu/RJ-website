import React, { useState, useEffect, useRef } from 'react';

interface BrandedResidencyShowcaseProps {
  onNavigate: (tabId: string) => void;
}

export const BrandedResidencyShowcase: React.FC<BrandedResidencyShowcaseProps> = ({ onNavigate }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const apartmentFeatures = [
    {
      id: 1,
      number: '01/05',
      title: 'LUXURY BEDROOM',
      description:
        "Each bedroom suite features  king bedding,smart ambient lighting, and 24/7 in-suite housekeeping for fine living.",
      conceptSubtext: 'Bespoke bedroom interior concept for RJ\'s Larom Residences.',
      mainImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      secondImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      number: '02/05',
      title: 'LUXURY LIVING ROOM',
      description:
        "Crafted for prestigious living, RJ's Larom luxury lounges boast double-glazed panoramic views, keyless RFID access, and 24/7 dedicated hotel concierge services.",
      conceptSubtext: 'Turnkey living room design concept for serviced residences.',
      mainImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=1200&q=80',
      secondImage: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      number: '03/05',
      title: 'FINE DINING',
      description:
        "Enjoy round-the-clock room service and in-suite fine dining, featuring marble tables, artisanal chandeliers, and 5-star hospitality.",
      conceptSubtext: 'Curated dining space for in-room gourmet hotel hospitality.',
      mainImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
      secondImage: 'https://images.unsplash.com/photo-1616486886892-ff366aa67ba4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGluaW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      number: '04/05',
      title: 'KITCHEN',
      description:
        "Designed for turnkey living convenience. Fully equipped European kitchens featuring built-in culinary appliances, and daily housekeeping care.",
      conceptSubtext: 'Fully equipped turnkey kitchen suite for seamless long-stay living.',
      mainImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1268&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=1200&q=80',
      secondImage: 'https://images.unsplash.com/photo-1567767326925-e2047bf469d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      number: '05/05',
      title: 'LUXURY WASHROOM',
      description:
        "Unwind in a spa-standard bath sanctuary featuring, thermostatic walk-in rain showers, illuminated vanity mirrors, and luxury organic amenities.",
      conceptSubtext: 'Hotel-standard marble bath suite with organic Turkish amenities.',
      mainImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      secondImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Auto-play slideshow timer (Faster 2.2s speed)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % apartmentFeatures.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isPaused, apartmentFeatures.length]);

  // Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasTriggered(true);
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

  const currentItem = apartmentFeatures[activeSlide];

  return (
    <section
      ref={sectionRef}
      className="minimal-editorial-section"
      style={{
        background: '#ffffff',
        color: '#1a1a1a',
        position: 'relative',
        padding: '70px 0 90px',
        border: 'none',
        fontFamily: "'Space Grotesk', system-ui, sans-serif"
      }}
    >
      {/* Keyframes for animations */}
      <style>{`
        @keyframes secondPhotoAnim {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        @keyframes mainPhotoAnim {
          0% {
            opacity: 0.1;
            transform: scale(1.02);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes textAnim {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .anim-second-photo {
          animation: secondPhotoAnim 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-main-photo {
          animation: mainPhotoAnim 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-text-content {
          animation: textAnim 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .tab-text-item {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #777777;
          background: transparent;
          border: none;
          padding: 6px 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .tab-text-item.active {
          color: #152247;
          font-weight: 900;
        }
        .nav-btn-navy {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: #152247;
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(21, 34, 71, 0.25);
          transition: color 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .nav-btn-navy::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background: #2563EB;
          transition: height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: -1;
          border-radius: inherit;
        }
        .nav-btn-navy:hover::before {
          height: 100%;
        }
        .nav-btn-navy:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(21, 34, 71, 0.4);
        }
        .branded-showcase-grid {
          display: grid;
          grid-template-columns: minmax(380px, 55%) 1fr;
          gap: 48px;
          align-items: start;
        }
        .branded-main-img-wrapper {
          width: 100%;
          height: 560px;
          overflow: hidden;
          background: #f4f4f4;
          border-radius: 6px;
          box-shadow: 0 12px 36px rgba(21, 34, 71, 0.08);
        }
        .branded-content-column {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 560px;
        }
        .branded-text-photo-grid {
          display: grid;
          grid-template-columns: 1fr minmax(180px, 220px);
          gap: 32px;
          align-items: center;
          flex: 1;
        }
        .branded-second-img-box {
          width: 100%;
          height: 230px;
          overflow: hidden;
          background: #f4f4f4;
          border-radius: 6px;
          box-shadow: 0 10px 28px rgba(21, 34, 71, 0.12);
        }
        .branded-bottom-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-top: 32px;
        }

        /* ─── Responsive Breakpoints for Editorial Showcase ─── */
        @media (max-width: 1024px) {
          .branded-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .branded-main-img-wrapper {
            height: 420px !important;
          }
          .branded-content-column {
            min-height: auto !important;
          }
        }

        @media (max-width: 768px) {
          .branded-text-photo-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .branded-main-img-wrapper {
            height: 320px !important;
          }
          .branded-second-img-box {
            height: 200px !important;
            max-width: 320px;
          }
          .branded-headline-title {
            font-size: clamp(32px, 8vw, 44px) !important;
          }
          .branded-item-title {
            font-size: 26px !important;
          }
          .branded-bottom-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .branded-main-img-wrapper {
            height: 260px !important;
          }
          .branded-second-img-box {
            height: 180px !important;
          }
        }
      `}</style>

      <div
        className="branded-showcase-container"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          opacity: hasTriggered ? 1 : 0,
          transform: hasTriggered ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Main Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2
            className="branded-headline-title"
            style={{
              fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', serif",
              fontSize: '52px',
              fontWeight: 800,
              color: '#152247',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              lineHeight: '1.08',
              margin: 0
            }}
          >
            FULLY <span style={{ color: '#152247' }}>FURNISHED</span> APARTMENTS
          </h2>
        </div>

        {/* Borderless Editorial Content Layout Container */}
        <div
          className="branded-showcase-grid"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* LEFT SIDE: Main Portrait Photo */}
          <div className="branded-main-img-wrapper">
            <img
              key={`main-${currentItem.id}`}
              src={currentItem.mainImage}
              alt={currentItem.title}
              className="anim-main-photo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* RIGHT SIDE: Layout with Title, Text, Second Photo */}
          <div className="branded-content-column">
            {/* Middle Section: Title, Description & Right Sub-Column for Second Photo */}
            <div
              key={`content-${currentItem.id}`}
              className="anim-text-content branded-text-photo-grid"
            >
              {/* Middle Left: Feature Title & Description */}
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#2563EB',
                    letterSpacing: '1.8px',
                    textTransform: 'uppercase',
                    marginBottom: '10px'
                  }}
                >
                  {currentItem.number} • RESIDENCE FEATURE
                </div>

                <h3
                  className="branded-item-title"
                  style={{
                    fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', serif",
                    fontSize: '34px',
                    fontWeight: 800,
                    color: '#152247',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    margin: '0 0 14px 0',
                    lineHeight: '1.15'
                  }}
                >
                  {currentItem.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    color: '#475569',
                    fontSize: '15.5px',
                    lineHeight: '1.75',
                    margin: 0,
                    width: '100%',
                    maxWidth: '520px'
                  }}
                >
                  {currentItem.description}
                </p>
              </div>

              {/* Middle Right: Second Photo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <div
                  key={`second-${currentItem.id}`}
                  className="anim-second-photo branded-second-img-box"
                >
                  <img
                    src={currentItem.secondImage}
                    alt={`${currentItem.title} Detail Angle`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: Subtext on Left + Navigation Buttons on Right */}
            <div className="branded-bottom-row">
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '14px',
                  color: '#64748b',
                  maxWidth: '460px',
                  lineHeight: '1.6'
                }}
              >
                {currentItem.conceptSubtext}
              </div>

              {/* Navy Blue Circular Prev/Next Arrow Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => setActiveSlide((prev) => (prev - 1 + apartmentFeatures.length) % apartmentFeatures.length)}
                  className="nav-btn-navy"
                  aria-label="Previous Feature"
                >
                  ←
                </button>
                <button
                  onClick={() => setActiveSlide((prev) => (prev + 1) % apartmentFeatures.length)}
                  className="nav-btn-navy"
                  aria-label="Next Feature"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Action Button */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            className="home-curtain-btn"
            onClick={() => onNavigate('serviced-apartments')}
            style={{
              padding: '16px 44px',
              borderRadius: '0px',
              fontSize: '14.5px',
              fontWeight: 800,
              background: '#152247',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.5px',
              boxShadow: '0 8px 24px rgba(21, 34, 71, 0.25)'
            }}
          >
            Explore Serviced Apartments →
          </button>
        </div>
      </div>
    </section>
  );
};
