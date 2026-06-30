import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTACT_INFO, BEFORE_AFTER_GALLERY } from '../data';

export default function BeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const currentPair = BEFORE_AFTER_GALLERY[activeIndex];

  // Reset slider position on environment change
  useEffect(() => {
    setSliderPosition(50);
  }, [activeIndex]);

  // Center active thumbnail in viewport
  useEffect(() => {
    if (thumbnailScrollRef.current) {
      const activeElement = thumbnailScrollRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        const container = thumbnailScrollRef.current;
        const scrollLeft = activeElement.offsetLeft - container.offsetWidth / 2 + activeElement.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeIndex]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? BEFORE_AFTER_GALLERY.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === BEFORE_AFTER_GALLERY.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="antes-depois" className="py-24 bg-[#0A0A0A] text-white overflow-hidden relative border-b border-white/5">
      {/* Decorative architectural grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] opacity-35" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#C5A059]/10 border border-[#C5A059]/25 px-4 py-1.5 rounded-none mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">Transformações Reais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight leading-tight">
            Antes e <span className="font-serif italic font-medium text-[#C5A059]">Depois</span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Toque nas miniaturas e deslize o cursor central para comparar ambientes comuns com as soluções de alto padrão do nosso escritório.
          </p>
        </div>

        {/* Interactive Comparison Container with Next/Prev Floating Chevrons */}
        <div className="relative max-w-4xl mx-auto group/main">
          
          {/* Main Drag Comparison Window */}
          <div
            ref={containerRef}
            className="relative h-[320px] sm:h-[450px] md:h-[520px] w-full rounded-none overflow-hidden shadow-2xl select-none cursor-ew-resize border border-white/10 bg-[#0F0F0F]"
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {/* AFTER Image (Deep Layer) */}
            <div className="absolute inset-0">
              <img
                src={currentPair.after}
                alt={`${currentPair.category} (Depois)`}
                className="w-full h-full object-contain pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 z-20 bg-[#C5A059] text-black px-3.5 py-1.5 rounded-none text-[9px] font-bold uppercase tracking-[0.2em] font-mono shadow-md">
                DEPOIS (Assinado)
              </div>
            </div>

            {/* BEFORE Image (Clipped Overlay) */}
            <div
              className="absolute inset-0 z-10 overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src={currentPair.before}
                alt={`${currentPair.category} (Antes)`}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none filter brightness-[0.85] contrast-[0.95]"
                style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 z-20 bg-black/85 text-white px-3.5 py-1.5 rounded-none text-[9px] font-bold uppercase tracking-[0.2em] font-mono shadow-md border border-white/5">
                ANTES (Original)
              </div>
            </div>

            {/* Drag Handle Bar */}
            <div
              className="absolute top-0 bottom-0 z-20 w-[2px] bg-[#C5A059] cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-none bg-[#C5A059] text-black shadow-[0_0_20px_rgba(197,160,89,0.5)] flex items-center justify-center pointer-events-auto cursor-ew-resize transition-transform duration-200 hover:scale-110 active:scale-95">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Center Hint Prompt */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-none border border-white/10 text-[9px] tracking-[0.25em] text-gray-300 font-mono pointer-events-none animate-pulse uppercase">
              ↔ Arraste para comparar
            </div>
          </div>

          {/* Luxury Left navigation chevron */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-[#0A0A0A]/90 hover:bg-[#C5A059] text-white hover:text-black border border-white/10 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-xl group cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          {/* Luxury Right navigation chevron */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-[#0A0A0A]/90 hover:bg-[#C5A059] text-white hover:text-black border border-white/10 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-xl group cursor-pointer"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Description panel */}
        <div className="max-w-4xl mx-auto mt-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C5A059] font-semibold">
                {currentPair.category}
              </div>
              <p className="text-sm text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                {currentPair.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 19 Horizontal Thumbnail Scroll Track */}
        <div className="max-w-4xl mx-auto mt-12 relative">
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none z-10" />

          <div
            ref={thumbnailScrollRef}
            className="flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 px-6 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {BEFORE_AFTER_GALLERY.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className="flex-shrink-0 focus:outline-none cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-2">
                    {/* Visual miniature card */}
                    <div
                      className={`relative w-20 h-14 bg-[#121212] overflow-hidden border transition-all duration-500 ${
                        isActive 
                          ? 'border-[#C5A059] scale-105 shadow-[0_0_12px_rgba(197,160,89,0.3)]' 
                          : 'border-white/10 opacity-40 hover:opacity-85'
                      }`}
                    >
                      <img
                        src={item.after}
                        alt="Depois mini"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* Active highlight color overlay */}
                      {isActive && <div className="absolute inset-0 bg-[#C5A059]/10" />}
                    </div>

                    {/* Numeric code index */}
                    <span
                      className={`text-[10px] font-mono tracking-wider transition-colors duration-300 ${
                        isActive ? 'text-[#C5A059] font-bold' : 'text-gray-500'
                      }`}
                    >
                      {String(item.id).padStart(2, '0')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Call To Action Banner */}
        <div className="max-w-4xl mx-auto mt-16 bg-[#0E0E0E] border border-white/5 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-lg sm:text-xl font-light text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-[#C5A059] animate-pulse" />
              <span>Gostaria de transformar o seu espaço?</span>
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl">
              Nossa equipe especializada elabora projetos de alto padrão pensados exclusivamente na sua personalidade e rotina familiar.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <a
              id="before-after-gallery-cta-whatsapp"
              href={CONTACT_INFO.links.hero}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#C5A059] hover:bg-[#b08b41] text-black font-semibold px-8 py-4 rounded-none text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-black/35 hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Fazer Meu Orçamento Autoral</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
