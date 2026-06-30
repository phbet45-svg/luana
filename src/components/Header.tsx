import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ExternalLink, Play, Film, Instagram } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre Mim', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Antes e Depois', href: '#antes-depois' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Benefícios', href: '#beneficios' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-4'
          : 'bg-gradient-to-b from-[#0A0A0A]/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo / Monogram */}
        <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="flex items-center space-x-3 select-none group">
          <img 
            id="header-brand-logo"
            src="https://i.postimg.cc/P5WmCB9M/Chat-GPT-Image-30-06-2026-14-15-52.png" 
            alt="Luana Fatel Logo" 
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg md:text-xl tracking-[0.2em] text-[#C5A059] transition-colors duration-300 leading-tight">
              LUANA FATEL
            </span>
            <span className="text-[8px] md:text-[9px] tracking-[0.3em] font-light uppercase text-white/60 group-hover:text-white transition-colors duration-300 leading-none mt-1">
              Arquitetura & Interiores
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs uppercase tracking-widest font-medium relative py-1 transition-colors duration-300 group text-white/80 hover:text-[#C5A059]"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Elegant Divider was here, moved with icons to CTA area */}
        </nav>

        {/* Call to Action Social Icons */}
        <div className="hidden md:flex items-center space-x-5">
          <a
            id="header-cta-whatsapp"
            href={CONTACT_INFO.links.hero}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/85 hover:text-[#C5A059] transition-all duration-300 transform hover:scale-110 p-1 flex items-center justify-center"
            title="Falar no WhatsApp"
            aria-label="WhatsApp"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-current"
            >
              <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.26 4.88L2 22l5.3-1.22c1.4.78 3.01 1.22 4.7 1.22 5.52 0 10-4.48 10-10S17.52 2 12.004 2zm4.78 14.18c-.2.56-1.12 1.04-1.63 1.11-.42.06-.97.11-2.9-.69-2.46-1.02-4.04-3.52-4.16-3.69-.12-.17-1.01-1.34-1.01-2.56 0-1.22.64-1.82.87-2.07.2-.23.54-.34.86-.34.1 0 .2 0 .3.01.28.01.42.03.6.47.23.56.78 1.9.85 2.05.07.15.12.33.02.53-.1.2-.21.3-.36.48-.15.17-.32.39-.16.66.3.52.74.96 1.26 1.41.67.58 1.24.96 1.58 1.12.32.15.51.13.7-.08.19-.21.81-.94 1.03-1.27.22-.32.44-.27.74-.16.3.11 1.91.9 2.24 1.06.33.16.55.24.63.38.08.14.08.82-.12 1.38z"/>
            </svg>
          </a>

          <span className="h-5 w-[1px] bg-white/20" />

          <a
            href={CONTACT_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/85 hover:text-[#C5A059] transition-all duration-300 transform hover:scale-110 p-1 flex items-center justify-center"
            title="Siga no Instagram"
            aria-label="Instagram"
          >
            <Instagram className="w-7 h-7 stroke-[1.5]" />
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-1.5 rounded-md focus:outline-none transition-colors duration-300 text-white hover:bg-white/10"
          aria-label={isMenuOpen ? 'Fechar Menu' : 'Abrir Menu'}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Menu Side Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`lg:hidden fixed top-0 right-0 h-full w-[80%] max-w-sm z-50 bg-[#0F0F0F] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-500 ease-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0A0A0A]">
          <div className="flex items-center space-x-2.5">
            <img 
               id="mobile-drawer-brand-logo"
              src="https://i.postimg.cc/P5WmCB9M/Chat-GPT-Image-30-06-2026-14-15-52.png" 
              alt="Luana Fatel Logo" 
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base text-[#C5A059] tracking-[0.15em] leading-tight">LUANA FATEL</span>
              <span className="text-[7px] tracking-[0.25em] text-white/50 font-light uppercase leading-none mt-1">Arquitetura & Interiores</span>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-1.5 rounded-md text-white/80 hover:text-[#C5A059] hover:bg-white/5 focus:outline-none"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
          {navItems.map((item, idx) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block text-sm uppercase tracking-wider font-medium text-white/80 hover:text-[#C5A059] transition-colors py-2.5 border-b border-white/5"
            >
              <span className="text-xs font-mono text-[#C5A059] mr-3">0{idx + 1}.</span>
              {item.name}
            </a>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 bg-[#151515] flex flex-col space-y-3">
          <a
            id="drawer-cta-whatsapp"
            href={CONTACT_INFO.links.hero}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-[#C5A059] text-black font-semibold py-3 text-xs tracking-wider uppercase hover:brightness-110 transition-all shadow-lg shadow-black/40"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Falar no WhatsApp agora</span>
          </a>
          <a
            href={CONTACT_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 border border-white/20 text-white hover:text-[#C5A059] hover:border-[#C5A059] py-2.5 text-xs tracking-wider uppercase transition-colors group"
          >
            <Instagram className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
            <span>Seguir no Instagram</span>
          </a>
        </div>
      </div>
    </header>
  );
}
