import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ClipboardList, Eye, FileText, LayoutGrid, HardHat, ChevronRight } from 'lucide-react';
import { PROCESS_STEPS, CONTACT_INFO } from '../data';

export default function Process() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const getStepIcon = (idx: number) => {
    const classNames = "w-5 h-5";
    switch (idx) {
      case 0: return <ClipboardList className={classNames} />;
      case 1: return <Eye className={classNames} />;
      case 2: return <FileText className={classNames} />;
      case 3: return <LayoutGrid className={classNames} />;
      case 4: return <HardHat className={classNames} />;
      default: return <ClipboardList className={classNames} />;
    }
  };

  return (
    <section id="processo" className="py-24 bg-[#0A0A0A] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#C5A059] tracking-[0.25em] uppercase block">
            Como Trabalhamos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
            Seu sonho organizado em <span className="font-serif italic font-medium text-[#C5A059]">5 passos claros</span>
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Esqueça dores de cabeça com obras ou mal-entendidos. Nosso método de trabalho garante fidelidade absoluta e controle em cada etapa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Step Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStepIdx === idx;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`w-full flex items-center justify-between p-5 rounded-none border text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#111111] border-white/20 text-white'
                      : 'bg-[#0F0F0F]/50 border-white/5 hover:bg-[#111111] hover:border-white/10 text-white/70'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Circle Count */}
                    <div className={`w-10 h-10 rounded-none flex items-center justify-center font-serif font-bold text-sm border transition-all ${
                      isSelected ? 'bg-[#C5A059] text-black border-[#C5A059]' : 'bg-white/5 border-white/10 text-gray-400'
                    }`}>
                      {step.stepNumber}
                    </div>

                    <div>
                      <p className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${
                        isSelected ? 'text-[#C5A059]' : 'text-gray-500'
                      }`}>
                        Etapa 0{idx + 1}
                      </p>
                      <h4 className="font-serif font-light text-base mt-0.5">{step.title}</h4>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-[#C5A059] translate-x-1' : 'text-gray-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Step Explanation Card with animation */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#111111] border border-white/10 rounded-none p-8 sm:p-10 relative overflow-hidden"
              >
                {/* Floating Giant Number background */}
                <div className="absolute top-4 right-6 text-9xl font-serif font-light text-white/5 select-none pointer-events-none">
                  {PROCESS_STEPS[activeStepIdx].stepNumber}
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center space-x-3 text-[#C5A059]">
                    <div className="p-2 bg-white/5 rounded-none border border-white/10">
                      {getStepIcon(activeStepIdx)}
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
                      {PROCESS_STEPS[activeStepIdx].subtitle}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                      {PROCESS_STEPS[activeStepIdx].title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                      {PROCESS_STEPS[activeStepIdx].description}
                    </p>
                  </div>

                  {/* Bullet deliveries list */}
                  <div className="space-y-3.5 pt-6 border-t border-white/10">
                    <h5 className="text-[10px] font-mono font-bold text-white/90 uppercase tracking-widest">
                      O que está incluso nesta etapa:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PROCESS_STEPS[activeStepIdx].details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start space-x-2">
                          <div className="bg-[#C5A059]/10 text-[#C5A059] p-0.5 rounded-none mt-0.5 border border-[#C5A059]/20">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs text-gray-300 font-light leading-snug">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contextual CTA inside process slide */}
                  <div className="pt-6">
                    <a
                      id={`process-step-cta-${activeStepIdx}`}
                      href={`https://wa.me/5571992505232?text=Olá,%20Luana!%20Gostaria%20de%20tirar%20dúvidas%20e%20entender%20como%20funciona%20a%20etapa%20de%20*${encodeURIComponent(PROCESS_STEPS[activeStepIdx].title)}*%20do%20seu%20projeto.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#C5A059] uppercase tracking-widest hover:text-[#b18b41] transition-colors"
                    >
                      <span>Conversar sobre esta etapa no WhatsApp</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
