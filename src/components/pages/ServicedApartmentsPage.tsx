import React, { useState, useEffect, useRef } from 'react';
import { PROPERTIES } from '../../data/mockData';
import type { Property } from '../../types/index';
import { ONE_BEDROOM_FALLBACK, TWO_BEDROOM_FALLBACK } from '../../data/floorplanAssets';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { ModernPriceDisplay } from '../common/ModernPriceDisplay';

interface ServicedApartmentsPageProps {
  onSelectProperty: (property: Property) => void;
  onNavigate: (tabId: string) => void;
}

// Interactive Mockup Villa Card Component matching the user reference design
const ApartmentMockupCard: React.FC<{ item: Property; onSelect: (item: Property) => void }> = ({ item, onSelect }) => {
  const [liked, setLiked] = useState(false);

  const formattedSqft = item.bedrooms === 1 ? '625 sq.ft' : '1,140 sq.ft';
  const bathroomsCount = item.bedrooms === 1 ? 1 : 2;

  return (
    <div
      className="mockup-villa-card"
      onClick={() => onSelect(item)}
      style={{
        background: '#ffffff',
        borderRadius: '28px',
        padding: '16px',
        border: '1.5px solid #e2e8f0',
        boxShadow: '0 16px 45px rgba(15, 23, 42, 0.08)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Top Hero Image Container with Rounded Corners */}
      <div
        style={{
          position: 'relative',
          height: '250px',
          borderRadius: '20px',
          overflow: 'hidden',
          background: '#0f172a'
        }}
      >
        <img
          src={item.heroImage}
          alt={item.title}
          onError={(e) => {
            const target = e.currentTarget;
            target.src = item.bedrooms === 1 ? ONE_BEDROOM_FALLBACK : TWO_BEDROOM_FALLBACK;
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        />
        {/* Top-Left Location Badge */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            color: '#ffffff',
            padding: '6px 14px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: "'Space Grotesk', system-ui, sans-serif"
          }}
        >
          📍 {item.areaTag || 'Islamabad Expressway'}
        </div>

        {/* Top-Right Tag */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: '#0284c7',
            color: '#ffffff',
            padding: '5px 14px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.5px'
          }}
        >
          🏢 Serviced Suite
        </div>
      </div>

      {/* Title & Price Header Row */}
      <div style={{ padding: '16px 8px 8px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
          <div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 900,
                color: '#0f172a',
                margin: 0,
                lineHeight: 1.3,
                fontFamily: "'Space Grotesk', system-ui, sans-serif"
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              📍 Islamabad Expressway, Rawalpindi / Islamabad
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <ModernPriceDisplay price={item.price} size="sm" />
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', fontWeight: 600, marginTop: '2px' }}>Total Price</span>
          </div>
        </div>

        {/* Spec Badges Row (Soft rounded grey pills matching reference mockup) */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0 20px 0' }}>
          <span className="mockup-spec-pill">
            🛏️ <AnimatedNumber value={item.bedrooms} /> {item.bedrooms === 1 ? 'Bed' : 'Beds'}
          </span>
          <span className="mockup-spec-pill">
            🛁 <AnimatedNumber value={bathroomsCount} /> {bathroomsCount === 1 ? 'Bathroom' : 'Bathrooms'}
          </span>
          <span className="mockup-spec-pill">
            📐 <AnimatedNumber value={item.squareMeters} /> m² ({formattedSqft})
          </span>
          <span className="mockup-spec-pill">
            🅿️ Car Parking
          </span>
          <span className="mockup-spec-pill" style={{ background: '#e0f2fe', color: '#0369a1', borderColor: 'rgba(2, 132, 199, 0.3)' }}>
            🔑 <AnimatedNumber value={item.downPaymentPercent} />% Down
          </span>
        </div>

        {/* Action Button Row at Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <button
            className="mockup-view-detail-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            style={{
              background: '#0f172a',
              color: '#ffffff',
              padding: '13px 24px',
              borderRadius: '99px',
              fontSize: '14px',
              fontWeight: 800,
              flex: 1,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(15, 23, 42, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}
          >
            View Details
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            aria-label="Bookmark Property"
            title={liked ? "Remove from Favorites" : "Add to Favorites"}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: liked ? '#ffe4e6' : '#f8fafc',
              border: liked ? '1.5px solid #f43f5e' : '1.5px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: liked ? '#e11d48' : '#64748b'
            }}
          >
            {liked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ServicedApartmentsPage: React.FC<ServicedApartmentsPageProps> = ({
  onSelectProperty,
  onNavigate,
}) => {
  const servicedUnits = PROPERTIES.filter((p) => p.propertyType === 'Apartment');
  const [matrixVisible, setMatrixVisible] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const matrixSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMatrixVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (matrixSectionRef.current) {
      observer.observe(matrixSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="serviced-apartments-page animate-fade-in" style={{ padding: '120px 48px 60px 48px', background: '#f8f9fa' }}>
      <div className="section-header-centered" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
        <span className="section-subtitle-pill" style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>
          PAKISTAN'S FIRST BRANDED RESIDENCES
        </span>
        <h2 className="section-main-title" style={{ fontSize: '36px', marginTop: '12px', color: '#0f172a' }}>
          Serviced Apartments & Luxury Units
        </h2>
        <p className="section-description" style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginTop: '8px' }}>
          Hotel-standard housekeeping, 24/7 concierge, and professional property management included. Enjoy completely hands-off ownership with 6–7% high rental yields.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="info-card floating-card-hover" style={{ background: '#ffffff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <span style={{ fontSize: '32px', display: 'inline-block', marginBottom: '8px' }}>🛎️</span>
          <h3 style={{ fontSize: '18px', margin: '8px 0 6px', color: '#0f172a' }}>Hotel-Standard Living</h3>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>Concierge, housekeeping, and room service included for all <AnimatedNumber value={78} /> serviced apartments.</p>
        </div>
        <div className="info-card floating-card-hover" style={{ background: '#ffffff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <span style={{ fontSize: '32px', display: 'inline-block', marginBottom: '8px' }}>💼</span>
          <h3 style={{ fontSize: '18px', margin: '8px 0 6px', color: '#0f172a' }}>Hands-Off Management</h3>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>Ideal for overseas Pakistani investors seeking hassle-free rental collection and maintenance.</p>
        </div>
        <div className="info-card floating-card-hover" style={{ background: '#ffffff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <span style={{ fontSize: '32px', display: 'inline-block', marginBottom: '8px' }}>📈</span>
          <h3 style={{ fontSize: '18px', margin: '8px 0 6px', color: '#0f172a' }}><AnimatedNumber value={6} />–<AnimatedNumber value={7} />% Rental Yields</h3>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>Islamabad leads Pakistan with <AnimatedNumber value={6.75} decimals={2} suffix="%" /> gross yields and <AnimatedNumber value={10} suffix="%" /> annual rental escalation.</p>
        </div>
      </div>

      {/* Available Serviced Units Cards Rendered with Mockup Design */}
      <h3 style={{ fontSize: '24px', marginBottom: '24px', color: '#0f172a', fontWeight: 900, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Available Serviced Units</h3>
      <div className="project-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', marginBottom: '60px' }}>
        {servicedUnits.map((item) => (
          <ApartmentMockupCard key={item.id} item={item} onSelect={onSelectProperty} />
        ))}
      </div>

      {/* BEAUTIFUL DECENT BRANDED VS NON-BRANDED DIFFERENCE TABLE */}
      <div ref={matrixSectionRef} className="decent-table-section" style={{ marginBottom: '60px' }}>
        <div className="section-header-centered" style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 36px' }}>
          <span className="section-subtitle-pill" style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0369a1', padding: '4px 14px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
            💎 COMPREHENSIVE COMPARISON MATRIX
          </span>
          <h2 style={{ fontSize: '32px', marginTop: '10px', color: '#0f172a', fontWeight: 900 }}>
            Difference Between Branded & Non-Branded Residency
          </h2>
        </div>

        {/* Table Container Card with Smooth Scroll Entrance Animation */}
        <div
          className={`difference-table-card ${matrixVisible ? 'stagger-active' : ''}`}
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '1.5px solid rgba(2, 132, 199, 0.25)',
            boxShadow: matrixVisible ? '0 24px 60px rgba(15, 23, 42, 0.12)' : '0 10px 30px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            maxWidth: '1000px',
            margin: '0 auto',
            opacity: matrixVisible ? 1 : 0,
            transform: matrixVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.97)',
            filter: matrixVisible ? 'blur(0)' : 'blur(4px)',
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Column Header Titles */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderBottom: '2px solid #e2e8f0'
            }}
          >
            {/* Left Column Header: Branded Residency (Luxury Sapphire & Midnight Gradient Concept) */}
            <div
              style={{
                padding: '28px 32px',
                background: 'linear-gradient(135deg, #0f172a 0%, #0369a1 100%)',
                color: '#ffffff',
                borderRight: '1px solid rgba(255, 255, 255, 0.15)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ background: 'rgba(56, 189, 248, 0.25)', color: '#38bdf8', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  💎 5-STAR LUXURY SPECIFICATION
                </span>
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff', margin: '4px 0 4px 0', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                Branded Residency
              </h3>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.5px' }}>
                RJ's Larom Residences by Continent Hotels
              </span>
            </div>

            {/* Right Column Header: Non-Branded Residency (Muted Standard Slate) */}
            <div style={{ padding: '28px 32px', background: '#f1f5f9' }}>
              <span style={{ background: '#94a3b8', color: '#ffffff', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px' }}>
                🏢 TRADITIONAL APARTMENT
              </span>
              <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#475569', margin: '8px 0 4px 0', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                Non-Branded Residency
              </h3>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Standard Individual Apartments</span>
            </div>
          </div>

          {/* Table Data Rows with Staggered Entrance Animation */}
          <div>
            {[
              {
                branded: 'Fully furnished (furniture, appliances, cutlery, linens, décor)',
                nonBranded: 'Unfurnished'
              },
              {
                branded: 'International standard amenities (housekeeping, concierge, laundry, room service)',
                nonBranded: 'Not available'
              },
              {
                branded: 'Flexible stay options (daily, weekly, monthly, yearly)',
                nonBranded: 'Long-term stay only'
              },
              {
                branded: 'Indoor games with world\'s best 33 amenities.',
                nonBranded: 'Not available'
              },
              {
                branded: 'RFID security system to operate the lift and apartment.',
                nonBranded: 'Ordinary lift scheduled'
              },
              {
                branded: '24/7 Reception for resident assistance',
                nonBranded: 'No reception concept'
              },
              {
                branded: 'Hospitality brand integrated.',
                nonBranded: 'Managed by landlords only'
              },
              {
                branded: 'Ideal for business travelers, expats, tourists, and temporary residents',
                nonBranded: 'Only for long stay'
              },
              {
                branded: 'Feel of luxury & fun.',
                nonBranded: 'Ordinary living without amenities'
              },
              {
                branded: 'Move-in ready (Live or lease)',
                nonBranded: 'Requires setup & furnishing before move-in'
              }
            ].map((row, idx) => {
              const isHovered = hoveredRow === idx;
              return (
                <div
                  key={idx}
                  className="table-row-hover-card"
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    borderBottom: '1px solid #e2e8f0',
                    opacity: matrixVisible ? 1 : 0,
                    transform: matrixVisible
                      ? (isHovered ? 'scale(1.008) translateY(-2px)' : 'translateY(0)')
                      : 'translateY(24px)',
                    transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + idx * 0.05}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + idx * 0.05}s, background 0.25s ease`,
                    boxShadow: isHovered ? '0 10px 30px rgba(2, 132, 199, 0.18)' : 'none',
                    zIndex: isHovered ? 10 : 1,
                    position: 'relative'
                  }}
                >
                  {/* Left Cell: Branded Residency (Luxury Sapphire Badge & Clean Typography - NO Sparkles) */}
                  <div
                    style={{
                      padding: '18px 28px',
                      borderRight: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      background: isHovered ? '#f0f9ff' : '#ffffff',
                      transition: 'background 0.25s ease, border-left 0.25s ease',
                      borderLeft: isHovered ? '4px solid #0284c7' : '4px solid transparent'
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
                        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 900,
                        flexShrink: 0,
                        boxShadow: '0 3px 8px rgba(2, 132, 199, 0.35)',
                        marginTop: '1px'
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ color: isHovered ? '#0369a1' : '#0f172a', fontSize: '14px', lineHeight: '1.5', fontWeight: isHovered ? 700 : 600 }}>{row.branded}</span>
                  </div>

                  {/* Right Cell: Non-Branded Residency (Muted Slate) */}
                  <div
                    style={{
                      padding: '18px 28px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      background: isHovered ? '#f1f5f9' : '#f8fafc',
                      transition: 'background 0.25s ease'
                    }}
                  >
                    <span style={{ fontSize: '14px', color: '#94a3b8', marginTop: '2px', fontWeight: 700 }}>✕</span>
                    <span style={{ color: isHovered ? '#475569' : '#64748b', fontSize: '14px', lineHeight: '1.5', fontWeight: 500 }}>{row.nonBranded}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <button
          className="hero-btn"
          onClick={() => onNavigate('book-now')}
          style={{ background: '#0f172a', color: '#ffffff', padding: '14px 36px', borderRadius: '99px', fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(15,23,42,0.2)' }}
        >
          Book Your Branded Serviced Apartment Now →
        </button>
      </div>
    </div>
  );
};
