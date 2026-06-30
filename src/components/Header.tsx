import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ExternalLink, Play, Film } from 'lucide-react';
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
    { name: 'Vídeos', href: '#videos' },
    { name: 'Benefícios', href: '#beneficios' },
    { name: 'FAQ', href: '#faq' },
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
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:flex items-center space-x-3">
          <a
            id="header-cta-whatsapp"
            href={CONTACT_INFO.links.hero}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 border border-[#C5A059] text-[#C5A059] px-6 py-2.5 text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-black transition-all duration-300 hover:scale-105"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Falar com Luana</span>
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
              <span className="text-[7px] tracking-[0.25em] text-white/50 font-light uppercase leading-none mt-1 animate-pulse">Arquitetura & Interiores</span>
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
            className="flex items-center justify-center space-x-2 border border-white/20 text-white hover:text-[#C5A059] hover:border-[#C5A059] py-2.5 text-xs tracking-wider uppercase transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-white/40" />
            <span>Ver Instagram</span>
          </a>
        </div>
      </div>
    </header>
  );
}
