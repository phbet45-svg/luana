import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTACT_INFO, BEFORE_AFTER_GALLERY } from '../data';

export default function BeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const currentPair = BEFORE_AFTER_GALLERY[activeIndex];

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

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? BEFORE_AFTER_GALLERY.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === BEFORE_AFTER_GALLERY.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
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
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">Portfólio de Luxo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight leading-tight">
            Galeria de <span className="font-serif italic font-medium text-[#C5A059]">Transformações</span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Navegue pelos nossos projetos concluídos e inspire-se com as soluções de alto padrão assinadas por Luana Fatel.
          </p>
        </div>

        {/* Instagram-Style Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          
          <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden bg-[#0F0F0F] border border-white/5 shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                {/* Ambient Blurred Backdrop to fill empty margins elegantly without black bars */}
                <div className="absolute inset-0 overflow-hidden bg-[#0F0F0F]">
                  <img
                    src={currentPair.after}
                    alt=""
                    className="w-full h-full object-cover filter blur-3xl opacity-25 scale-110 pointer-events-none select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Main high-resolution image shown completely without any cropping */}
                <img
                  src={currentPair.after}
                  alt={currentPair.category}
                  className="relative z-10 max-w-full max-h-full w-auto h-auto object-contain pointer-events-none select-none shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                
                {/* Premium tag overlay */}
                <div className="absolute bottom-6 right-6 z-20 bg-[#C5A059] text-black px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] font-mono shadow-xl">
                  Projeto Concluído
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Premium Instagram-Style Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center z-30 px-4 pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-black/40 hover:bg-[#C5A059] text-white hover:text-black backdrop-blur-md border border-white/10 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-2xl pointer-events-auto group active:scale-90"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center z-30 px-4 pointer-events-none">
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-black/40 hover:bg-[#C5A059] text-white hover:text-black backdrop-blur-md border border-white/10 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-2xl pointer-events-auto group active:scale-90"
                aria-label="Próximo"
              >
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Instagram-Style Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-30 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/5">
              {BEFORE_AFTER_GALLERY.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'bg-[#C5A059] scale-125 w-3' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Description panel */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="text-xs font-mono tracking-[0.4em] uppercase text-[#C5A059] font-bold">
                PROJETO {String(activeIndex + 1).padStart(2, '0')} — {currentPair.category}
              </div>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                {currentPair.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Horizontal Thumbnail Scroll Track */}
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
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className="flex-shrink-0 focus:outline-none cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`relative w-20 h-14 bg-[#121212] overflow-hidden border transition-all duration-500 ${
                        isActive 
                          ? 'border-[#C5A059] scale-105 shadow-[0_0_12px_rgba(197,160,89,0.3)]' 
                          : 'border-white/10 opacity-40 hover:opacity-85'
                      }`}
                    >
                      <img
                        src={item.after}
                        alt="Miniatura"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {isActive && <div className="absolute inset-0 bg-[#C5A059]/10" />}
                    </div>

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
