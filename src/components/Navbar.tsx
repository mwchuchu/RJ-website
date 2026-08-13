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

  return (
    <header className={`navbar-container nav-mode-${navMode}`}>
      <div className="navbar-logo" onClick={() => onSelectTab('home')}>
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

      <nav className="navbar-links">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
