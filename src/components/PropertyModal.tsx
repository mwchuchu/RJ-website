import React, { useState } from 'react';
import type { Property } from '../types/index';
import { ALL_AMENITIES } from '../data/mockData';
import { AnimatedNumber } from './common/AnimatedNumber';
import { ModernPriceDisplay } from './common/ModernPriceDisplay';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  const [activeTab, setActiveTab] = useState<'01' | '02' | '03' | '04' | '05' | '06'>('01');

  if (!property) return null;

  const tabs = [
    {
      id: '01',
      label: 'General Info',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
    },
    {
      id: '03',
      label: 'Characteristics',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      id: '04',
      label: 'Exterior',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      )
    },
    {
      id: '05',
      label: 'Interior',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: '06',
      label: 'Layout',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    }
  ];

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="modal-container modal-animated-spring" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Bar */}
        <div className="modal-top-bar">
          <div className="modal-meta-left">
            <span className="modal-num">{property.number}</span>
            <span className="modal-location">{property.location}</span>
            <span className="modal-type-tag">{property.propertyType}</span>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Modal Main Body Content depends on activeTab */}
        <div className="modal-body">
          {/* TAB 01: General Info */}
          {activeTab === '01' && (
            <div className="tab-general-info animate-fade-in">
              <div className="info-left-pane">
                <div className="developer-tag">
                  <span>Developer:</span>
                  <strong>{property.developer}</strong>
                </div>

                <h2 className="modal-title">{property.title}</h2>

                <div className="specs-row">
                  <div className="spec-box">
                    <span className="spec-label">Area</span>
                    <strong className="spec-val"><AnimatedNumber value={property.squareMeters} />m²</strong>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">Number of rooms</span>
                    <strong className="spec-val"><AnimatedNumber value={property.bedrooms} /></strong>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">When booking</span>
                    <strong className="spec-val"><AnimatedNumber value={property.downPaymentPercent} />%</strong>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">Delivery Date</span>
                    <strong className="spec-val">{property.deliveryDate}</strong>
                  </div>
                </div>

                <ModernPriceDisplay price={property.price} downPaymentPercent={property.downPaymentPercent} size="lg" />
              </div>

              <div className="info-right-pane">
                <img
                  src={property.heroImage}
                  alt={property.title}
                  className="modal-hero-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
            </div>
          )}

          {/* TAB 03: Characteristics */}
          {activeTab === '03' && (
            <div className="tab-characteristics animate-fade-in">
              <div className="characteristics-header" style={{ marginBottom: '20px' }}>
                <h3 className="section-sub-title" style={{ fontSize: '22px', fontWeight: 800, color: '#152247' }}>
                  Property Amenities & Characteristics
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  Comprehensive luxury facilities included with {property.title}
                </p>
              </div>

              <div className="animated-amenities-card-grid">
                {ALL_AMENITIES.map((amenity, index) => {
                  const isIncluded = property.amenities.includes(amenity.name);
                  return (
                    <div
                      key={amenity.id}
                      className="animated-amenity-card"
                      style={{ animationDelay: `${index * 0.04}s` }}
                    >
                      {amenity.icon ? <span className="amenity-card-icon">{amenity.icon}</span> : null}
                      <span className="amenity-card-name">{amenity.name}</span>
                      {isIncluded && <span className="amenity-card-check">✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 04: Exterior */}
          {activeTab === '04' && (
            <div className="tab-gallery animate-fade-in">
              <div className="gallery-header">
                <h3>Exterior & Amenities Gallery</h3>
                <span className="gallery-count-badge">{property.exteriorGallery.length} Photos Exterior</span>
              </div>
              <div className="gallery-grid">
                {property.exteriorGallery.map((imgUrl, idx) => {
                  const exteriorLabels = ['LUXURY HALLWAY', 'BASEMENT PARKING', 'FITNESS GYM'];
                  const fallbacks = [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
                  ];
                  return (
                    <div key={idx} className="gallery-card">
                      <img
                        src={imgUrl}
                        alt={exteriorLabels[idx] || `Exterior ${idx + 1}`}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = fallbacks[idx] || fallbacks[0];
                        }}
                      />
                      <div className="room-type-badge" style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', color: '#ffffff', padding: '5px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, border: '1px solid rgba(212, 175, 55, 0.4)', zIndex: 2 }}>
                        {exteriorLabels[idx] || `Exterior ${idx + 1}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 05: Interior */}
          {activeTab === '05' && (
            <div className="tab-gallery animate-fade-in">
              <div className="gallery-header">
                <h3>Interior Gallery</h3>
                <span className="gallery-count-badge">{property.interiorGallery.length} Photos Interior</span>
              </div>
              <div className="gallery-grid">
                {property.interiorGallery.map((imgUrl, idx) => {
                  const roomLabels = property.interiorGallery.length === 4
                    ? ['LIVING ROOM', 'MASTER BEDROOM (BED 1)', 'EXECUTIVE BEDROOM (BED 2)', 'LUXURY WASHROOM']
                    : ['LIVING ROOM', 'MASTER BEDROOM', 'LUXURY WASHROOM'];
                  const fallbacks = [
                    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1540518614846-7ede433c5163?auto=format&fit=crop&w=1200&q=80',
                    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
                  ];
                  return (
                    <div key={idx} className="gallery-card">
                      <img
                        src={imgUrl}
                        alt={roomLabels[idx] || `Interior ${idx + 1}`}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = fallbacks[idx] || fallbacks[0];
                        }}
                      />
                      <div className="room-type-badge" style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', color: '#ffffff', padding: '5px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, border: '1px solid rgba(212, 175, 55, 0.4)', zIndex: 2 }}>
                        {roomLabels[idx] || `Interior ${idx + 1}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 06: Layout */}
          {activeTab === '06' && (
            <div className="tab-layout-modern animate-fade-in">
              <div className="layout-left-pane-modern">
                <div className="layout-badge-row">
                  <span className="layout-badge-pill">3D FLOORPLAN</span>
                  <span className="layout-area-badge">Total Area: <strong>{property.layoutSpecs.totalArea}</strong></span>
                </div>

                <h2 className="modern-layout-heading">
                  {property.bedrooms > 0 ? `${property.bedrooms}-Bedroom` : 'Commercial'} Executive Serviced Layout
                </h2>

                <p className="modern-layout-desc">
                  Detailed 3D axonometric layout featuring top-down architectural perspective, custom space arrangement, European fixtures, marble kitchen counter, and private balcony view.
                </p>

                <div className="modern-specs-grid">
                  <div className="modern-spec-card">
                    <div className="spec-card-info">
                      <span className="spec-card-label">Bedrooms</span>
                      <strong className="spec-card-val"><AnimatedNumber value={property.layoutSpecs.bedroomsCount} /> Master Suite</strong>
                    </div>
                  </div>

                  <div className="modern-spec-card">
                    <div className="spec-card-info">
                      <span className="spec-card-label">Bathrooms</span>
                      <strong className="spec-card-val"><AnimatedNumber value={property.layoutSpecs.bathroomsCount} /> Luxury Bath</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="layout-right-pane-modern">
                <div className="modern-floorplan-card">
                  <img
                    src={property.bedrooms === 1 ? '/images/1-bedroom-floorplan.png' : '/images/2-bedroom-floorplan.png'}
                    alt={`${property.title} 3D Floorplan Layout`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = property.bedrooms === 1 ? '/images/1-bedroom-floorplan.png' : '/images/2-bedroom-floorplan.png';
                    }}
                  />
                  <div className="floorplan-overlay-tag">
                    Architectural Layout Plan
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Floating Minimal Dock Navigation Bar (Matching User Reference Image) */}
        <div className="dock-nav-wrapper">
          <div className="dock-nav-container">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`dock-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  <div className="dock-icon-box">{tab.icon}</div>
                  <span className="dock-label-text">{tab.label}</span>
                  {isActive && <span className="dock-active-dot"></span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
