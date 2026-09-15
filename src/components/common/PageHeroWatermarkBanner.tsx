import React from 'react';

interface PageHeroWatermarkBannerProps {
  title: string;
  minHeight?: string;
}

export const PageHeroWatermarkBanner: React.FC<PageHeroWatermarkBannerProps> = ({
  title,
  minHeight = '64vh'
}) => {
  return (
    <section
      className="page-watermark-hero-banner"
      style={{
        position: 'relative',
        minHeight,
        background:
          'radial-gradient(ellipse 140% 100% at 50% 0%, #9cb8d9 0%, #c5daf0 35%, #ebf3fb 70%, #ffffff 100%)',
        borderRadius: '0px 0px 32px 32px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '100px 16px 0px 16px',
        margin: 0,
        width: '100%'
      }}
    >
      {/* Background Animated Watermark Text */}
      <div className="watermark-animated-text">
        {title}
      </div>

      {/* Hero Building Stretched Image Banner */}
      <div className="watermark-building-wrapper">
        <img
          src="/images/buildingimage.png"
          alt="RJ's Larom Building Tower"
          className="watermark-building-img"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.endsWith('/images/buildingimage.png')) {
              target.src = 'images/buildingimage.png';
            }
          }}
        />
      </div>
    </section>
  );
};
