import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Compass, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO, IMAGES } from '../data';

export default function About() {
  const photos = [
    IMAGES.luanaPortrait,
    'https://i.postimg.cc/cCS9nQTG/639054.jpg'
  ];

  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % photos.length);
    }, 4500); // elegant long interval
    return () => clearInterval(timer);
  }, [photos.length]);

  const achievements = [
    {
      icon: <Award className="w-6 h-6 text-[#C5A059]" />,
      title: 'Formação & Expertise',
      description: 'Especialista em arquitetura residencial de alto padrão e design de interiores contemporâneo.',
    },
    {
      icon: <Compass className="w-6 h-6 text-[#C5A059]" />,
      title: 'Identidade Única',
      description: 'Criadora do método de imersão de briefing para capturar a verdadeira essência de cada cliente.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#C5A059]" />,
      title: 'Atendimento Próximo',
      description: 'Acompanhamento genuíno em Salvador e Feira de Santana, do primeiro traço até o último adorno.',
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-[#0F0F0F] overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Image with sophisticated framing */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Main Image */}
              <div className="aspect-[4/5] rounded-none overflow-hidden border border-white/10 shadow-2xl bg-[#111111] relative">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentPhotoIdx}
                    src={photos[currentPhotoIdx]}
                    alt="Luana Fatel Arquiteta"
                    initial={{ opacity: 0, filter: "brightness(0.3) saturate(0.95)" }}
                    animate={{ opacity: 1, filter: "brightness(1) saturate(0.95)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-contain object-center"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Float Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#151515] text-white p-5 rounded-none shadow-xl max-w-[200px] border border-white/10">
                <p className="text-3xl font-serif font-light text-[#C5A059]">100%</p>
                <p className="text-xs text-gray-400 mt-1 font-medium leading-relaxed">
                  Autoral e focado em realizar seus sonhos mais profundos.
                </p>
              </div>
            </motion.div>

            {/* Architectural Grid & Frame backgrounds */}
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-[#C5A059]/5 rounded-full filter blur-2xl opacity-60 -z-10" />
            <div className="absolute top-1/2 right-0 w-48 h-48 bg-white/5 rounded-none -z-10 rotate-12 opacity-40 border border-white/5" />
            <div className="absolute -bottom-10 left-10 border-2 border-[#C5A059]/20 w-[80%] h-48 rounded-none -z-10 opacity-30" />
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold text-[#C5A059] tracking-[0.25em] uppercase block">
                Sobre Luana Fatel
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
                Criando arquitetura que <span className="font-serif italic font-medium text-[#C5A059]">traduz a sua essência</span>.
              </h2>
            </div>

            <div className="text-gray-400 space-y-4 font-light text-base md:text-lg leading-relaxed">
              <p>
                Olá! Sou <strong>Luana Fatel</strong>, arquiteta apaixonada por materializar sonhos e traduzir personalidades através do espaço construído. Com forte atuação em <strong>Feira de Santana, Salvador</strong> e consultoria online em todo o Brasil, acredito que o seu lar ou empresa deve ser o espelho da sua verdade.
              </p>
              <p>
                Meu trabalho foca em aliar a <strong>sofisticação atemporal</strong> à <strong>funcionalidade milimétrica</strong>. Seja em um projeto residencial de alto padrão erguido do zero ou em uma transformação pontual de interiores sem grandes demolições, meu compromisso é entregar harmonia estética, aproveitamento inteligente de luz e espaço, e tranquilidade absoluta no processo.
              </p>
            </div>

            {/* Core Values/Achievements List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {achievements.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center space-x-3 lg:block lg:space-x-0">
                    <div className="p-2 bg-[#C5A059]/10 rounded-none w-10 h-10 flex items-center justify-center border border-[#C5A059]/20">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold text-sm text-white mt-0 lg:mt-3">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Social Proof Seal & WhatsApp Trigger */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
              <a
                id="about-cta-whatsapp"
                href={CONTACT_INFO.links.hero}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black font-bold px-8 py-4 rounded-none text-xs uppercase tracking-widest transition-colors duration-300"
              >
                Agendar Reunião com Luana
              </a>
              <div className="flex items-center space-x-2.5 text-xs text-gray-400 font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
                <span>Projetos com ART emitido e homologados</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
