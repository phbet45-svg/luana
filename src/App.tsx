import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Benefits from './components/Benefits';
import Process from './components/Process';
import Urgency from './components/Urgency';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ExitIntentPopup from './components/ExitIntentPopup';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import CinematicIntro from './components/CinematicIntro';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-gray-300 selection:bg-[#C5A059] selection:text-black overflow-x-hidden">
      {/* 7-Second Cinematic Intro Video Overlay */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Premium Header/Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* About Luana Fatel Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Interactive Before & After Slider */}
      <BeforeAfter />

      {/* 6 Key Benefits Block */}
      <Benefits />

      {/* 5-Step Process Timeline */}
      <Process />

      {/* Urgency & Scarcity Block */}
      <Urgency />

      {/* Testimonials & Proof Block */}
      <Testimonials />

      {/* FAQ Accordion */}
      <FAQ />

      {/* Footer Details */}
      <Footer />

      {/* Floating Interactive WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Exit Intent Conversion Hook */}
      <ExitIntentPopup />
    </div>
  );
}


