import React from 'react';

export const Footer: React.FC = () => {
  const ribbonPartners = [
    {
      name: 'Booking.com',
      url: 'https://www.booking.com',
      svg: (
        <svg viewBox="0 0 170 36" height="30">
          <text x="0" y="26" fontSize="24" fontWeight="900" fill="#ffffff" fontFamily="system-ui, sans-serif" letterSpacing="-0.5">Booking<tspan fill="#009fe3">.com</tspan></text>
        </svg>
      )
    },
    {
      name: 'Airbnb',
      url: 'https://www.airbnb.com',
      svg: (
        <svg viewBox="0 0 50 48" height="42">
          {/* Coral Bélo Emblem Icon */}
          <path d="M25 3C20.5 3 16.5 7.2 16.5 12.5C16.5 19.5 25 30 25 30C25 30 33.5 19.5 33.5 12.5C33.5 7.2 29.5 3 25 3ZM25 16C23 16 21.5 14.5 21.5 12.5C21.5 10.5 23 9 25 9C27 9 28.5 10.5 28.5 12.5C28.5 14.5 27 16 25 16Z" stroke="#FF5A5F" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="25" y="44" fontSize="11" fontWeight="800" fill="#ffffff" textAnchor="middle" fontFamily="system-ui, sans-serif">airbnb</text>
        </svg>
      )
    },
    {
      name: 'Tripadvisor',
      url: 'https://www.tripadvisor.com',
      svg: (
        <svg viewBox="0 0 90 48" height="42">
          {/* Owl Glasses Emblem Icon */}
          <g transform="translate(25, 0)">
            <path d="M4 14C4 6 12 2 20 2C28 2 36 6 36 14" stroke="#ffffff" strokeWidth="2.5" fill="none" />
            <circle cx="12" cy="14" r="7.5" stroke="#ffffff" strokeWidth="2.5" fill="#08090b" />
            <circle cx="12" cy="14" r="3" fill="#00af87" />
            <circle cx="28" cy="14" r="7.5" stroke="#ffffff" strokeWidth="2.5" fill="#08090b" />
            <circle cx="28" cy="14" r="3" fill="#ff2b55" />
            <polygon points="18,15 22,15 20,19" fill="#ffffff" />
          </g>
          <text x="45" y="44" fontSize="12" fontWeight="800" fill="#ffffff" textAnchor="middle" fontFamily="system-ui, sans-serif">trip<tspan fill="#00af87">advisor</tspan></text>
        </svg>
      )
    },
    {
      name: 'Agoda Booking Holdings',
      url: 'https://www.agoda.com',
      svg: (
        <svg viewBox="0 0 175 42" height="36">
          <rect x="0" y="0" width="175" height="42" rx="6" fill="#007e8a" />
          {/* Agoda Text & Colored Dots */}
          <text x="10" y="22" fontSize="13" fontWeight="900" fill="#ffffff" fontFamily="system-ui">agoda</text>
          <circle cx="12" cy="29" r="1.8" fill="#ff253a" />
          <circle cx="18" cy="29" r="1.8" fill="#7d34db" />
          <circle cx="24" cy="29" r="1.8" fill="#0088ff" />
          <circle cx="30" cy="29" r="1.8" fill="#30bf60" />
          <circle cx="36" cy="29" r="1.8" fill="#ffb400" />
          {/* Divider */}
          <line x1="52" y1="8" x2="52" y2="34" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          {/* Booking Holdings */}
          <rect x="60" y="14" width="10" height="14" rx="1" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="63" y1="18" x2="67" y2="18" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="63" y1="22" x2="67" y2="22" stroke="#ffffff" strokeWidth="1.5" />
          <text x="76" y="21" fontSize="8.5" fontWeight="900" fill="#ffffff" letterSpacing="0.8" fontFamily="system-ui">BOOKING</text>
          <text x="76" y="30" fontSize="7" fontWeight="700" fill="#ffffff" letterSpacing="0.8" fontFamily="system-ui">HOLDINGS</text>
        </svg>
      )
    },
    {
      name: 'KAYAK',
      url: 'https://www.kayak.com',
      svg: (
        <svg viewBox="0 0 160 36" height="30">
          <rect x="0" y="0" width="28" height="36" rx="2" fill="#ff5000" />
          <text x="14" y="26" fontSize="19" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="Space Grotesk, system-ui">K</text>
          
          <rect x="32" y="0" width="28" height="36" rx="2" fill="#ff5000" />
          <text x="46" y="26" fontSize="19" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="Space Grotesk, system-ui">A</text>
          
          <rect x="64" y="0" width="28" height="36" rx="2" fill="#ff5000" />
          <text x="78" y="26" fontSize="19" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="Space Grotesk, system-ui">Y</text>
          
          <rect x="96" y="0" width="28" height="36" rx="2" fill="#ff5000" />
          <text x="110" y="26" fontSize="19" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="Space Grotesk, system-ui">A</text>
          
          <rect x="128" y="0" width="28" height="36" rx="2" fill="#ff5000" />
          <text x="142" y="26" fontSize="19" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="Space Grotesk, system-ui">K</text>
        </svg>
      )
    },
    {
      name: 'Hotels.com',
      url: 'https://www.hotels.com',
      svg: (
        <svg viewBox="0 0 46 42" height="36">
          <rect x="0" y="0" width="46" height="42" rx="4" fill="#cbe2ff" />
          <circle cx="23" cy="17" r="9" fill="#155297" />
          <ellipse cx="23" cy="17" rx="11" ry="4" stroke="#ffb400" strokeWidth="2" fill="none" transform="rotate(-20 23 17)" />
          <text x="23" y="37" fontSize="6.5" fontWeight="900" fill="#155297" textAnchor="middle" fontFamily="system-ui">Hotels.com</text>
        </svg>
      )
    }
  ];

  // Duplicated array for infinite seamless ribbon marquee loop
  const marqueeList = [...ribbonPartners, ...ribbonPartners, ...ribbonPartners];

  return (
    <footer className="footer-container">
      <style>{`
        .footer-partner-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 22px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: pointer;
          min-width: 140px;
        }
        .footer-partner-link:hover {
          background: rgba(56, 189, 248, 0.14);
          border-color: #38bdf8;
          box-shadow: 0 0 18px rgba(56, 189, 248, 0.35);
          transform: translateY(-2px);
        }
        .footer-partner-link img {
          transition: filter 0.3s ease, transform 0.3s ease;
          filter: brightness(1.2) contrast(1.05);
        }
        .footer-partner-link:hover img {
          filter: brightness(0) saturate(100%) invert(64%) sepia(85%) saturate(836%) hue-rotate(167deg) brightness(102%) contrast(97%);
        }
        .contact-link-row {
          display: inline-flex !important;
          align-items: center !important;
          gap: 12px !important;
          color: #cbd5e1 !important;
          text-decoration: none !important;
          font-size: 13.5px !important;
          transition: all 0.25s ease !important;
        }
        .contact-link-row svg {
          transition: transform 0.25s ease;
        }
        .contact-link-row:hover {
          color: #38bdf8 !important;
        }
        .contact-link-row:hover svg {
          transform: scale(1.15);
        }
      `}</style>

      {/* Horizontal Scrolling Ribbon of Original Partner Logos Without Borders */}
      <div className="footer-ribbon-section">
        <h4 className="partners-title">FEATURED HOSPITALITY & ONLINE BOOKING PARTNERS</h4>
        <div className="footer-ribbon-wrapper">
          <div className="footer-ribbon-track">
            {marqueeList.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ribbon-logo-item"
                title={`Visit ${partner.name}`}
              >
                {partner.svg}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-top-grid">
        {/* Brand Column with Official Company Logo Showcase */}
        <div className="footer-col-brand" style={{ minWidth: '340px', flex: '1.4' }}>
          <div className="footer-logo">
            <img
              src="/images/Rj-logo.png"
              alt="RJ's Larom Residences Logo"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/images/Larom-logo.jpg')) {
                  target.src = '/images/Larom-logo.jpg';
                }
              }}
              style={{ height: '44px', width: 'auto', borderRadius: '6px', objectFit: 'contain' }}
            />
            <span>RJ's Larom Residences</span>
          </div>
          <p className="footer-tagline">Pakistan's First Branded Residences on Islamabad Expressway</p>

          {/* Partnered With Section (Spacious wide width with blue hover) */}
          <div className="footer-partnered-with" style={{ marginTop: '24px', width: '100%', maxWidth: '410px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.65)', display: 'block', marginBottom: '14px' }}>
              PARTNERED WITH
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="https://laromhotelresidences.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-partner-link"
                title="Visit LAROM Hotel & Residences Website"
                style={{ flex: '1 1 150px' }}
              >
                <img
                  src="/images/Larom-logo.png"
                  alt="LAROM Hotels & Residences Logo"
                  style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </a>
              <a
                href="https://www.continentintl.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-partner-link"
                title="Visit Continent Worldwide Hotels Website"
                style={{ flex: '1 1 150px' }}
              >
                <img
                  src="/images/continent-logo.png"
                  alt="Continent Worldwide Hotels Logo"
                  style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Contact & WhatsApp Column with Official Icons */}
        <div className="footer-col-links">
          <h4>Contact & Direct Inquiries</h4>
          <ul>
            <li>
              <a href="tel:+923008591434" className="contact-link-row">
                {/* Official Google Contacts Logo */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="11" fill="#1a73e8" />
                  <circle cx="12" cy="8.2" r="3.2" fill="#ffffff" />
                  <path d="M12 13.5C8.8 13.5 6.2 15.3 5.5 17.8C7.2 19.8 9.5 21 12 21C14.5 21 16.8 19.8 18.5 17.8C17.8 15.3 15.2 13.5 12 13.5Z" fill="#ffffff" />
                </svg>
                <span>+92 300 859 1434 (Pakistan HQ)</span>
              </a>
            </li>
            <li>
              <a href="tel:+441158880306" className="contact-link-row">
                {/* Official Google Contacts Logo */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="11" fill="#1a73e8" />
                  <circle cx="12" cy="8.2" r="3.2" fill="#ffffff" />
                  <path d="M12 13.5C8.8 13.5 6.2 15.3 5.5 17.8C7.2 19.8 9.5 21 12 21C14.5 21 16.8 19.8 18.5 17.8C17.8 15.3 15.2 13.5 12 13.5Z" fill="#ffffff" />
                </svg>
                <span>+44 115 888 0306 (UK Office)</span>
              </a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send?phone=447448445618" target="_blank" rel="noreferrer" className="contact-link-row">
                {/* Official WhatsApp Logo */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path
                    d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"
                    fill="#25D366"
                  />
                  <path
                    d="M17.52 14.33C17.22 14.18 15.76 13.46 15.49 13.36C15.22 13.26 15.02 13.21 14.82 13.51C14.62 13.81 14.06 14.46 13.89 14.66C13.72 14.86 13.54 14.88 13.24 14.73C12.94 14.58 11.98 14.27 10.84 13.26C9.96 12.47 9.36 11.5 9.21 11.2C9.06 10.9 9.19 10.74 9.34 10.59C9.48 10.46 9.64 10.24 9.79 10.07C9.94 9.89 9.99 9.77 10.09 9.57C10.19 9.37 10.14 9.19 10.07 9.04C9.99 8.89 9.42 7.51 9.19 6.94C8.96 6.39 8.73 6.46 8.56 6.45C8.4 6.44 8.22 6.44 8.04 6.44C7.86 6.44 7.56 6.51 7.31 6.78C7.06 7.06 6.36 7.71 6.36 9.04C6.36 10.37 7.33 11.64 7.47 11.82C7.6 12.01 9.38 14.75 12.1 15.92C12.75 16.2 13.25 16.37 13.65 16.5C14.3 16.71 14.89 16.68 15.36 16.61C15.88 16.53 16.97 15.95 17.2 15.31C17.43 14.66 17.43 14.11 17.36 14C17.28 13.89 17.09 13.81 16.79 13.66L17.52 14.33Z"
                    fill="#FFFFFF"
                  />
                </svg>
                <span>WhatsApp: +44 7448 445618</span>
              </a>
            </li>
            <li>
              <a href="mailto:ask@rjsdevelopers.com" className="contact-link-row">
                {/* Red Mail Logo */}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect width="20" height="16" x="2" y="4" rx="2" stroke="#ef4444" fill="rgba(239, 68, 68, 0.15)" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="#ef4444" />
                </svg>
                <span>ask@rjsdevelopers.com</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Visit Our Sales Gallery Card (Clickable Google Maps Location for Plot 13 Bahria Lifestyle) */}
        <div className="footer-col-contact-card">
          <h4>Visit Our Sales Gallery</h4>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Plot+13+Bahria+Lifestyle+Islamabad+Expressway"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-map-widget-link"
            title="Open Plot 13, Bahria Lifestyle on Google Maps"
          >
            <div className="footer-map-widget">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&q=80"
                alt="Plot 13 Bahria Lifestyle Google Map Location"
              />
              <div className="map-pin-overlay">
                <span className="pin-dot">📍</span>
                <div>
                  <strong className="gmap-title">Plot #13, Bahria Lifestyle</strong>
                  <p>Islamabad Expressway, Opposite IMARAT Downtown & Monal</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© 2026 RJ's Developers & Infrastructure Company (PVT) Ltd. All Rights Reserved.</span>
        <span>CDA Approved · Bahria Approved · FBR Registered</span>
      </div>
    </footer>
  );
};
