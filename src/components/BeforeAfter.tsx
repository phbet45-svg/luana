import { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, ArrowLeftRight } from 'lucide-react';
import { CONTACT_INFO, IMAGES } from '../data';

export default function BeforeAfter() {
  const [activeProject, setActiveProject] = useState<'proj1' | 'proj2'>('proj1');
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset slider position when changing project
  useEffect(() => {
    setSliderPosition(50);
  }, [activeProject]);

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

  const projectsData = {
    proj1: {
      title: 'Projeto Suíte Íntima',
      location: 'Feira de Santana - BA',
      before: IMAGES.beforeAfter1_before,
      after: IMAGES.beforeAfter1_after,
      description: 'Transformação espetacular de dormitório utilizando marcenaria planejada com texturas quentes, painel retroiluminado, gesso limpo e acabamentos nobres que maximizaram o espaço.',
      impact: 'Otimização inteligente do layout, iluminação cênica integrada e ganho de amplitude com tons off-white elegantes.'
    },
    proj2: {
      title: 'Projeto Living & Gourmet',
      location: 'Salvador - BA',
      before: IMAGES.beforeAfter2_before,
      after: IMAGES.beforeAfter2_after,
      description: 'Integração completa de ambientes trazendo funcionalidade excepcional, novos pontos luminotécnicos de LED e uma composição primorosa de materiais de alto padrão.',
      impact: 'União perfeita de elegância e ergonomia. Cores neutras sofisticadas combinadas com iluminação estratégica de destaque.'
    }
  };

  const currentProject = projectsData[activeProject];

  return (
    <section id="antes-depois" className="py-24 bg-[#0A0A0A] text-white overflow-hidden relative border-b border-white/5">
      {/* Decorative architectural background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#C5A059] tracking-[0.25em] uppercase block">
            Transformação Real
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight">
            Veja o impacto do <span className="font-serif italic font-medium text-[#C5A059]">Antes e Depois</span>
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Selecione o projeto abaixo e arraste a barra central para os lados para comparar a diferença de um espaço comum com um ambiente de alto padrão assinado por Luana Fatel.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex justify-center space-x-4 mb-10">
          <button
            onClick={() => setActiveProject('proj1')}
            className={`px-6 py-3 text-xs uppercase tracking-widest font-mono border transition-all duration-300 cursor-pointer ${
              activeProject === 'proj1'
                ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            {projectsData.proj1.title}
          </button>
          <button
            onClick={() => setActiveProject('proj2')}
            className={`px-6 py-3 text-xs uppercase tracking-widest font-mono border transition-all duration-300 cursor-pointer ${
              activeProject === 'proj2'
                ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            {projectsData.proj2.title}
          </button>
        </div>

        {/* Interactive Comparison Card Container */}
        <div className="max-w-4xl mx-auto">
          
          <div
            ref={containerRef}
            className="relative h-[300px] sm:h-[450px] md:h-[500px] w-full rounded-none overflow-hidden shadow-2xl select-none cursor-ew-resize border border-white/10"
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {/* AFTER image (Background) */}
            <div className="absolute inset-0">
              <img
                src={currentProject.after}
                alt={`${currentProject.title} (Depois)`}
                className="w-full h-full object-contain bg-black pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 bg-[#C5A059] text-black px-3 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-widest font-mono">
                Depois (Assinado)
              </div>
            </div>

            {/* BEFORE image (Overlay, clipped dynamically) */}
            <div
              className="absolute inset-0 z-10 overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src={currentProject.before}
                alt={`${currentProject.title} (Antes)`}
                className="absolute inset-0 w-full h-full object-contain bg-black pointer-events-none filter brightness-90"
                style={{ width: containerRef.current?.getBoundingClientRect().width }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-widest font-mono">
                Antes (Original)
              </div>
            </div>

            {/* Slider Draggable Handler Line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-[2px] bg-[#C5A059] cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag controller handle button */}
              <div className="w-10 h-10 rounded-none bg-[#C5A059] text-black shadow-2xl flex items-center justify-center pointer-events-auto cursor-ew-resize transition-transform duration-200 hover:scale-110 active:scale-95">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Hint overlay instruction */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#0A0A0A]/95 backdrop-blur-md px-4 py-1.5 rounded-none border border-white/10 text-[10px] tracking-widest text-gray-300 font-mono pointer-events-none animate-pulse uppercase">
              ↔ Deslize para os lados
            </div>
          </div>

          {/* Quick Transformation Highlights list & CTA */}
          <div className="mt-12 bg-[#0F0F0F] border border-white/10 rounded-none p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <span className="text-[10px] font-mono font-semibold text-[#C5A059] uppercase tracking-wider block">
                {currentProject.location}
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-light text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C5A059]" />
                <span>{currentProject.title}</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                {currentProject.description} <strong className="text-gray-300">{currentProject.impact}</strong>
              </p>
            </div>
            <div className="text-right">
              <a
                id="before-after-cta"
                href={CONTACT_INFO.links.hero}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-[#C5A059] hover:bg-[#b18b41] text-black font-bold px-6 py-3.5 rounded-none text-xs uppercase tracking-widest transition-transform duration-300"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Quero Transformar meu Lar</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
