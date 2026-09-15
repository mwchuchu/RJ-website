import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { ServicedApartmentsPage } from './components/pages/ServicedApartmentsPage';
import { LaromHotelPage } from './components/pages/LaromHotelPage';
import { AmenitiesPage } from './components/pages/AmenitiesPage';
import { PaymentPlanPage } from './components/pages/PaymentPlanPage';
import { BookNowPage } from './components/pages/BookNowPage';
import { WhyToInvestPage } from './components/pages/WhyToInvestPage';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import './App.css';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [bookingPref, setBookingPref] = useState<{ suiteType?: '1bed' | '2bed'; duration?: '6month' | '12month' } | null>(null);

  const handleSelectTab = (tabId: string, params?: { suiteType?: '1bed' | '2bed'; duration?: '6month' | '12month' }) => {
    if (params) {
      setBookingPref(params);
    }
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-canvas">
      <div className="app-container" style={{ paddingBottom: 0 }}>
        {/* Top Navbar Header with Specific Pages */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
        />

        {/* Dynamic Page Views */}
        <main className="main-page-content">
          {activeTab === 'home' && (
            <HomePage onNavigate={handleSelectTab} />
          )}

          {activeTab === 'serviced-apartments' && (
            <ServicedApartmentsPage
              onNavigate={handleSelectTab}
            />
          )}

          {activeTab === 'larom-hotel-residencies' && (
            <LaromHotelPage onNavigate={handleSelectTab} />
          )}

          {activeTab === 'payment-plan' && (
            <PaymentPlanPage onNavigate={handleSelectTab} />
          )}

          {activeTab === 'amenities' && (
            <AmenitiesPage onNavigate={handleSelectTab} />
          )}

          {activeTab === 'book-now' && (
            <BookNowPage
              onNavigate={handleSelectTab}
              initialSuiteType={bookingPref?.suiteType}
              initialDuration={bookingPref?.duration}
            />
          )}

          {activeTab === 'why-invest' && (
            <WhyToInvestPage onNavigate={handleSelectTab} />
          )}
        </main>

        {/* Shared Footer on Every Page View */}
        <Footer />

        {/* Sticky WhatsApp Floating Widget (+923230537371) */}
        <WhatsAppWidget />
      </div>
    </div>
  );
};

export default App;
