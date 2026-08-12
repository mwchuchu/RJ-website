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
        <div className="footer-col-brand">
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

        </div>

        {/* Contact & WhatsApp Column */}
        <div className="footer-col-links">
          <h4>Contact & Direct Inquiries</h4>
          <ul>
            <li><a href="tel:+923008591434">+92 300 859 1434 (Pakistan HQ)</a></li>
            <li><a href="tel:+441158880306">+44 115 888 0306 (UK Office)</a></li>
            <li><a href="https://api.whatsapp.com/send?phone=447448445618" target="_blank" rel="noreferrer">WhatsApp: +44 7448 445618</a></li>
            <li><a href="mailto:ask@rjsdevelopers.com">ask@rjsdevelopers.com</a></li>
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


