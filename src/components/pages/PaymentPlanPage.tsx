import React, { useState } from 'react';
import { PaymentPlanSection } from '../home/PaymentPlanSection';

interface PaymentPlanPageProps {
  onNavigate: (tabId: string) => void;
}

export const PaymentPlanPage: React.FC<PaymentPlanPageProps> = ({ onNavigate }) => {
  const [selectedSuiteType, setSelectedSuiteType] = useState<'1bed' | '2bed'>('1bed');

  const suitePlans = {
    '1bed': {
      title: '1-Bedroom Serviced Residence',
      size: '720 sq.ft',
      totalPrice: 'PKR 14.50 Million',
      downPayment: 'PKR 3.62 Million',
      monthlyInstallment: 'PKR 207,142 / Month',
      possession: 'PKR 2.17 Million',
      annualRoi: '6%–7% (Approx 870k+/yr)'
    },
    '2bed': {
      title: '2-Bedroom Luxury Residence',
      size: '1,250 sq.ft',
      totalPrice: 'PKR 26.50 Million',
      downPayment: 'PKR 6.62 Million',
      monthlyInstallment: 'PKR 378,571 / Month',
      possession: 'PKR 3.97 Million',
      annualRoi: '6%–7% (Approx 1.59M+/yr)'
    }
  };

  const currentPlan = suitePlans[selectedSuiteType];

  return (
    <div className="payment-plan-page animate-fade-in" style={{ background: '#ffffff', minHeight: '100vh', color: '#152247' }}>
      {/* Top Banner Header */}
      <section
        style={{
          background: '#152247',
          color: '#ffffff',
          padding: '120px 32px 60px 32px',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', padding: '6px 18px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '16px' }}>
          OFFICIAL BRANDED RESIDENCY SCHEDULE
        </div>

        <h1 style={{ fontSize: '44px', fontWeight: 900, color: '#ffffff', margin: '0 0 14px 0', letterSpacing: '-0.5px' }}>
          Official Payment Plan & Investment Schedule
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '17px', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
          Explore our investor-friendly 3.5-year construction payment plan for RJ's Larom Serviced Hotel Apartments on Islamabad Expressway.
        </p>
      </section>

      {/* Embedded Live Pie Chart & Interactive Payment Breakdown Component */}
      <PaymentPlanSection onNavigate={onNavigate} />

      {/* Detailed Installment Table & Breakdown Section */}
      <section style={{ maxWidth: '1280px', margin: '60px auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ background: 'rgba(21, 34, 71, 0.06)', color: '#152247', padding: '6px 16px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            DETAILED SUITE BREAKDOWN
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#152247', margin: '12px 0 0 0' }}>
            Complete Financial Breakdown
          </h2>
        </div>

        {/* Suite Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '32px' }}>
          <button
            onClick={() => setSelectedSuiteType('1bed')}
            style={{
              padding: '12px 28px',
              borderRadius: '99px',
              fontWeight: 800,
              fontSize: '14px',
              border: selectedSuiteType === '1bed' ? '2px solid #152247' : '1px solid #cbd5e1',
              background: selectedSuiteType === '1bed' ? '#152247' : '#ffffff',
              color: selectedSuiteType === '1bed' ? '#ffffff' : '#64748b',
              cursor: 'pointer',
              boxShadow: selectedSuiteType === '1bed' ? '0 6px 20px rgba(21, 34, 71, 0.25)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            1-Bedroom Luxury Suite (720 sq.ft)
          </button>
          <button
            onClick={() => setSelectedSuiteType('2bed')}
            style={{
              padding: '12px 28px',
              borderRadius: '99px',
              fontWeight: 800,
              fontSize: '14px',
              border: selectedSuiteType === '2bed' ? '2px solid #152247' : '1px solid #cbd5e1',
              background: selectedSuiteType === '2bed' ? '#152247' : '#ffffff',
              color: selectedSuiteType === '2bed' ? '#ffffff' : '#64748b',
              cursor: 'pointer',
              boxShadow: selectedSuiteType === '2bed' ? '0 6px 20px rgba(21, 34, 71, 0.25)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            2-Bedroom Luxury Suite (1,250 sq.ft)
          </button>
        </div>

        {/* Financial Schedule Grid Table */}
        <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '24px', padding: '36px 40px', boxShadow: '0 16px 40px rgba(21, 34, 71, 0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '28px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#152247', margin: '0' }}>{currentPlan.title}</h3>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>Fully Furnished & Hotel Serviced • Size: {currentPlan.size}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#152247', textTransform: 'uppercase' }}>TOTAL SUITE PRICE</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#152247' }}>{currentPlan.totalPrice}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'rgba(21, 34, 71, 0.04)', border: '1px solid rgba(21, 34, 71, 0.12)', padding: '20px', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#152247', textTransform: 'uppercase' }}>25% DOWN PAYMENT</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#152247', marginTop: '6px' }}>{currentPlan.downPayment}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Booking & Unit Allotment</div>
            </div>

            <div style={{ background: 'rgba(21, 34, 71, 0.04)', border: '1px solid rgba(21, 34, 71, 0.12)', padding: '20px', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#152247', textTransform: 'uppercase' }}>60% MONTHLY INSTALLMENTS</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#152247', marginTop: '6px' }}>{currentPlan.monthlyInstallment}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Spread Over 42 Months (3.5 Yrs)</div>
            </div>

            <div style={{ background: 'rgba(21, 34, 71, 0.04)', border: '1px solid rgba(21, 34, 71, 0.12)', padding: '20px', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#152247', textTransform: 'uppercase' }}>15% POSSESSION</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#152247', marginTop: '6px' }}>{currentPlan.possession}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>At Keys Handover (June 2027)</div>
            </div>

            <div style={{ background: 'rgba(21, 34, 71, 0.04)', border: '1px solid rgba(21, 34, 71, 0.12)', padding: '20px', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#152247', textTransform: 'uppercase' }}>GUARANTEED ANNUAL ROI</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#152247', marginTop: '6px' }}>{currentPlan.annualRoi}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Managed Overseas Dividend</div>
            </div>
          </div>

          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <button
              onClick={() => onNavigate('book-now')}
              style={{
                background: '#152247',
                color: '#ffffff',
                padding: '16px 40px',
                borderRadius: '99px',
                fontSize: '16px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(21, 34, 71, 0.25)',
                transition: 'all 0.3s ease'
              }}
            >
              Reserve Your Residence Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
