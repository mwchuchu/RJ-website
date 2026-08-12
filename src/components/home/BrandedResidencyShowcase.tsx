import React, { useState, useEffect, useRef } from 'react';

interface BrandedResidencyShowcaseProps {
  onNavigate: (tabId: string) => void;
}

export const BrandedResidencyShowcase: React.FC<BrandedResidencyShowcaseProps> = ({ onNavigate }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const characteristics = [
    {
      id: 1,
      number: '01',
      badge: '5-STAR HOSPITALITY',
      title: 'Hotel Managed Services',
      tagline: 'Operated by Continent Hotels International',
      description:
        'Experience 5-star hotel luxury every day. Our dedicated hospitality team provides 24/7 concierge, round-the-clock room service, daily housekeeping, valet parking, and executive laundry facilities.',
      highlights: ['24/7 Concierge & Reception', 'Daily Housekeeping & Laundry', 'In-Suite Fine Dining Service'],
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      number: '02',
      badge: 'BESPOKE INTERIORS',
      title: 'Turnkey Fully Furnished Suites',
      tagline: 'Move-in & Rental Ready Elegance',
      description:
        'Crafted for high-end living, each 1 & 2-bedroom suite is fully outfitted with luxury furniture, smart ambient lighting, premium appliances, designer linens, and curated decor elements.',
      highlights: ['Designer Italian Furniture', 'Smart Keyless RFID Access', 'Full Kitchen & Smart TV Suites'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      number: '03',
      badge: 'INVESTMENT RETURNS',
      title: 'Guaranteed High Rental Yield',
      tagline: '6–7% Annual ROI with Overseas Management',
      description:
        'Invest with complete confidence. Overseas property investors enjoy hands-off property management, guaranteed rental yields, hassle-free tenant booking, and transparent digital payout tracking.',
      highlights: ['6–7% Guaranteed Annual Yield', 'Hands-Off Overseas Care', 'Quarterly Dividend Payouts'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      number: '04',
      badge: 'CAPITAL LOCATION',
      title: 'Prime Islamabad Expressway Hub',
      tagline: 'Directly Opposite IMARAT Downtown & Monal',
      description:
        'Unrivaled capital connectivity. Located directly on Islamabad Expressway with sweeping 360-degree views of Faisal Mosque, the Margalla Hills, and rapid access to airport and diplomatic hubs.',
      highlights: ['Iconic Faisal Mosque Views', 'Direct Expressway Access', 'Opposite IMARAT Downtown'],
      image: 'https://images.unsplash.com/photo-1608020932658-d0e19a69580b?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      number: '05',
      badge: 'RESORT LIFESTYLE',
      title: '33+ World-Class Resort Amenities',
      tagline: 'Sky Pool, Spa & TechnoGym Center',
      description:
        'Unmatched lifestyle infrastructure. Indulge in our heated rooftop infinity pool, state-of-the-art TechnoGym fitness center, RFID lift security, marble thermal spa, and private executive lounges.',
      highlights: ['Rooftop Heated Infinity Pool', 'TechnoGym Fitness Club', 'Thermal Spa & Executive Lounge'],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  // Auto-play slideshow timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % characteristics.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPaused, characteristics.length]);

  // Scroll-Triggered (Fire-and-Forget) Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasTriggered(true); // Triggers automatically once crossed threshold & runs to completion
          }
        });
      },
      { threshold: 0.25 }
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

  const currentItem = characteristics[activeSlide];

  return (
    <section
      ref={sectionRef}
      className="branded-residency-editorial-section"
      style={{
        background: '#f4f8fc',
        color: '#0f172a',
        position: 'relative',
        overflow: 'hidden',
        padding: '0',
        fontFamily: "'Space Grotesk', system-ui, -apple-system, sans-serif",
        perspective: '1200px'
      }}
    >
      {/* CSS Keyframe animations for Fire-and-Forget Scroll Entrance */}
      <style>{`
        @keyframes fireAndForgetFadeUp {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fireAndForgetArch {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.92) rotateY(-8deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg);
          }
        }
        @keyframes fireAndForgetBuilding {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(40px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes floatBuilding {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes fireAndForgetPanel {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes spinContinuous {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.12); }
        }
        @keyframes heartPulseFill {
          0%, 100% { fill: rgba(2, 132, 199, 0); transform: scale(1); }
          50% { fill: rgba(2, 132, 199, 1); transform: scale(1.15); }
        }
        .arch-image-frame {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .arch-image-frame:hover {
          transform: translateY(-6px) scale(1.02);
        }
        .editorial-grid-line {
          background-color: rgba(2, 132, 199, 0.18);
        }
        .btn-editorial-primary {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: #ffffff;
          box-shadow: 0 10px 25px rgba(2, 132, 199, 0.3);
          transition: all 0.3s ease;
        }
        .btn-editorial-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(2, 132, 199, 0.45);
          background: linear-gradient(135deg, #0369a1 0%, #0c4a6e 100%);
        }
        .slide-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 99px;
          background: rgba(2, 132, 199, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .slide-indicator-dot.active {
          width: 28px;
          background: #0284c7;
        }
      `}</style>

      {/* Main Content Editorial Grid Layout with Fire-and-Forget Scroll Trigger */}
      <div
        style={{
          maxWidth: '1340px',
          margin: '0 auto',
          padding: '80px 32px 90px 32px',
          position: 'relative',
          opacity: hasTriggered ? 1 : 0,
          animation: hasTriggered ? 'fireAndForgetFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
        }}
      >
        {/* Main Section Grid: Left Arch Container + Right Editorial Headlines & Content */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 440px) 1fr',
            gap: '50px',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column: Dome / Arch Frame Image Container */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: hasTriggered ? 1 : 0,
              animation: hasTriggered ? 'fireAndForgetArch 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards' : 'none'
            }}
          >
            {/* Subtle Blue Glow Behind Arch */}
            <div
              style={{
                position: 'absolute',
                width: '340px',
                height: '500px',
                borderRadius: '240px 240px 0 0',
                background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.3) 0%, rgba(2, 132, 199, 0.12) 100%)',
                filter: 'blur(35px)',
                zIndex: 1,
                animation: 'pulseGlow 6s ease-in-out infinite'
              }}
            />

            {/* Arch Container Frame with Editorial Border Line */}
            <div
              className="arch-image-frame"
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: '420px',
                height: '520px',
                borderRadius: '210px 210px 24px 24px',
                overflow: 'hidden',
                border: '1.5px solid rgba(2, 132, 199, 0.25)',
                boxShadow: '0 24px 48px rgba(15, 23, 42, 0.14)',
                background: '#ffffff'
              }}
            >
              {/* Slideshow Main Active Image */}
              <img
                src={currentItem.image}
                alt={currentItem.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.3s ease-in-out, transform 0.4s ease-out'
                }}
              />

              {/* Image Overlay Gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0) 50%)'
                }}
              />

              {/* Arch Bottom Overlay Pill Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  padding: '12px 20px',
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {currentItem.badge}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                    {currentItem.title}
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Sub-Label on Left Edge */}
            <div
              style={{
                position: 'absolute',
                left: '-28px',
                bottom: '120px',
                transform: 'rotate(-90deg)',
                transformOrigin: 'left bottom',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '2px',
                color: '#64748b',
                textTransform: 'uppercase'
              }}
            >
              RJ's Larom Architecture
            </div>
          </div>

          {/* Right Column: Editorial Typography, Characteristics Slideshow, & Controls */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              opacity: hasTriggered ? 1 : 0,
              animation: hasTriggered ? 'fireAndForgetFadeUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' : 'none'
            }}
          >
            {/* Eyebrow Tagline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span
                style={{
                  background: '#e0f2fe',
                  color: '#0284c7',
                  padding: '6px 16px',
                  borderRadius: '99px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(2, 132, 199, 0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                LUXURY BRANDED RESIDENCY
              </span>
            </div>

            {/* Main Section Headline with Stylish Editorial Font */}
            <h2
              style={{
                fontSize: '44px',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: '1.15',
                letterSpacing: '-0.5px',
                margin: '0 0 24px 0',
                fontFamily: "'Space Grotesk', system-ui, sans-serif"
              }}
            >
              Pakistan's Leading Branded Residency{' '}
              <span
                style={{
                  color: '#0284c7',
                  fontStyle: 'italic',
                  fontFamily: "Georgia, 'Times New Roman', serif"
                }}
              >
                Fully Furnished
              </span>{' '}
              Serviced apartments.
            </h2>

            {/* Active Characteristic Slideshow Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '28px 32px',
                border: '1px solid rgba(2, 132, 199, 0.2)',
                boxShadow: '0 12px 32px rgba(15, 23, 42, 0.05)',
                marginBottom: '28px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                {/* Animated Blue Heart (Filled & Unfilled Animation) replacing text */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    stroke="#0284c7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      animation: 'heartPulseFill 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      filter: 'drop-shadow(0 2px 6px rgba(2, 132, 199, 0.35))'
                    }}
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0369a1', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                    FEATURED HIGHLIGHT
                  </span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>{currentItem.tagline}</span>
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>
                {currentItem.title}
              </h3>

              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.65', margin: '0 0 20px 0' }}>
                {currentItem.description}
              </p>

              {/* Highlights Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {currentItem.highlights.map((h, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#f0f9ff',
                      color: '#0284c7',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(2, 132, 199, 0.15)'
                    }}
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Slide Navigation Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Slide Indicator Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {characteristics.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`slide-indicator-dot ${activeSlide === index ? 'active' : ''}`}
                    title={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setActiveSlide((prev) => (prev - 1 + characteristics.length) % characteristics.length)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid rgba(2, 132, 199, 0.3)',
                    background: '#ffffff',
                    color: '#0369a1',
                    fontSize: '18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s ease'
                  }}
                  title="Previous Characteristic"
                >
                  ←
                </button>

                <button
                  onClick={() => setActiveSlide((prev) => (prev + 1) % characteristics.length)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: 'none',
                    background: '#0284c7',
                    color: '#ffffff',
                    fontSize: '18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                    transition: 'all 0.25s ease'
                  }}
                  title="Next Characteristic"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel: "Explore Serviced Apartments" Section (Replaces the form from reference image) */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
            border: '1.5px solid rgba(2, 132, 199, 0.25)',
            borderRadius: '24px',
            padding: '40px 48px',
            marginTop: '64px',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.06)',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '40px',
            alignItems: 'center',
            opacity: hasTriggered ? 1 : 0,
            animation: hasTriggered ? 'fireAndForgetPanel 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards' : 'none'
          }}
        >
          {/* Left Side: Information & Specs */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <span
                style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '99px',
                  letterSpacing: '1px'
                }}
              >
                SERVICED SUITES SHOWCASE
              </span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0369a1' }}>
                78 Premier Hotel Suites
              </span>
            </div>

            <h3
              style={{
                fontSize: '30px',
                fontWeight: 900,
                color: '#0f172a',
                margin: '0 0 12px 0',
                fontFamily: "'Space Grotesk', system-ui, sans-serif"
              }}
            >
              Explore Serviced Apartments
            </h3>

            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px 0', maxWidth: '640px' }}>
              Discover unmatched luxury living & investment returns at RJ's Larom. Choose from fully furnished 1 & 2-bedroom serviced hotel apartments with guaranteed yields and round-the-clock hotel hospitality.
            </p>

            {/* Specs Counters Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#0284c7' }}>78</div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Serviced Units</div>
              </div>
              <div style={{ borderRight: '1px solid rgba(2, 132, 199, 0.2)' }} />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#0369a1' }}>1 & 2 Bed</div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Luxury Floor Plans</div>
              </div>
              <div style={{ borderRight: '1px solid rgba(2, 132, 199, 0.2)' }} />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#10b981' }}>6–7%</div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Guaranteed ROI Yield</div>
              </div>
            </div>
          </div>

          {/* Right Side: Single Primary Navigation Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '240px' }}>
            <button
              className="btn-editorial-primary"
              onClick={() => onNavigate('serviced-apartments')}
              style={{
                padding: '16px 32px',
                borderRadius: '99px',
                fontSize: '15px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                textAlign: 'center',
                letterSpacing: '0.5px'
              }}
            >
              Explore Serviced Apartments →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
