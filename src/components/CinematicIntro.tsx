import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, SkipForward, Sparkles } from 'lucide-react';
import { IMAGES } from '../data';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentScene, setCurrentScene] = useState<1 | 2 | 3>(1);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<AudioNode[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Duration is exactly 7000ms
  const TOTAL_DURATION = 7000;

  // Manage scenes based on elapsed time
  useEffect(() => {
    const startTime = Date.now();
    
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(currentProgress);

      // Scene timings
      // 0 to 2 seconds (0% to 28.5%) -> Scene 1
      // 2 to 5 seconds (28.5% to 71.4%) -> Scene 2
      // 5 to 7 seconds (71.4% to 100%) -> Scene 3
      if (elapsed < 2000) {
        setCurrentScene(1);
      } else if (elapsed < 5000) {
        setCurrentScene(2);
      } else {
        setCurrentScene(3);
      }

      if (elapsed >= TOTAL_DURATION) {
        handleFinish();
      }
    }, 16); // High-frequency update for smooth progress & SVG countdown

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Web Audio API Cinematic Synthesizer
  // Generates a rich, luxurious, spatial piano + string-pad chord progression
  const playCinematicSound = (timeOffset: number, chordIndex: number) => {
    try {
      if (!audioCtxRef.current || isMuted) return;

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Chord definitions (frequencies in Hz)
      // Am9 (A2, A3, C4, E4, G4, B4) -> Mysterious & luxurious intro
      // Fmaj9 (F2, F3, A3, C4, E4, G4) -> Soaring, warm architectural revelation
      // Cmaj9 (C2, C3, E3, G3, B3, D4) -> Resolved, stable, highly harmonious and prestigious
      const chords = [
        [110.00, 220.00, 261.63, 329.63, 392.00, 493.88], // Am9
        [87.31, 174.61, 220.00, 261.63, 329.63, 392.00],  // Fmaj9
        [65.41, 130.81, 164.81, 196.00, 246.94, 293.66],  // Cmaj9
      ];

      const frequencies = chords[chordIndex] || chords[0];

      // Create a master delay & filter to make it sound spacious and high-end
      const delayNode = ctx.createDelay(1.0);
      delayNode.delayTime.value = 0.45;

      const delayFeedback = ctx.createGain();
      delayFeedback.gain.value = 0.4;

      const filterNode = ctx.createBiquadFilter();
      filterNode.type = 'lowpass';
      filterNode.frequency.value = 1200; // Warm, non-harsh high frequencies

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.25; // Balanced volume

      // Connections
      delayNode.connect(delayFeedback);
      delayFeedback.connect(delayNode); // feedback loop
      
      // Route oscillators to delay and directly to filter
      filterNode.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Arpeggiate the notes slightly for a realistic human touch
      frequencies.forEach((freq, idx) => {
        const noteDelay = idx * 0.12; // 120ms arpeggiation delay
        const startTime = now + noteDelay;

        // 1. PIANO PLUCK (Triangle wave with rapid decay)
        const oscPiano = ctx.createOscillator();
        oscPiano.type = 'triangle';
        oscPiano.frequency.value = freq;

        const gainPiano = ctx.createGain();
        gainPiano.gain.setValueAtTime(0, startTime);
        gainPiano.gain.linearRampToValueAtTime(0.18, startTime + 0.05); // quick attack
        gainPiano.gain.exponentialRampToValueAtTime(0.001, startTime + 2.5); // long organic decay

        oscPiano.connect(gainPiano);
        gainPiano.connect(filterNode);
        gainPiano.connect(delayNode); // feed into luxury echo

        // 2. ORCHESTRAL STRING PAD (Sine wave with slow attack and very long release)
        const oscString = ctx.createOscillator();
        oscString.type = 'sine';
        oscString.frequency.value = freq;

        const gainString = ctx.createGain();
        gainString.gain.setValueAtTime(0, startTime);
        gainString.gain.linearRampToValueAtTime(0.08, startTime + 1.2); // very slow majestic fade-in
        gainString.gain.exponentialRampToValueAtTime(0.001, startTime + 4.5); // slow cloud-like fade-out

        oscString.connect(gainString);
        gainString.connect(filterNode);

        // Start both generators
        oscPiano.start(startTime);
        oscPiano.stop(startTime + 3.0);
        oscString.start(startTime);
        oscString.stop(startTime + 5.0);

        // Keep track to clean up if skip is clicked
        synthNodesRef.current.push(oscPiano, oscString, gainPiano, gainString);
      });

      // Keep track of master nodes
      synthNodesRef.current.push(delayNode, delayFeedback, filterNode, masterGain);
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  };

  // Trigger synth notes according to scenes
  useEffect(() => {
    if (isMuted) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (currentScene === 1) {
      playCinematicSound(0, 0); // Am9 Chord at start
    } else if (currentScene === 2) {
      playCinematicSound(2000, 1); // Fmaj9 Chord at 2s
    } else if (currentScene === 3) {
      playCinematicSound(5000, 2); // Cmaj9 Chord at 5s
    }
  }, [currentScene, isMuted]);

  // Handle Unmute
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setHasStartedAudio(true);
      // Immediately play current scene's chord upon unmuting
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      playCinematicSound(0, currentScene - 1);
    } else {
      setIsMuted(true);
      stopAudio();
    }
  };

  const stopAudio = () => {
    synthNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node) (node as any).stop();
        node.disconnect();
      } catch (e) {}
    });
    synthNodesRef.current = [];
  };

  // Canvas Golden Dust Floating Particle Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Create particles (increased count to 70 for richer visuals)
    const particleCount = 70;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      isStar: boolean; // 35% of particles will be luxurious 4-pointed stars
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.0 + 0.5,
        speedX: (Math.random() - 0.2) * 0.3, // Slow premium drift to the right
        speedY: -(Math.random() * 0.5 + 0.1),  // Soft slow upward drift
        opacity: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.04 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        isStar: Math.random() < 0.35,
      });
    }

    // Light Sheen Glide position tracker
    let sheenX = -canvas.width * 0.5;

    // Helper to draw beautiful four pointed luxurious curved star
    const drawFourPointStar = (cContext: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      cContext.save();
      cContext.beginPath();
      cContext.translate(x, y);
      cContext.moveTo(0, -size);
      cContext.quadraticCurveTo(0, 0, size, 0);
      cContext.quadraticCurveTo(0, 0, 0, size);
      cContext.quadraticCurveTo(0, 0, -size, 0);
      cContext.quadraticCurveTo(0, 0, 0, -size);
      cContext.closePath();
      cContext.fillStyle = `rgba(238, 201, 121, ${opacity})`;
      cContext.shadowColor = 'rgba(197, 160, 89, 0.7)';
      cContext.shadowBlur = size * 3;
      cContext.fill();
      cContext.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw luxurious sliding golden light sheen across the screen
      sheenX += 1.8;
      if (sheenX > canvas.width * 2) {
        sheenX = -canvas.width * 0.8;
      }
      const sheenGrad = ctx.createLinearGradient(sheenX - 250, 0, sheenX + 250, canvas.height);
      sheenGrad.addColorStop(0, 'rgba(197, 160, 89, 0)');
      sheenGrad.addColorStop(0.5, 'rgba(197, 160, 89, 0.08)'); // subtle premium lens sheen
      sheenGrad.addColorStop(1, 'rgba(197, 160, 89, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw standard and star-shaped particles
      particles.forEach((p) => {
        // Drift movement
        p.x += p.x > canvas.width + 10 ? -canvas.width - 20 : p.speedX;
        p.y += p.y < -10 ? canvas.height + 20 : p.speedY;

        // Subtle luminosity pulse
        p.pulsePhase += p.pulseSpeed;
        const currentOpacity = Math.max(0.1, p.opacity + Math.sin(p.pulsePhase) * 0.2);

        if (p.isStar) {
          // Draw a luxurious four-pointed sparkling star
          const starSize = p.radius * 2.8;
          drawFourPointStar(ctx, p.x, p.y, starSize, currentOpacity);
        } else {
          // Draw luxurious glowing gold round dust
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(197, 160, 89, ${currentOpacity})`;
          ctx.shadowColor = 'rgba(197, 160, 89, 0.5)';
          ctx.shadowBlur = p.radius * 3.5;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleFinish = () => {
    setIsPlaying(false);
    stopAudio();
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    onComplete();
  };

  // SVG Circular countdown calculation
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          id="cinematic-intro-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(15px)' }}
          transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] select-none overflow-hidden flex flex-col items-center justify-center"
        >
          {/* Subtle horizontal movie projection line grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20 z-10" />

          {/* Background Cinematic Visual Scenes */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 0.85, scale: 1.05 }}
              transition={{ duration: 7.0, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={IMAGES.heroLuxury}
                alt="Intro Luxo"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Dark vignette cinematic gradient shadow overlay - darkened for text readability */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/85 via-transparent to-[#0A0A0A]/90 pointer-events-none" />
          </div>

          {/* Floating glowing golden dust particles canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80"
          />

          {/* Top Audio / Sound Experience Prompt */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
            <motion.button
              onClick={toggleMute}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="group flex items-center space-x-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A059]/40 px-4 py-2 text-[10px] tracking-[0.2em] font-mono font-medium text-white uppercase transition-all duration-300 rounded-none cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C5A059]" />
                  <span className="text-gray-300 group-hover:text-white">Ativar trilha de som</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                  <span className="text-[#C5A059]">Som Ativado</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Centered Typography Elements */}
          <div className="relative z-30 flex flex-col items-center text-center max-w-4xl px-6 select-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center space-x-2 text-[#C5A059]">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-[10px] font-mono font-semibold tracking-[0.3em] uppercase">Luana Fatel</span>
              </div>
              
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-extralight tracking-[0.25em] text-white">
                LUANA FATEL
              </h1>
              
              <div className="space-y-4">
                <p className="font-serif italic font-light text-xl sm:text-2xl md:text-3xl text-gradient text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-100 to-[#C5A059] tracking-wide leading-relaxed">
                  "Arquitetura que traduz a sua essência"
                </p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="inline-block border-t border-b border-white/10 py-2.5 px-6"
                >
                  <p className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.25em] text-white uppercase">
                    PROJETOS RESIDENCIAIS & INTERIORES • FEIRA DE SANTANA • SALVADOR
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Right Corner: Circular Countdown Skip Button */}
          <div className="absolute bottom-10 right-10 z-50">
            <button
              onClick={handleFinish}
              className="group flex items-center space-x-3.5 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-[#C5A059]/40 px-5 py-3 transition-all duration-300 rounded-none cursor-pointer"
            >
              {/* Skip icon or countdown progress ring */}
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    fill="transparent"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    stroke="#C5A059"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-150"
                  />
                </svg>
                <SkipForward className="w-3.5 h-3.5 text-white group-hover:text-[#C5A059] transition-colors" />
              </div>

              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Pular Intro</span>
                <span className="text-[11px] font-serif font-bold text-white tracking-widest mt-0.5">
                  0{Math.max(0, 7 - Math.floor(progress / 14.2))}s
                </span>
              </div>
            </button>
          </div>

          {/* Interactive instruction indicator at bottom center */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 opacity-45">
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-gray-500">
              Experiência Cinematográfica Ativa • Luana Fatel
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
