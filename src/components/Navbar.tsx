import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const [navMode, setNavMode] = useState<'at-top' | 'scroll-up' | 'hidden'>('at-top');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Near top (scroll < 60px): sit at normal top position
      if (currentScrollY < 60) {
        setNavMode('at-top');
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scrolling Down: user chooses to scroll down -> goes back smoothly in an animated manner
      if (currentScrollY > lastScrollY.current + 3) {
        setNavMode('hidden');
      }
      // Scrolling Up: appears immediately as soon as user scrolls up
      else if (currentScrollY < lastScrollY.current - 3) {
        setNavMode('scroll-up');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'serviced-apartments', label: 'Serviced apartments' },
    { id: 'larom-hotel-residencies', label: 'Larom hotel & residencies' },
    { id: 'payment-plan', label: 'Payment Plan' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'book-now', label: 'Book now' },
    { id: 'why-invest', label: 'Why to Invest' }
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar-container nav-mode-${navMode}`}>
        <div className="navbar-logo" onClick={() => handleNavClick('home')}>
          <img
            src="/images/Rj-logo.png"
            alt="RJ's Larom Residences Company Logo"
            className="navbar-company-logo-img"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('/images/Larom-logo.jpg')) {
                target.src = '/images/Larom-logo.jpg';
              }
            }}
            style={{ height: '42px', width: 'auto', borderRadius: '0px', objectFit: 'contain' }}
          />
          <span className="logo-text">RJ's Larom<br /><strong className="logo-sub">Residences</strong></span>
        </div>

        {/* Desktop Navbar Links */}
        <nav className="navbar-links desktop-navbar-links">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className={`mobile-hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          <span className="hamburger-line line-1" />
          <span className="hamburger-line line-2" />
          <span className="hamburger-line line-3" />
        </button>
      </header>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Slide-in Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="navbar-logo" onClick={() => handleNavClick('home')}>
            <img
              src="/images/Rj-logo.png"
              alt="RJ's Larom Residences Logo"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
            <span className="logo-text" style={{ color: '#ffffff' }}>RJ's Larom<br /><strong className="logo-sub" style={{ color: '#93c5fd' }}>Residences</strong></span>
          </div>
          <button
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
          >
            ✕
          </button>
        </div>

        <nav className="mobile-nav-links-list">
          {navItems.map((item, idx) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`mobile-nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                style={{ animationDelay: `${0.04 + idx * 0.04}s` }}
              >
                <span>{item.label}</span>
                <span className="mobile-nav-arrow">{isActive ? '●' : '→'}</span>
              </button>
            );
          })}
        </nav>

        <div className="mobile-nav-footer">
          <a
            href="tel:+923230537371"
            className="mobile-nav-contact-pill"
          >
            📞 +92 323 0537371
          </a>
        </div>
      </div>
    </>
  );
};
