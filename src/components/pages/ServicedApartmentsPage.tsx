import React, { useState, useEffect, useRef } from 'react';
import type { Property } from '../../types/index';

interface ServicedApartmentsPageProps {
  onSelectProperty?: (prop: Property) => void;
  onNavigate?: (tabId: string) => void;
}


// ─── 5 Curated Rooms with Dual Flip Images & Specifications ───
interface CuratedRoom {
  id: string;
  tag: string;
  title: string;
  description: string;
  image1: string;
  image2: string;
  label1: string;
  label2: string;
  specs: string[];
}

const CURATED_ROOMS: CuratedRoom[] = [
  {
    id: 'bedroom',
    tag: '380 – 650 SQ. FT. • PRIVATE MASTER SUITE',
    title: 'MASTER BEDROOM',
    description:
      'A serene sanctuary crafted with custom Italian timber paneling, king-sized bed with plush acoustic headboard, concealed cove mood lighting, custom built-in wardrobes, and acoustic double-glazed windows overlooking the skyline.',
    image1: 'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?auto=format&fit=crop&w=1200&q=80',
    image2: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    label1: 'Master King Bed Suite',
    label2: 'Sunlit Horizon View',
    specs: ['King Size Bed', 'Timber Cove Lighting', 'Custom Built-in Wardrobes', 'Acoustic Double Glazing']
  },
  {
    id: 'kitchen',
    tag: 'FULLY EQUIPPED • GERMAN APPLIANCES',
    title: 'DESIGNER KITCHEN',
    description:
      'Seamlessly integrated European induction cooktop, built-in oven and microwave, concealed dishwasher, full-size refrigerator, and Calacatta quartz countertops with bespoke Italian soft-close cabinetry and espresso breakfast bar.',
    image1: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80',
    image2: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    label1: 'Italian Cabinetry & Quartz Bar',
    label2: 'Integrated European Appliances',
    specs: ['Induction Cooktop', 'Calacatta Quartz Island', 'Concealed Dishwasher', 'Built-in Microwave']
  },
  {
    id: 'living',
    tag: 'OPEN-CONCEPT • PANORAMIC CITY VIEWS',
    title: 'LIVING ROOM LOUNGE',
    description:
      'Designed for effortless executive hosting and relaxation. Features plush Italian modular sectional seating, 55-inch 4K Smart TV, architectural accent lighting, and expansive glass sliding doors leading directly to your private sky terrace.',
    image1: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    image2: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    label1: 'Daylight Lounge & Terrace',
    label2: 'Evening Entertainment Setup',
    specs: ['Italian Modular Sofa', '55" 4K Smart TV', 'Direct Balcony Access', 'Architectural Lighting']
  },
  {
    id: 'dining',
    tag: 'BESPOKE HOSPITALITY • IN-ROOM DINING',
    title: 'DINING ROOM',
    description:
      'An intimate setting for private dining or entertaining guests. Complete with a custom-crafted quartz dining table, designer upholstered chairs, modern linear pendant chandelier, and 24/7 in-suite chef and hotel room service.',
    image1: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    image2: 'https://images.unsplash.com/photo-1633505412556-82c0921e8f4a?auto=format&fit=crop&w=1200&q=80',
    label1: 'Designer Dining Ensemble',
    label2: 'Open Hospitality Layout',
    specs: ['Custom Quartz Dining Table', 'Designer Upholstered Chairs', 'Pendant Chandelier', '24/7 Room Service']
  },
  {
    id: 'washroom',
    tag: 'SPA-INSPIRED • IMPORTED MARBLE',
    title: 'LUXURY WASHROOM',
    description:
      'Immerse in luxury with floor-to-ceiling imported Calacatta porcelain tiles, a frameless tempered glass walk-in rain shower, Hansgrohe brushed brass fixtures, backlit anti-fog vanity mirror, and curated 5-star hotel bath amenities.',
    image1: 'https://images.unsplash.com/photo-1661107259637-4e1c55462428?auto=format&fit=crop&w=1200&q=80',
    image2: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    label1: 'Backlit Calacatta Vanity',
    label2: 'Walk-in Glass Rain Shower',
    specs: ['Walk-in Rain Shower', 'Backlit Anti-Fog Vanity', 'Hansgrohe Brushed Brass', 'Calacatta Marble']
  }
];

const CuratedRoomItem: React.FC<{ room: CuratedRoom; index: number }> = ({ room, index }) => {
  const [isInView, setIsInView] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current) return;

    // Trigger immediately if already visible in viewport on mount
    const rect = rowRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (rowRef.current) {
            observer.unobserve(rowRef.current);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(rowRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className={`editorial-room-row ${isInView ? 'in-view' : ''}`}
    >
      {/* Left Side: Editorial Typography (slides in from left to right) */}
      <div className="editorial-room-text-col">
        <h3 className="editorial-room-title">
          {room.title}
        </h3>
        <p className="editorial-room-desc">
          {room.description}
        </p>
      </div>

      {/* Right Side: Overlapping Photo Collage (Continuous foreground/background swap animation) */}
      <div className="editorial-room-collage-col" title="Hover to pause animation">
        {/* Landscape Image */}
        <div className={`collage-img-landscape collage-delay-${index % 5}`}>
          <img
            src={room.image1}
            alt={`${room.title} - Overview`}
          />
        </div>

        {/* Portrait Image */}
        <div className={`collage-img-portrait collage-delay-${index % 5}`}>
          <img
            src={room.image2}
            alt={`${room.title} - Detail`}
          />
        </div>
      </div>
    </div>
  );
};

const BannerAccommodationsCard: React.FC<{ onNavigate?: (tabId: string) => void }> = ({ onNavigate }) => {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`accommodations-banner-card ${isInView ? 'in-view' : ''}`}
      onClick={() => onNavigate?.('book-now')}
    >
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85"
        alt="1 and 2-Bedroom Serviced Apartments"
        className="accommodations-banner-bg"
      />
      <div className="accommodations-banner-overlay" />
      <div className="accommodations-banner-content">
        <div className="accommodations-banner-subtitle">
          Stay With RJ's Larom
        </div>
        <h3 className="accommodations-banner-title">
          1 & 2-BEDROOM APARTMENTS
        </h3>
        <p className="accommodations-banner-desc">
          Thoughtfully curated serviced residences blending five-star hotel hospitality with the comforts of private luxury living, private sky balconies, and custom Italian finishes.
        </p>
        <button
          className="home-curtain-btn"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate?.('book-now');
          }}
          style={{
            background: '#152247',
            color: '#ffffff',
            padding: '16px 44px',
            borderRadius: '0px',
            fontSize: '15px',
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 12px 32px rgba(21, 34, 71, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            letterSpacing: '0.5px'
          }}
        >
          Learn More →
        </button>
      </div>
    </div>
  );
};

export const ServicedApartmentsPage: React.FC<ServicedApartmentsPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ background: '#ffffff', color: '#152247', minHeight: '100vh', paddingBottom: '80px', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500;1,600&family=Space+Grotesk:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes floatWatermark {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-15px);
          }
        }

        .float-apartments-text {
          animation: floatWatermark 5s ease-in-out infinite;
        }

        /* ─── Editorial Room Cards (Maui Beach Hotel Style) ─── */
        .editorial-room-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 110px;
          gap: 48px;
        }

        /* Text Column: bring text smoothly from left to right */
        .editorial-room-text-col {
          width: 42%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 2;
        }

        .editorial-room-title {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: clamp(28px, 3.4vw, 42px);
          font-weight: 800;
          color: #152247;
          line-height: 1.15;
          margin: 0 0 18px 0;
          letter-spacing: -0.5px;
          text-transform: uppercase;
          opacity: 0;
          transform: translateX(-60px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }

        .editorial-room-desc {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 14.5px;
          color: #475569;
          line-height: 1.75;
          margin: 0;
          max-width: 440px;
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.16s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.16s;
          will-change: transform, opacity;
        }

        /* In-View: Bring text from left to right */
        .editorial-room-row.in-view .editorial-room-title,
        .editorial-room-row.in-view .editorial-room-desc {
          opacity: 1;
          transform: translateX(0);
        }

        /* Overlapping Collage: Landscape lower-left, Portrait upper-right with entrance animations */
        /* ─── Continuous Foreground/Background Swap Animation ─── */
        @keyframes swapLandscapeToForeground {
          0%, 42% {
            /* Background State */
            z-index: 1;
            transform: scale(0.97) translate3d(0, 0, 0);
            filter: brightness(0.9);
            box-shadow: 0 10px 25px rgba(21, 34, 71, 0.12);
          }
          48% {
            /* Stepping forward / elevating */
            z-index: 4;
            transform: scale(1.05) translate3d(-18px, -12px, 50px);
            filter: brightness(0.98);
            box-shadow: 0 22px 48px rgba(21, 34, 71, 0.28);
          }
          54%, 92% {
            /* Foreground State (overlaps portrait on the right) */
            z-index: 3;
            transform: scale(1.03) translate3d(12px, -8px, 25px);
            filter: brightness(1);
            box-shadow: 0 24px 50px rgba(21, 34, 71, 0.32);
          }
          98% {
            /* Stepping back */
            z-index: 2;
            transform: scale(0.99) translate3d(-8px, 6px, -10px);
            filter: brightness(0.93);
            box-shadow: 0 12px 30px rgba(21, 34, 71, 0.15);
          }
          100% {
            z-index: 1;
            transform: scale(0.97) translate3d(0, 0, 0);
            filter: brightness(0.9);
            box-shadow: 0 10px 25px rgba(21, 34, 71, 0.12);
          }
        }

        @keyframes swapPortraitToForeground {
          0%, 42% {
            /* Foreground State (overlaps landscape on the left) */
            z-index: 3;
            transform: scale(1.02) translate3d(0, 0, 25px);
            filter: brightness(1);
            box-shadow: -10px 20px 48px rgba(21, 34, 71, 0.28);
          }
          48% {
            /* Stepping back */
            z-index: 2;
            transform: scale(0.98) translate3d(16px, 12px, -10px);
            filter: brightness(0.93);
            box-shadow: -6px 12px 25px rgba(21, 34, 71, 0.15);
          }
          54%, 92% {
            /* Background State */
            z-index: 1;
            transform: scale(0.96) translate3d(-10px, 8px, 0);
            filter: brightness(0.9);
            box-shadow: -6px 10px 22px rgba(21, 34, 71, 0.12);
          }
          98% {
            /* Stepping forward / elevating */
            z-index: 4;
            transform: scale(1.05) translate3d(16px, -12px, 50px);
            filter: brightness(0.98);
            box-shadow: -12px 24px 50px rgba(21, 34, 71, 0.3);
          }
          100% {
            z-index: 3;
            transform: scale(1.02) translate3d(0, 0, 25px);
            filter: brightness(1);
            box-shadow: -10px 20px 48px rgba(21, 34, 71, 0.28);
          }
        }

        .editorial-room-collage-col {
          width: 55%;
          height: 420px;
          position: relative;
          display: flex;
          align-items: center;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .collage-img-landscape {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 70%;
          height: 310px;
          overflow: hidden;
          border-radius: 4px;
          box-shadow: 0 12px 35px rgba(21, 34, 71, 0.12);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.8s ease;
          will-change: transform, z-index, box-shadow, filter;
        }

        .collage-img-portrait {
          position: absolute;
          right: 0;
          top: 0;
          width: 48%;
          height: 380px;
          overflow: hidden;
          border-radius: 4px;
          box-shadow: -8px 16px 40px rgba(21, 34, 71, 0.18);
          z-index: 2;
          opacity: 0;
          transition: opacity 0.8s ease;
          will-change: transform, z-index, box-shadow, filter;
        }

        /* In-View: Continuously cycle one image to foreground, other to background */
        .editorial-room-row.in-view .collage-img-landscape {
          opacity: 1;
          animation: swapLandscapeToForeground 7.5s cubic-bezier(0.45, 0, 0.25, 1) infinite;
        }

        .editorial-room-row.in-view .collage-img-portrait {
          opacity: 1;
          animation: swapPortraitToForeground 7.5s cubic-bezier(0.45, 0, 0.25, 1) infinite;
        }

        /* Staggered cycle start per card */
        .collage-delay-0 { animation-delay: 0s !important; }
        .collage-delay-1 { animation-delay: 1.5s !important; }
        .collage-delay-2 { animation-delay: 3s !important; }
        .collage-delay-3 { animation-delay: 4.5s !important; }
        .collage-delay-4 { animation-delay: 6s !important; }

        /* Pause animation on hover so viewer can inspect image closely */
        .editorial-room-collage-col:hover .collage-img-landscape,
        .editorial-room-collage-col:hover .collage-img-portrait {
          animation-play-state: paused;
        }

        .collage-img-landscape img,
        .collage-img-portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .editorial-room-collage-col:hover img {
          transform: scale(1.03);
        }

        @media (max-width: 960px) {
          .editorial-room-row {
            flex-direction: column;
            margin-bottom: 70px;
            gap: 28px;
          }
          .editorial-room-text-col {
            width: 100%;
          }
          .editorial-room-collage-col {
            width: 100%;
            height: 340px;
          }
          .collage-img-landscape {
            width: 72%;
            height: 250px;
          }
          .collage-img-portrait {
            width: 50%;
            height: 300px;
          }
        }

        /* ─── 1 & 2-Bedroom Accommodations Banner (Maui Beach Hotel Style) ─── */
        .accommodations-banner-container {
          max-width: 1240px;
          margin: 90px auto 40px auto;
          padding: 0 24px;
          width: 100%;
          box-sizing: border-box;
        }

        .accommodations-banner-card {
          position: relative;
          width: 100%;
          min-height: 500px;
          overflow: hidden;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 50px rgba(15, 39, 68, 0.16);
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        .accommodations-banner-card.in-view {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .accommodations-banner-card:hover {
          box-shadow: 0 26px 60px rgba(15, 39, 68, 0.24);
        }

        .accommodations-banner-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .accommodations-banner-card:hover .accommodations-banner-bg {
          transform: scale(1.04);
        }

        .accommodations-banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(19, 56, 79, 0.88) 0%, rgba(15, 47, 69, 0.90) 50%, rgba(10, 35, 52, 0.94) 100%);
          z-index: 2;
          transition: background 0.4s ease;
        }

        .accommodations-banner-card:hover .accommodations-banner-overlay {
          background: linear-gradient(135deg, rgba(16, 50, 72, 0.84) 0%, rgba(13, 42, 63, 0.87) 50%, rgba(8, 30, 46, 0.91) 100%);
        }

        .accommodations-banner-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 100px 36px;
          max-width: 800px;
          box-sizing: border-box;
        }

        .accommodations-banner-subtitle {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 14.5px;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        .accommodations-banner-title {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: clamp(28px, 3.8vw, 46px);
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0 0 16px 0;
          line-height: 1.15;
        }

        .accommodations-banner-desc {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 14.5px;
          color: rgba(255, 255, 255, 0.84);
          line-height: 1.7;
          max-width: 580px;
          margin: 0 0 28px 0;
        }

        @media (max-width: 960px) {
          .accommodations-banner-card {
            min-height: 400px;
          }
          .accommodations-banner-content {
            padding: 64px 24px;
          }
          .accommodations-banner-title {
            letter-spacing: 1.5px;
          }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO WATERMARK ("APARTMENTS")
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '70vh',
          background: 'linear-gradient(180deg, #99c6f4ff 0%, #6cb3f1ff 40%, #FAFBFD 100%)',
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
        <div
          className="float-apartments-text"
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(70px, 15vw, 200px)',
            fontWeight: 800,
            letterSpacing: '8px',
            color: 'rgba(15, 39, 68, 0.22)',
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 1,
            fontFamily: "'Space Grotesk', system-ui, sans-serif"
          }}
        >
          APARTMENTS
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: EDITORIAL ROOM SHOWCASE (STUDIO KITCHENETTE STYLE)
      ════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1160px', margin: '60px auto 0 auto', padding: '0 24px' }}>
        {/* Pacific Monarch Style Editorial Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 64px auto' }}>
          
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#152247', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
            Curated Living Spaces & Interior Architecture
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>
            Once you experience the views and bespoke craftsmanship of RJ's Larom, you will appreciate turnkey luxury living. Each suite features dual-aspect architectural rooms, Italian designer furniture, and round-the-clock hotel hospitality.
          </p>
        </div>

        {/* 5 Rooms Stack: Bedroom -> Kitchen -> Living Room -> Dining Room -> Washroom */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {CURATED_ROOMS.map((room, index) => (
            <CuratedRoomItem key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          ACCOMMODATIONS: 1 & 2-BEDROOM APARTMENTS BANNER (MAUI BEACH HOTEL STYLE)
      ════════════════════════════════════════════════════════════ */}
      <div className="accommodations-banner-container">
        <BannerAccommodationsCard onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default ServicedApartmentsPage;
