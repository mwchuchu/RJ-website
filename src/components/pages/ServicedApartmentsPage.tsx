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

// Interactive Moving Image Tray Carousel Component (Central Image Focused & Animated Loop)
const MovingImageTray: React.FC = () => {
  const trayImages = [
    {
      url: 'https://images.unsplash.com/photo-1540518614846-7ede433c5163?auto=format&fit=crop&w=1200&q=80',
      title: 'Luxury Serviced Suite Lounge'
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
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
    </div>
  );
};

// Apartment Property Card Component
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
        borderRadius: '24px',
        padding: '20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 12px 35px rgba(21, 34, 71, 0.06)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Top Hero Image */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#152247'
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
            background: 'rgba(21, 34, 71, 0.85)',
            backdropFilter: 'blur(12px)',
            color: '#ffffff',
            padding: '6px 14px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: "'Space Grotesk', system-ui, sans-serif"
          }}
        >
          Islamabad Expressway
        </div>

        {/* Top-Right Tag */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: '#152247',
            color: '#ffffff',
            padding: '5px 14px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.5px'
          }}
        >
          Serviced Suite
        </div>
      </div>

      {/* Title & Price Header Row */}
      <div style={{ padding: '16px 8px 8px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
          <div>
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 900,
                color: '#152247',
                margin: 0,
                lineHeight: 1.3,
                fontFamily: "'Space Grotesk', system-ui, sans-serif"
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0' }}>
              Islamabad Expressway, Islamabad / Rawalpindi
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <ModernPriceDisplay price={item.price} size="sm" />
            <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', fontWeight: 600, marginTop: '2px' }}>Total Price</span>
          </div>
        </div>

        {/* Spec Badges Row */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0 20px 0' }}>
          <span className="mockup-spec-pill">
            <AnimatedNumber value={item.bedrooms} /> {item.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
          </span>
          <span className="mockup-spec-pill">
            <AnimatedNumber value={bathroomsCount} /> {bathroomsCount === 1 ? 'Bathroom' : 'Bathrooms'}
          </span>
          <span className="mockup-spec-pill">
            <AnimatedNumber value={item.squareMeters} /> m² ({formattedSqft})
          </span>
          <span className="mockup-spec-pill">
            Car Parking
          </span>
          <span className="mockup-spec-pill" style={{ background: '#edf2fc', color: '#152247', borderColor: 'rgba(21, 34, 71, 0.2)' }}>
            <AnimatedNumber value={item.downPaymentPercent} />% Down Payment
          </span>
        </div>

        {/* Action Button Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <button
            className="mockup-view-detail-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            style={{
              background: '#152247',
              color: '#ffffff',
              padding: '13px 24px',
              borderRadius: '99px',
              fontSize: '14px',
              fontWeight: 800,
              flex: 1,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(21, 34, 71, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}
          >
            View Details →
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
            marginBottom: '96px'
          }}
        >
          {/* Left Column: Vision Title */}
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

          {/* Right Column: Paragraph Description */}
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

            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '15px',
                color: '#64748b',
                lineHeight: '1.7',
                margin: 0
              }}
            >
              Rooted in the principles of warm minimalism and quiet luxury, our approach is about creating interiors that feel timeless, grounded, and luminous — spaces that breathe with life, managed 24/7 by Continent Hotels International.
            </p>
          </div>
        </div>

        {/* 4. APARTMENT SUITES SHOWCASE SECTION (1-Bed & 2-Bed Apartments) */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#152247', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
                AVAILABLE INVENTORY
              </div>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#152247',
                  margin: 0,
                  fontFamily: "'Space Grotesk', system-ui, sans-serif"
                }}
              >
                1 & 2 Bedroom Serviced Suites
              </h2>
            </div>
          </div>

          {/* Grid of Property Cards */}
          <div
            className="project-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: '36px'
            }}
          >
            {servicedUnits.map((item) => (
              <ApartmentMockupCard key={item.id} item={item} onSelect={onSelectProperty} />
            ))}
          </div>
        </div>

        {/* 5. BRANDED VS NON-BRANDED DIFFERENCE MATRIX */}
        <div ref={matrixSectionRef} className="decent-table-section">
          <div className="section-header-centered" style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 36px' }}>
            <span style={{ background: '#edf2fc', color: '#152247', padding: '6px 16px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              COMPREHENSIVE COMPARISON MATRIX
            </span>
            <h2 style={{ fontSize: '32px', marginTop: '14px', color: '#152247', fontWeight: 900 }}>
              Difference Between Branded & Non-Branded Residency
            </h2>
          </div>

          <div
            className={`difference-table-card ${matrixVisible ? 'stagger-active' : ''}`}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 50px rgba(21, 34, 71, 0.08)',
              overflow: 'hidden',
              maxWidth: '1000px',
              margin: '0 auto',
              opacity: matrixVisible ? 1 : 0,
              transform: matrixVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '2px solid #e2e8f0' }}>
              <div style={{ padding: '28px 32px', background: '#152247', color: '#ffffff' }}>
                <span style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1px' }}>
                  5-STAR LUXURY SPECIFICATION
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', margin: '8px 0 4px 0', fontFamily: "'Space Grotesk', system-ui" }}>
                  Branded Residency
                </h3>
                <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                  RJ's Larom Residences by Continent Hotels
                </span>
              </div>

              <div style={{ padding: '28px 32px', background: '#f8fafc' }}>
                <span style={{ background: '#94a3b8', color: '#ffffff', padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px' }}>
                  TRADITIONAL APARTMENT
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#475569', margin: '8px 0 4px 0', fontFamily: "'Space Grotesk', system-ui" }}>
                  Non-Branded Residency
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Standard Individual Apartments</span>
              </div>
            </div>

            {/* Table Rows */}
            <div>
              {[
                {
                  branded: 'Fully furnished (furniture, appliances, cutlery, linens, décor)',
                  nonBranded: 'Unfurnished or basic fittings only'
                },
                {
                  branded: 'Managed by 5-star Continent Hotels International',
                  nonBranded: 'Self-managed or local caretaker'
                },
                {
                  branded: '24/7 Room service, housekeeping, laundry & valet parking',
                  nonBranded: 'No hotel services or room dining'
                },
                {
                  branded: 'Guaranteed 6–7% annual rental yield with overseas care',
                  nonBranded: 'Fluctuating rental returns & tenant hassle'
                },
                {
                  branded: '33+ World-class resort amenities & TechnoGym fitness center',
                  nonBranded: 'Basic building maintenance & limited facilities'
                }
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    borderBottom: idx === 4 ? 'none' : '1px solid #f1f5f9',
                    background: idx % 2 === 0 ? '#ffffff' : '#fafcfd'
                  }}
                >
                  <div style={{ padding: '18px 32px', fontSize: '14px', fontWeight: 700, color: '#152247', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#152247', fontWeight: 900 }}>✓</span> {row.branded}
                  </div>
                  <div style={{ padding: '18px 32px', fontSize: '14px', color: '#64748b', borderLeft: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#94a3b8' }}>•</span> {row.nonBranded}
                  </div>
                </div>
              ))}
            </div>
          </div>
        {/* Bottom Booking CTA Banner */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <button
            onClick={() => onNavigate('book-now')}
            style={{
              background: '#152247',
              color: '#ffffff',
              padding: '16px 44px',
              borderRadius: '99px',
              fontSize: '15px',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(21, 34, 71, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            Reserve Your Serviced Residence →
          </button>
        </div>

      </div>
    </div>
  );
};
