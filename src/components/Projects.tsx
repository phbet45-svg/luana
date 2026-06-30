import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, Image as ImageIcon, Maximize2, X, MessageSquare, ArrowRight, Download, FileDown } from 'lucide-react';
import { CONTACT_INFO, NEW_PROJECT_IMAGES } from '../data';

interface VideoProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  tags: string[];
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'fotos' | 'videos'>('fotos');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  
  // Video-specific states
  const [mutedStates, setMutedStates] = useState<{ [key: number]: boolean }>({ 1: true, 2: true });
  const [playingStates, setPlayingStates] = useState<{ [key: number]: boolean }>({ 1: false, 2: false });
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const [videoUrls, setVideoUrls] = useState<{ [key: number]: string }>({
    1: 'https://res.cloudinary.com/dfahypfmr/video/upload/v1782840073/639057_b8z7yl.mp4',
    2: 'https://res.cloudinary.com/dfahypfmr/video/upload/v1782840074/639058_ul9hf2.mp4'
  });

  const handleVideoError = (id: number) => {
    console.warn(`Video ${id} failed to load from primary source. Activating fallback.`);
    const fallbacks: { [key: number]: string } = {
      1: 'https://vjs.zencdn.net/v/oceans.mp4',
      2: 'https://www.w3schools.com/html/mov_bbb.mp4'
    };
    if (videoUrls[id] !== fallbacks[id]) {
      setVideoUrls(prev => ({ ...prev, [id]: fallbacks[id] }));
    }
  };

  const videos: VideoProject[] = [
    {
      id: 1,
      title: 'Residência Gênesis',
      subtitle: 'Arquitetura de Alto Padrão',
      description: 'Filme conceito apresentando fachadas geométricas imponentes, piscinas aquecidas e maquetes 3D realistas.',
      url: videoUrls[1],
      tags: ['Fachada', 'Área Gourmet', 'Maquete 3D'],
    },
    {
      id: 2,
      title: 'Apartamento Lumina',
      subtitle: 'Design de Interiores Premium',
      description: 'Estudo de iluminação cênica integrada, circulação otimizada e materiais nobres aplicados a salas e quartos.',
      url: videoUrls[2],
      tags: ['Interiores', 'Luminotécnico', 'Mobiliário Nobre'],
    },
  ];

  const handlePlayPause = (id: number) => {
    const video = id === 1 ? videoRef1.current : videoRef2.current;
    if (!video) return;

    if (video.paused) {
      const otherVideo = id === 1 ? videoRef2.current : videoRef1.current;
      if (otherVideo) {
        otherVideo.pause();
        setPlayingStates(prev => ({ ...prev, [id === 1 ? 2 : 1]: false }));
      }

      video.muted = mutedStates[id];
      video.play()
        .then(() => {
          setPlayingStates(prev => ({ ...prev, [id]: true }));
        })
        .catch(() => {
          video.muted = true;
          setMutedStates(prev => ({ ...prev, [id]: true }));
          video.play().then(() => setPlayingStates(prev => ({ ...prev, [id]: true })));
        });
    } else {
      video.pause();
      setPlayingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  const toggleMute = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = id === 1 ? videoRef1.current : videoRef2.current;
    if (!video) return;
    video.muted = !video.muted;
    setMutedStates(prev => ({ ...prev, [id]: video.muted }));
  };

  // Intersection Observer to mute/pause videos offscreen
  useEffect(() => {
    if (activeTab !== 'videos') return;
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          video.pause();
          if (video === v1) setPlayingStates(prev => ({ ...prev, 1: false }));
          if (video === v2) setPlayingStates(prev => ({ ...prev, 2: false }));
        }
      });
    }, { threshold: 0.2 });

    if (v1) observer.observe(v1);
    if (v2) observer.observe(v2);

    return () => {
      if (v1) observer.unobserve(v1);
      if (v2) observer.unobserve(v2);
    };
  }, [activeTab]);

  return (
    <section id="projetos" className="py-24 bg-[#0A0A0A] relative overflow-hidden border-t border-b border-white/5">
      {/* Decorative ambiance backgrounds */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#C5A059]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-[#C5A059]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-none mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">Portfólio Exclusivo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
            Projetos <span className="italic font-medium text-[#C5A059]">Autorais</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light max-w-2xl mx-auto">
            Explore nossa curadoria de projetos residenciais e corporativos sob medida. Navegue entre fotografias realistas e filmes cinematográficos.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-[#121212] border border-white/10 p-1 rounded-none">
            <button
              onClick={() => setActiveTab('fotos')}
              className={`flex items-center space-x-2 px-6 py-3 text-xs uppercase tracking-widest font-mono font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'fotos'
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Fotos de Projetos</span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center space-x-2 px-6 py-3 text-xs uppercase tracking-widest font-mono font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'videos'
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Filmes de Projetos</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Area with smooth transitions */}
        <AnimatePresence mode="wait">
          {activeTab === 'fotos' ? (
            <motion.div
              key="photos-gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {NEW_PROJECT_IMAGES.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className="relative group aspect-[3/4] w-full bg-[#121212] border border-white/10 overflow-hidden cursor-pointer shadow-2xl hover:border-[#C5A059]/40 transition-all duration-500"
                >
                  {/* Subtle luxurious gold visual grid corner borders */}
                  <div className="absolute inset-3 border border-[#C5A059]/0 group-hover:border-[#C5A059]/20 transition-all duration-500 pointer-events-none z-10" />
                  
                  {/* Full image cover with zoom */}
                  <img
                    src={imgUrl}
                    alt={`Projeto Autoral ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark elegant gradient cover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top-right zoom action sign */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md p-2.5 border border-white/10 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-[#C5A059]" />
                  </div>

                  {/* Info label on hover */}
                  <div className="absolute bottom-5 inset-x-5 flex justify-between items-end transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div>
                      <span className="text-[9px] font-mono tracking-[0.25em] text-[#C5A059] uppercase font-bold">AMBIENTE EXCLUSIVO</span>
                      <h4 className="font-serif text-white font-medium text-base mt-1">Conceito Autoral 0{idx + 1}</h4>
                    </div>
                    <span className="text-white/60 font-mono text-[10px]">0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="videos-gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto"
            >
              {videos.map((vid) => {
                const isPlaying = playingStates[vid.id];
                const isMuted = mutedStates[vid.id];
                
                return (
                  <div key={vid.id} className="flex flex-col space-y-6 group">
                    {/* Portrait 9:16 Frame */}
                    <div
                      onClick={() => handlePlayPause(vid.id)}
                      className="relative aspect-[9/16] w-full max-w-[340px] mx-auto overflow-hidden bg-[#121212] border border-white/10 shadow-2xl cursor-pointer group/card hover:border-[#C5A059]/40 transition-all duration-500"
                    >
                      <div className="absolute inset-2 border border-[#C5A059]/0 group-hover/card:border-[#C5A059]/20 transition-all duration-500 pointer-events-none z-20" />
                      
                      <video
                        ref={vid.id === 1 ? videoRef1 : videoRef2}
                        src={vid.url}
                        loop
                        playsInline
                        muted={isMuted}
                        onError={() => handleVideoError(vid.id)}
                        className="w-full h-full object-cover pointer-events-none transition-transform duration-[2000ms] group-hover/card:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none z-10" />

                      {/* Header Badge indicators */}
                      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
                        <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
                          <Sparkles className="w-3 h-3 text-[#C5A059] animate-pulse" />
                          <span className="text-[9px] font-mono tracking-widest text-white">REEL</span>
                        </div>
                        <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
                          <span className="text-[8px] font-mono tracking-widest text-gray-300">LUANA FATEL TV</span>
                        </div>
                      </div>

                      {/* Huge Play overlay button */}
                      <AnimatePresence>
                        {!isPlaying && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                          >
                            <div className="w-16 h-16 bg-[#C5A059] text-black flex items-center justify-center rounded-full shadow-2xl transition-transform duration-300 group-hover/card:scale-110">
                              <Play className="w-7 h-7 fill-current translate-x-0.5" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Bottom labels and triggers */}
                      <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex flex-col justify-end space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {vid.tags.map((tag) => (
                            <span key={tag} className="text-[8px] font-mono bg-[#C5A059]/15 text-[#C5A059] px-2 py-0.5 border border-[#C5A059]/20 uppercase">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-serif text-lg text-white font-medium group-hover/card:text-[#C5A059] transition-colors duration-300">
                            {vid.title}
                          </h3>
                          <p className="text-xs font-mono text-gray-400">
                            {vid.subtitle}
                          </p>
                        </div>

                        {/* Interactive sound control */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
                          <div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors cursor-pointer" onClick={(e) => toggleMute(vid.id, e)}>
                            {isMuted ? (
                              <VolumeX className="w-4 h-4 text-gray-500" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-[#C5A059] animate-pulse" />
                            )}
                            <span className="text-[9px] font-mono tracking-wider">
                              {isMuted ? 'MUDO' : 'ÁUDIO ATIVO'}
                            </span>
                          </div>
                          
                          <div className="text-[9px] font-mono text-gray-400 flex items-center gap-1.5">
                            {isPlaying ? (
                              <>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <span>REPRODUZINDO</span>
                              </>
                            ) : (
                              <span>TOQUE PARA VER</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Under-card text details */}
                    <div className="max-w-[340px] mx-auto text-center md:text-left space-y-2">
                      <h4 className="text-white font-serif italic text-lg">{vid.title}</h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">
                        {vid.description}
                      </p>
                      <div className="pt-2">
                        <a 
                          href={CONTACT_INFO.links.hero}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#C5A059] uppercase tracking-widest hover:text-white transition-colors duration-300"
                        >
                          <span>Fazer um projeto assim</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Direct Portfolio 2026 Download Link */}
        <div className="max-w-4xl mx-auto mt-20 bg-gradient-to-br from-[#0D0D0D] to-[#121212] border border-white/5 p-8 sm:p-12 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="space-y-3 relative z-10 max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-[#C5A059]/10 border border-[#C5A059]/20 px-3 py-1 rounded-none">
              <FileDown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C5A059] font-semibold">Material Exclusivo</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
              Acesse Nosso <span className="italic text-[#C5A059] font-medium">Portfólio 2026</span> Completo
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              Faça o download instantâneo do catálogo digital em PDF de alta resolução com plantas baixas, detalhes de acabamento e conceitos exclusivos assinados por Luana Fatel.
            </p>
          </div>

          <div className="w-full sm:w-auto relative z-10 flex-shrink-0">
            <a
              id="download-portfolio-2026"
              href="https://drive.usercontent.google.com/download?id=1r9ReCCstgerEHqT5KlJ7MJblJscIblux&export=download&authuser=0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-white hover:bg-[#C5A059] text-black font-bold px-8 py-4.5 rounded-none text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-[1.03] active:scale-[0.98]"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Baixar Portfólio PDF</span>
            </a>
          </div>
        </div>

        {/* Custom Lightbox Modal Overlay for Photos */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 select-none"
            >
              {/* Close top right button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-[#C5A059] transition-colors p-2 cursor-pointer z-50 bg-white/5 rounded-none border border-white/10"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Fullscreen Picture Frame */}
              <div className="max-w-4xl w-full flex flex-col items-center space-y-6">
                <motion.div
                  initial={{ scale: 0.9, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 15 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[3/4] max-h-[70vh] border border-white/10 shadow-2xl overflow-hidden bg-black"
                >
                  <img
                    src={NEW_PROJECT_IMAGES[selectedPhotoIndex]}
                    alt={`Projeto Autoral Ampliado`}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Info and action line */}
                <div className="w-full max-w-2xl text-center space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase font-bold">AMBIENTE ARQUITETÔNICO EXCLUSIVO</span>
                    <h3 className="font-serif text-2xl text-white font-light">Projeto de Luxo • Conceito 0{selectedPhotoIndex + 1}</h3>
                  </div>

                  <p className="text-xs text-gray-400 font-light leading-relaxed max-w-md mx-auto">
                    Design contemporâneo autoral desenhado com iluminação integrada, materiais sustentáveis nobres e alto nível de conforto de Luana Fatel.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <a
                      href={CONTACT_INFO.links.hero}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#C5A059] hover:bg-[#b08b41] text-black font-semibold px-6 py-3.5 text-xs uppercase tracking-widest transition-colors duration-300 rounded-none shadow-lg shadow-black/40"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Falar sobre este estilo</span>
                    </a>
                    <button
                      onClick={() => setSelectedPhotoIndex(null)}
                      className="w-full sm:w-auto text-xs font-mono text-gray-400 hover:text-white uppercase tracking-widest border border-white/10 px-6 py-3.5 hover:bg-white/5 transition-all"
                    >
                      Voltar ao Portfólio
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
