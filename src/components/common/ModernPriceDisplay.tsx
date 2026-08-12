import React from 'react';
import { AnimatedNumber } from './AnimatedNumber';

interface ModernPriceDisplayProps {
  price: number;
  downPaymentPercent?: number;
  size?: 'sm' | 'lg';
}

export const ModernPriceDisplay: React.FC<ModernPriceDisplayProps> = ({
  price,
  downPaymentPercent = 25,
  size = 'lg'
}) => {
  const priceInMillions = (price / 1000000).toFixed(2);
  const downPaymentVal = ((price * (downPaymentPercent / 100)) / 1000000).toFixed(2);
  const possessionVal = ((price * 0.15) / 1000000).toFixed(2);

  if (size === 'sm') {
    return (
      <div className="modern-price-card-sm">
        <div className="price-tag-badge">PKR 24,500 / SQ.FT</div>
        <div className="price-amount-row">
          <span className="pkr-badge">PKR</span>
          <span className="price-main-num">
            <AnimatedNumber value={parseFloat(priceInMillions)} decimals={2} /> <span className="price-unit">Million</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-price-box-lg">
      <div className="modern-price-header">
        <span className="price-badge-tag">💎 RATE: PKR 24,500 PER SQ.FT</span>
        <span className="price-guarantee-pill">3-YEAR INSTALLMENT PLAN</span>
      </div>

      <div className="modern-price-main-row">
        <span className="currency-pill">PKR</span>
        <div className="main-price-figure">
          <AnimatedNumber value={parseFloat(priceInMillions)} decimals={2} />
          <span className="million-text">Million</span>
        </div>
        <span className="exact-price-sub">
          (<AnimatedNumber value={price} suffix=" PKR" />)
        </span>
      </div>

      <div className="downpayment-breakdown-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between' }}>
        <div className="downpayment-chip">
          <span className="dp-label">{downPaymentPercent}% Down Payment:</span>
          <strong className="dp-val">PKR <AnimatedNumber value={parseFloat(downPaymentVal)} decimals={2} />M</strong>
        </div>
        <div className="downpayment-chip">
          <span className="dp-label">15% Possession:</span>
          <strong className="dp-val" style={{ color: '#38bdf8' }}>PKR <AnimatedNumber value={parseFloat(possessionVal)} decimals={2} />M</strong>
        </div>
        <div>
          <span className="delivery-date-chip">Handover Jun 2027</span>
        </div>
      </div>
    </div>
  );
};
