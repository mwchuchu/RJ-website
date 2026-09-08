import React, { useState } from 'react';
import { CATEGORIZED_AMENITIES } from '../../data/mockData';

interface AmenitiesPageProps {
  onNavigate: (tabId: string) => void;
}

// Scroll Animate Wrapper Component
const ScrollAnimateSection: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}> = ({ children, style = {}, className = '', delay = 0 }) => {
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
      { threshold: 0.1 }
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
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'General Amenities',
    'Guest Room Amenities',
    'Corporate Amenities'
  ];

  // Filter Categories to display
  const displayedCategories = activeCategory === 'All'
    ? CATEGORIZED_AMENITIES
    : CATEGORIZED_AMENITIES.filter(cat => cat.category === activeCategory);

  return (
    <div
      className="pastel-amenities-page animate-fade-in"
      style={{
        background: '#ffffff',
        padding: 0,
        margin: 0,
        width: '100%',
        color: '#152247',
        minHeight: '100vh',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        paddingBottom: '80px'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

        .pastel-amenities-page {
          padding: 0 !important;
          background: #ffffff !important;
        }

        @keyframes floatWatermark {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-15px);
          }
        }

        .float-hero-watermark,
        .float-amenities-text {
          animation: floatWatermark 5s ease-in-out infinite;
        }

        @keyframes floatSmooth {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .sa-float-capsule {
          animation: floatSmooth 5s ease-in-out infinite;
        }

        .amenity-card-hover {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .amenity-card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(21, 34, 71, 0.12) !important;
        }
        .amenity-card-hover:hover img {
          transform: scale(1.06);
        }
      `}</style>
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          background: 'radial-gradient(ellipse 120% 85% at 50% 0%, #5074a6 0%, #7b9cc7 25%, #adc6e3 50%, #dce8f5 75%, #ffffff 100%)',
          borderRadius: '0px 0px 32px 32px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '110px 48px 0px 48px',
          margin: 0,
          width: '100%'
        }}
      >
        {/* Floating Giant Watermark */}
        <div
          className="float-hero-watermark"
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(52px, 12.5vw, 185px)',
            fontWeight: 800,
            letterSpacing: '8px',
            color: 'rgba(21, 34, 71, 0.25)',
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 1,
            fontFamily: "'Space Grotesk', system-ui, sans-serif"
          }}
        >
          AMENITIES
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: CATEGORY FILTER PILLS & AMENITIES GRID
      ════════════════════════════════════════════════════════════ */}
      <div id="amenities-grid-section" style={{ maxWidth: '1320px', margin: '48px auto 0 auto', padding: '0 32px' }}>
        {/* 4 Category Filter Pills */}
        <ScrollAnimateSection>
          <div className="pastel-filter-container" style={{ margin: '0 auto 36px auto', display: 'flex', justifyContent: 'center' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pastel-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollAnimateSection>

        {/* Grouped Category Sections Displaying Section Difference */}
        <div className="pastel-sections-container">
          {displayedCategories.map((catSection, sectionIdx) => (
            <ScrollAnimateSection key={catSection.category} delay={sectionIdx * 100}>
              <div className="pastel-section-block" style={{ marginBottom: '56px' }}>
                {/* Section Header */}
                <div className="pastel-section-header-banner" style={{ marginBottom: '24px' }}>
                  <h3 className="pastel-section-title" style={{ fontSize: '24px', fontWeight: 800, color: '#152247', margin: 0, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    {catSection.category}
                  </h3>
                </div>

                {/* Grid of Amenity Cards for this Section */}
                <div className="pastel-amenities-grid">
                  {catSection.items.map((amenity, index) => (
                    <ScrollAnimateSection key={amenity.id} delay={index * 40}>
                      <div className="pastel-card-item amenity-card-hover" style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid #E2E8F0', background: '#ffffff', boxShadow: '0 6px 20px rgba(21, 34, 71, 0.04)' }}>
                        {/* Full-bleed Photo Wrapper */}
                        <div className="pastel-card-img-wrapper" style={{ height: '220px', overflow: 'hidden' }}>
                          <img
                            src={amenity.image}
                            alt={amenity.name}
                            className="pastel-card-img-element"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                          />
                        </div>

                        {/* Bottom Content Panel */}
                        <div className="pastel-card-details-panel" style={{ padding: '18px 20px' }}>
                          <h4 className="pastel-card-name" style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
                            {amenity.name}
                          </h4>
                          <p className="pastel-card-description-text" style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                            {amenity.desc || 'Included luxury amenity for residents & guests at RJ\'s Larom Residences.'}
                          </p>
                        </div>
                      </div>
                    </ScrollAnimateSection>
                  ))}
                </div>
              </div>
            </ScrollAnimateSection>
          ))}
        </div>

        {/* Footer Callout Highlights Box */}
        <ScrollAnimateSection delay={200}>
          <div style={{ background: '#152247', color: '#ffffff', padding: '48px 44px', borderRadius: '24px', textAlign: 'center', maxWidth: '960px', margin: '40px auto 0', boxShadow: '0 20px 50px rgba(21, 34, 71, 0.2)' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '12px', color: '#ffffff', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
              Everything You Need, All in One Place
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', maxWidth: '650px', margin: '0 auto 28px', lineHeight: '1.6' }}>
              From 20 active commercial kiosks driving retail income to rooftop pool relaxation and round-the-clock housekeeping.
            </p>
            <button
              className="hero-btn"
              onClick={() => onNavigate('book-now')}
              style={{ background: '#ffffff', color: '#152247', padding: '14px 36px', borderRadius: '999px', fontWeight: 800, fontSize: '14px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s ease' }}
            >
              Book Your Unit Today ↗
            </button>
          </div>
        </ScrollAnimateSection>
      </div>
    </div>
  );
};

export default AmenitiesPage;
