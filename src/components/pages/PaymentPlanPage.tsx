import React, { useState } from 'react';
import { PaymentPlanSection } from '../home/PaymentPlanSection';

interface PaymentPlanPageProps {
  onNavigate: (tabId: string) => void;
}

export const PaymentPlanPage: React.FC<PaymentPlanPageProps> = ({ onNavigate }) => {
  const [selectedSuiteType, setSelectedSuiteType] = useState<'1bed' | '2bed'>('1bed');

  const paymentTables = {
    '1bed': {
      title: '1-Bedroom Luxury Suite (Fully Furnished)',
      size: '720 Sq. Ft.',
      totalPrice: 'PKR 22,800,000',
      downPayment: 'PKR 5,700,000 (25%)',
      monthlyInstallment: 'PKR 325,714 / mo (42 Months)',
      quarterlyMilestone: 'PKR 977,142 (14 Quarters)',
      possession: 'PKR 3,420,000 (15%)',
      annualRoi: 'PKR 1,596,000 / Year (7% ROI)'
    },
    '2bed': {
      title: '2-Bedroom Luxury Suite (Fully Furnished)',
      size: '1,250 Sq. Ft.',
      totalPrice: 'PKR 38,500,000',
      downPayment: 'PKR 9,625,000 (25%)',
      monthlyInstallment: 'PKR 550,000 / mo (42 Months)',
      quarterlyMilestone: 'PKR 1,650,000 (14 Quarters)',
      possession: 'PKR 5,775,000 (15%)',
      annualRoi: 'PKR 2,695,000 / Year (7% ROI)'
    }
  };

  const currentPlan = paymentTables[selectedSuiteType];

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      {/* Page Header Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          color: '#0f172a',
          padding: '120px 32px 50px 32px',
          textAlign: 'center',
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0284c7', color: '#ffffff', padding: '6px 16px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '14px' }}>
          OFFICIAL BRANDED RESIDENCY SCHEDULE
        </div>

        <h1 style={{ fontSize: '44px', fontWeight: 900, color: '#0f172a', margin: '0 0 14px 0', letterSpacing: '-0.5px' }}>
          Official Payment Plan & Investment Schedule
        </h1>
        <p style={{ color: '#64748b', fontSize: '17px', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
          Explore our investor-friendly 3.5-year construction payment plan for RJ's Larom Serviced Hotel Apartments on Islamabad Expressway.
        </p>
      </section>

      {/* Embedded Live Pie Chart & Interactive Payment Breakdown Component */}
      <PaymentPlanSection onNavigate={onNavigate} />

      {/* Detailed Installment Table & Breakdown Section */}
      <section style={{ maxWidth: '1280px', margin: '60px auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '6px 16px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            DETAILED SUITE BREAKDOWN
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: '12px 0 0 0' }}>
            Complete Financial Breakdown
          </h2>
        </div>

        {/* Suite Selector Tabs (Only 1 & 2 Bedroom Suites) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '32px' }}>
          <button
            onClick={() => setSelectedSuiteType('1bed')}
            style={{
              padding: '12px 28px',
              borderRadius: '99px',
              fontWeight: 800,
              fontSize: '14px',
              border: selectedSuiteType === '1bed' ? '2px solid #0284c7' : '1px solid #cbd5e1',
              background: selectedSuiteType === '1bed' ? '#0284c7' : '#ffffff',
              color: selectedSuiteType === '1bed' ? '#ffffff' : '#64748b',
              cursor: 'pointer',
              boxShadow: selectedSuiteType === '1bed' ? '0 6px 20px rgba(2, 132, 199, 0.25)' : 'none',
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
              border: selectedSuiteType === '2bed' ? '2px solid #0284c7' : '1px solid #cbd5e1',
              background: selectedSuiteType === '2bed' ? '#0284c7' : '#ffffff',
              color: selectedSuiteType === '2bed' ? '#ffffff' : '#64748b',
              cursor: 'pointer',
              boxShadow: selectedSuiteType === '2bed' ? '0 6px 20px rgba(2, 132, 199, 0.25)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            2-Bedroom Luxury Suite (1,250 sq.ft)
          </button>
        </div>

        {/* Financial Schedule Grid Table */}
        <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '24px', padding: '36px 40px', boxShadow: '0 16px 40px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '28px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0' }}>{currentPlan.title}</h3>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>Fully Furnished & Hotel Serviced • Size: {currentPlan.size}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>TOTAL SUITE PRICE</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a' }}>{currentPlan.totalPrice}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#f0f9ff', border: '1px solid rgba(2, 132, 199, 0.2)', padding: '20px', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>💎 25% DOWN PAYMENT</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>{currentPlan.downPayment}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Booking & Unit Allotment</div>
            </div>

            <div style={{ background: '#f0f9ff', border: '1px solid rgba(2, 132, 199, 0.2)', padding: '20px', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase' }}>📅 60% MONTHLY INSTALLMENTS</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>{currentPlan.monthlyInstallment}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Spread Over 42 Months (3.5 Yrs)</div>
            </div>

            <div style={{ background: '#f0f9ff', border: '1px solid rgba(2, 132, 199, 0.2)', padding: '20px', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#0c4a6e', textTransform: 'uppercase' }}>🔑 15% POSSESSION</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>{currentPlan.possession}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>At Keys Handover (June 2027)</div>
            </div>

            <div style={{ background: '#f0f9ff', border: '1px solid rgba(2, 132, 199, 0.2)', padding: '20px', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>📈 GUARANTEED ANNUAL ROI</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>{currentPlan.annualRoi}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Managed Overseas Dividend</div>
            </div>
          </div>

          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <button
              onClick={() => onNavigate('book-now')}
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                padding: '16px 40px',
                borderRadius: '99px',
                fontSize: '16px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(2, 132, 199, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              Book Suite Now With 25% Down Payment →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
