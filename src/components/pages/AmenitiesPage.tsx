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
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
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

  const getBadgeClass = (categoryName: string) => {
    if (categoryName.toLowerCase().includes('general')) return 'general';
    if (categoryName.toLowerCase().includes('guest')) return 'guest';
    return 'corporate';
  };

  return (
    <div className="pastel-amenities-page animate-fade-in" style={{ background: '#ffffff', color: '#152247' }}>
      {/* Header Section */}
      <ScrollAnimateSection>
        <div className="section-header-centered" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          
          <h2 className="section-main-title" style={{ fontSize: '38px', marginTop: '12px', color: '#152247', fontWeight: 900 }}>
            Amenities & Hotel Features
          </h2>
          <p className="section-description" style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', marginTop: '8px' }}>
            Explore premium resort facilities, corporate suites, and residential living services at RJ's Larom Residences.
          </p>
        </div>

        {/* 4 Category Filter Pills */}
        <div className="pastel-filter-container">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pastel-filter-btn ${activeCategory === cat ? 'active' : ''}`}
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
            <div className="pastel-section-block">
              {/* Section Header Banner with Badge Tag & Count Pill */}
              <div className="pastel-section-header-banner">
                <div className="pastel-section-title-group">
                  <h3 className="pastel-section-title">{catSection.category}</h3>
                  <span className={`pastel-section-badge-pill ${getBadgeClass(catSection.category)}`}>
                    {catSection.badge}
                  </span>
                </div>
                <span className="pastel-section-count-pill">
                  {catSection.items.length} Included Amenities
                </span>
              </div>

              {/* Grid of Amenity Cards for this Section */}
              <div className="pastel-amenities-grid">
                {catSection.items.map((amenity, index) => (
                  <ScrollAnimateSection key={amenity.id} delay={index * 40}>
                    <div className="pastel-card-item">
                      {/* Full-bleed Photo Wrapper */}
                      <div className="pastel-card-img-wrapper">
                        <img src={amenity.image} alt={amenity.name} className="pastel-card-img-element" />
                      </div>

                      {/* Bottom Content Panel with Hover Detail Reveal */}
                      <div className="pastel-card-details-panel">
                        <h4 className="pastel-card-name">{amenity.name}</h4>
                        <p className="pastel-card-description-text">
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
        <div style={{ background: '#152247', color: '#ffffff', padding: '44px', borderRadius: '0px', textAlign: 'center', maxWidth: '900px', margin: '60px auto 0', boxShadow: '0 20px 50px rgba(21, 34, 71, 0.2)' }}>
          <h3 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '12px', color: '#ffffff', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Everything You Need, All in One Place</h3>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', maxWidth: '650px', margin: '0 auto 28px', lineHeight: '1.6' }}>
            From 20 active commercial kiosks driving retail income to rooftop pool relaxation and round-the-clock housekeeping.
          </p>
          <button
            className="hero-btn"
            onClick={() => onNavigate('book-now')}
            style={{ background: '#ffffff', color: '#152247', padding: '14px 36px', borderRadius: '0px', fontWeight: 800, fontSize: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s ease' }}
          >
            Book Your Unit Today
          </button>
        </div>
      </ScrollAnimateSection>
    </div>
  );
};




