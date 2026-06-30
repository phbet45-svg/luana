import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  tags: string[];
}

export default function VideoGallery() {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [mutedStates, setMutedStates] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
  });
  const [playingStates, setPlayingStates] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
  });

  // Stable React refs for absolute reference stability across renders
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  // Dynamic state for self-healing, CORS-resilient streaming URLs
  const [videoUrls, setVideoUrls] = useState<{ [key: number]: string }>({
    1: 'https://res.cloudinary.com/dfahypfmr/video/upload/v1782840073/639057_b8z7yl.mp4',
    2: 'https://res.cloudinary.com/dfahypfmr/video/upload/v1782840074/639058_ul9hf2.mp4'
  });

  const handleVideoError = (id: number) => {
    console.warn(`Video ${id} failed to load from primary Cloudinary source. Activating bulletproof fallback URL.`);
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
      title: 'Projeto 1',
      subtitle: 'Arquitetura Residencial',
      description: 'Vídeo conceito integrando fachadas modernas, piscinas luxuosas de alto padrão e renderização 3D detalhada com interiores acolhedores e elegantes.',
      url: videoUrls[1],
      tags: ['Fachada', 'Área Externa', 'Maquete 3D'],
    },
    {
      id: 2,
      title: 'Projeto 2',
      subtitle: 'Design de Interiores',
      description: 'Exploração de interiores focada em luz natural abundante, mobiliário sofisticado e uma circulação integrada que promove fluidez e calma ao ambiente.',
      url: videoUrls[2],
      tags: ['Design de Interiores', 'Iluminação', 'Mobiliário Curado'],
    },
  ];

  const handlePlayPause = (id: number) => {
    const video = id === 1 ? videoRef1.current : videoRef2.current;
    if (!video) return;

    if (video.paused) {
      // Pause other video first
      const otherVideo = id === 1 ? videoRef2.current : videoRef1.current;
      if (otherVideo) {
        otherVideo.pause();
        setPlayingStates(prev => ({ ...prev, [id === 1 ? 2 : 1]: false }));
      }

      // Start muted to bypass aggressive browser autoplays / security blocks
      video.muted = mutedStates[id];
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingStates(prev => ({ ...prev, [id]: true }));
            setActiveVideoId(id);
          })
          .catch((err) => {
            console.warn(`Autoplay blocked on video ${id}, retrying in fully muted mode...`, err);
            // Automatic browser policy compliance fallback
            video.muted = true;
            setMutedStates(prev => ({ ...prev, [id]: true }));
            video.play()
              .then(() => {
                setPlayingStates(prev => ({ ...prev, [id]: true }));
                setActiveVideoId(id);
              })
              .catch((err2) => {
                console.error("Muted playback also blocked by browser sandbox. Fallback to native interactive mode.", err2);
                video.controls = true;
              });
          });
      }
    } else {
      video.pause();
      setPlayingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  const toggleMute = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent trigger of card play click
    const video = id === 1 ? videoRef1.current : videoRef2.current;
    if (!video) return;

    video.muted = !video.muted;
    setMutedStates(prev => ({ ...prev, [id]: video.muted }));
  };

  // Intersection Observer to auto play/pause when in view
  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;

    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && v1) {
            v1.pause();
            setPlayingStates((prev) => ({ ...prev, 1: false }));
          }
        });
      },
      { threshold: 0.3 }
    );

    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && v2) {
            v2.pause();
            setPlayingStates((prev) => ({ ...prev, 2: false }));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (v1) observer1.observe(v1);
    if (v2) observer2.observe(v2);

    return () => {
      if (v1) observer1.unobserve(v1);
      if (v2) observer2.unobserve(v2);
    };
  }, []);

  return (
    <section id="videos" className="py-24 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      {/* Decorative luxury backgrounds */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Elegant geometric vertical gold line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/10 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-none mb-1">
            <Film className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">Portfólio Cinematográfico</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
            Experiencie Nossos Projetos <br />
            <span className="italic font-medium text-[#C5A059]">Em Movimento</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light max-w-2xl mx-auto">
            Mais do que imagens estáticas, criamos experiências espaciais completas. Veja em detalhes a iluminação dinâmica, a transição fluida de materiais e a harmonia real de nossas obras finalizadas.
          </p>
        </div>

        {/* Video Grid - Featuring beautiful reels/vertical cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {videos.map((vid) => {
            const isPlaying = playingStates[vid.id];
            const isMuted = mutedStates[vid.id];
            
            return (
              <div 
                key={vid.id}
                className="flex flex-col space-y-6 group"
              >
                {/* 9:16 Aspect Ratio Reels Frame */}
                <div 
                  id={`video-card-${vid.id}`}
                  onClick={() => handlePlayPause(vid.id)}
                  className="relative aspect-[9/16] w-full max-w-[360px] mx-auto rounded-none overflow-hidden bg-[#121212] border border-white/10 shadow-2xl cursor-pointer group/card hover:border-[#C5A059]/50 transition-all duration-500"
                >
                  {/* Decorative golden frame borders on hover */}
                  <div className="absolute inset-2 border border-[#C5A059]/0 group-hover/card:border-[#C5A059]/20 transition-all duration-500 pointer-events-none z-20" />
                  
                  {/* Video Element with resilient source-healing */}
                  <video
                    ref={vid.id === 1 ? videoRef1 : videoRef2}
                    src={vid.url}
                    loop
                    playsInline
                    muted={isMuted}
                    onError={() => handleVideoError(vid.id)}
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-[2000ms] ease-out group-hover/card:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 pointer-events-none z-10" />

                  {/* Top Bar Indicators */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
                    <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
                      <Sparkles className="w-3 h-3 text-[#C5A059] animate-pulse" />
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white">REEL</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-1 border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
                      <span className="text-[8px] font-mono uppercase tracking-widest text-gray-300">FATEL TV</span>
                    </div>
                  </div>

                  {/* Big Play Button Overlay when not playing */}
                  <AnimatePresence>
                    {!isPlaying && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                      >
                        <div className="w-16 h-16 bg-[#C5A059] text-black flex items-center justify-center rounded-full shadow-2xl transform transition-transform duration-300 group-hover/card:scale-110">
                          <Play className="w-7 h-7 fill-current translate-x-0.5" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Controls / Text Details */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex flex-col justify-end space-y-4">
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {vid.tags.map((tag) => (
                        <span key={tag} className="text-[8px] font-mono bg-[#C5A059]/10 text-[#C5A059] px-2 py-0.5 border border-[#C5A059]/20 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Titles */}
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg text-white font-medium group-hover/card:text-[#C5A059] transition-colors duration-300">
                        {vid.title}
                      </h3>
                      <p className="text-xs font-mono text-gray-400">
                        {vid.subtitle}
                      </p>
                    </div>

                    {/* Progress line and Sound Controller */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300" onClick={(e) => toggleMute(vid.id, e)}>
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-[#C5A059]" />
                        )}
                        <span className="text-[10px] font-mono tracking-wider">
                          {isMuted ? 'MUDO' : 'ÁUDIO ATIVO'}
                        </span>
                      </div>
                      
                      <div className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                        {isPlaying ? (
                          <>
                            <span className="w-1.5 h-1.5 bg-[#34A853] rounded-full animate-pulse" />
                            <span>REPRODUZINDO</span>
                          </>
                        ) : (
                          <span>CLIQUE PARA ASSISTIR</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Description Block Under Card */}
                <div className="max-w-[360px] mx-auto text-center md:text-left space-y-2">
                  <h4 className="text-white font-serif italic text-lg">{vid.title}</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {vid.description}
                  </p>
                  <div className="pt-2">
                    <a 
                      href="#contato"
                      className="inline-flex items-center space-x-1 text-xs font-mono text-[#C5A059] uppercase tracking-widest hover:text-white transition-colors duration-300"
                    >
                      <span>Quero um projeto assim</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
