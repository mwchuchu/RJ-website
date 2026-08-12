import React from 'react';

interface HeroProps {
  onNavigate?: (tabId: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const titleWords = [
    "Branded",
    "Residency",
    "Fully",
    "Furnished",
    "Serviced",
    "Apartment."
  ];

  return (
    <section className="hero-section">
      {/* Dark gradient overlay for text readability */}
      <div className="hero-bg-overlay"></div>

      {/* Building image animated going up to meet navbar */}
      <img
        src="/images/buildingimage.png"
        alt="RJ's Larom Building Islamabad Expressway"
        className="hero-bg-img animated-hero-img"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.endsWith('/images/buildingimage.png')) {
            target.src = 'images/buildingimage.png';
          }
        }}
      />

      {/* Landing Page Image Banner Title with Slow Word Fade/Slide In */}
      <div className="hero-content-clean">
        <h1 className="hero-word-stagger-title">
          {titleWords.map((word, idx) => (
            <span
              key={idx}
              className="hero-word-span"
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                color: '#ffffff',
                animationName: 'wordFadeSlideIn',
                animationDuration: '1.4s',
                animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                animationFillMode: 'both',
                animationDelay: `${0.2 + idx * 0.22}s`
              }}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
};
