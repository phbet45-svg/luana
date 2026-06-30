import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkipForward, Sparkles } from 'lucide-react';
import { IMAGES } from '../data';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isPlaying, setIsPlaying] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const TOTAL_DURATION = 7000; // Exact 7-second runtime

  // Manage progress & completion over exactly 7 seconds
  useEffect(() => {
    const startTime = Date.now();
    
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= TOTAL_DURATION) {
        handleFinish();
      }
    }, 16);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Canvas particle logic representing luxurious golden dust/light rays emerging from facade
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

    // Golden hour facade emitter coordinates (relative positions matching windows/doors of the luxury house)
    const getEmitterPoints = () => {
      const w = canvas.width;
      const h = canvas.height;
      return [
        { x: w * 0.5, y: h * 0.65, name: 'main_door' },      // Main glass entrance
        { x: w * 0.32, y: h * 0.6, name: 'left_window' },     // Left glass facade
        { x: w * 0.68, y: h * 0.58, name: 'right_window' },   // Right cantilever wing
      ];
    };

    interface GoldenParticle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      opacity: number;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;
      angle: number;
      spinSpeed: number;
      isSparkle: boolean;
      color: string;
    }

    const particles: GoldenParticle[] = [];
    const maxParticles = 90;

    const spawnParticle = (emitterX: number, emitterY: number) => {
      const targetX = canvas.width * 0.5 + (Math.random() - 0.5) * 400;
      const targetY = canvas.height * 0.5 + (Math.random() - 0.5) * 200;
      const maxLife = 120 + Math.random() * 80;

      // Luxurious warm gold colors
      const colors = [
        'rgba(255, 242, 212, 0.95)', // Bright platinum gold
        'rgba(239, 186, 115, 0.85)', // Warm ocher gold
        'rgba(197, 160, 89, 0.75)',  // Luana Fatel Signature Gold
        'rgba(255, 215, 0, 0.8)'     // Pure gold sparkle
      ];

      particles.push({
        x: emitterX + (Math.random() - 0.5) * 40,
        y: emitterY + (Math.random() - 0.5) * 20,
        targetX,
        targetY,
        size: Math.random() * 2.2 + 0.6,
        opacity: Math.random() * 0.4 + 0.6,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: -Math.random() * 2.5 - 0.8, // Elegant upward push
        life: 0,
        maxLife,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.04,
        isSparkle: Math.random() < 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    // Draw luxury four-pointed glowing star
    const drawSparkleStar = (cCtx: CanvasRenderingContext2D, x: number, y: number, size: number, op: number) => {
      cCtx.save();
      cCtx.beginPath();
      cCtx.translate(x, y);
      cCtx.moveTo(0, -size * 3.5);
      cCtx.quadraticCurveTo(0, 0, size * 3.5, 0);
      cCtx.quadraticCurveTo(0, 0, 0, size * 3.5);
      cCtx.quadraticCurveTo(0, 0, -size * 3.5, 0);
      cCtx.quadraticCurveTo(0, 0, 0, -size * 3.5);
      cCtx.closePath();
      cCtx.fillStyle = `rgba(255, 242, 212, ${op})`;
      cCtx.shadowColor = 'rgba(197, 160, 89, 0.9)';
      cCtx.shadowBlur = size * 5;
      cCtx.fill();
      cCtx.restore();
    };

    // Rendering loop
    let frameCount = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      const emitters = getEmitterPoints();

      // Emit particles gently over time, especially during first 5 seconds
      if (particles.length < maxParticles && frameCount % 2 === 0) {
        emitters.forEach(emitter => {
          if (Math.random() < 0.5) {
            spawnParticle(emitter.x, emitter.y);
          }
        });
      }

      // Draw subtle warm glowing rays originating from the house window emitters
      emitters.forEach((emitter, idx) => {
        const pulse = 1 + Math.sin(frameCount * 0.02 + idx) * 0.15;
        const gradient = ctx.createRadialGradient(
          emitter.x, emitter.y, 0,
          emitter.x, emitter.y, 160 * pulse
        );
        gradient.addColorStop(0, 'rgba(197, 160, 89, 0.18)');
        gradient.addColorStop(0.3, 'rgba(197, 160, 89, 0.05)');
        gradient.addColorStop(1, 'rgba(197, 160, 89, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(emitter.x, emitter.y, 160 * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Calculate progress through life
        const lifeRatio = p.life / p.maxLife;

        // Elegant flow: start at emitter, drift up, then get softly attracted to center where title forms
        const centerGravityX = canvas.width * 0.5;
        const centerGravityY = canvas.height * 0.5;

        // Blend initial drift speed with soft magnetic pull to title
        const attractionStrength = Math.min(1, Math.max(0, (lifeRatio - 0.2) * 1.5));
        
        const idealX = p.x + p.speedX;
        const idealY = p.y + p.speedY;

        p.x = idealX * (1 - attractionStrength * 0.02) + centerGravityX * (attractionStrength * 0.02);
        p.y = idealY * (1 - attractionStrength * 0.02) + centerGravityY * (attractionStrength * 0.02);

        // Spin angle for sparkling oscillation
        p.angle += p.spinSpeed;

        // Fade in at spawn, and fade out at end of life
        let currentOpacity = p.opacity;
        if (lifeRatio < 0.2) {
          currentOpacity = p.opacity * (lifeRatio / 0.2);
        } else if (lifeRatio > 0.8) {
          currentOpacity = p.opacity * ((1 - lifeRatio) / 0.2);
        }

        // Apply shimmering pulse effect
        currentOpacity *= (0.7 + Math.sin(p.angle * 4) * 0.3);

        if (p.isSparkle) {
          drawSparkleStar(ctx, p.x, p.y, p.size, currentOpacity);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${currentOpacity})`);
          ctx.shadowColor = 'rgba(197, 160, 89, 0.6)';
          ctx.shadowBlur = p.size * 3;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }

        // Remove dead particles
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

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
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    onComplete();
  };

  // Skip progress circumference values
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          id="cinematic-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(15px)' }}
          transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] select-none overflow-hidden flex flex-col items-center justify-center"
        >
          {/* Film projection screen line effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%)] bg-[length:100%_4px] pointer-events-none opacity-25 z-20" />

          {/* 1. Cinematic Luxury Contemporary House at Golden Hour Background */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <motion.div
              initial={{ scale: 1.25, y: -20, filter: 'brightness(0.25) contrast(1.1) saturate(0.85)' }}
              animate={{ scale: 1.05, y: 0, filter: 'brightness(0.55) contrast(1.1) saturate(1.1)' }}
              transition={{ duration: 7.0, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={IMAGES.heroLuxury}
                alt="Fachada Contemporânea Luana Fatel"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Premium Golden Vignette Overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0A0A]/60 to-[#0A0A0A] z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10 pointer-events-none" />
            
            {/* Ambient luxury golden hour light flare pulse */}
            <motion.div 
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.15, 0.42, 0.2] }}
              transition={{ duration: 7.0, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-tr from-[#C5A059]/5 via-transparent to-[#C5A059]/10 z-10 pointer-events-none mix-blend-color-dodge"
            />
          </div>

          {/* 2. Floating Golden Particles Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          />

          {/* 4. Centered Sophisticated Typography Reveal */}
          <div className="relative z-30 flex flex-col items-center text-center max-w-4xl px-6 select-none">
            <div style={{ perspective: 1200 }} className="space-y-6">
              
              {/* Pre-title with mini luxury element */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.0, ease: 'easeOut' }}
                className="flex items-center justify-center space-x-2 text-[#DFBA73]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-[10px] font-mono font-semibold tracking-[0.4em] uppercase text-amber-100/90">
                  ARQUITETURA AUTORAL DE LUXO
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              </motion.div>

              {/* Sophisticated Metallic Gold Brand Title */}
              <motion.h1
                initial={{ 
                  opacity: 0, 
                  scale: 0.5, 
                  z: -300, 
                  rotateX: 25, 
                  filter: 'blur(10px) brightness(2.5)' 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  z: 0, 
                  rotateX: 0, 
                  filter: 'blur(0px) brightness(1)' 
                }}
                transition={{ 
                  delay: 1.4, 
                  duration: 2.8, 
                  ease: [0.19, 1, 0.22, 1] 
                }}
                className="font-serif text-5xl sm:text-6xl md:text-7xl font-extralight tracking-[0.3em] flex flex-wrap items-center justify-center gap-x-6 leading-none select-none text-center"
              >
                {/* Refined Serif LUANA */}
                <span className="font-serif italic text-[#FFF2D4] font-light tracking-[0.25em] drop-shadow-[0_2px_15px_rgba(255,242,212,0.15)]">
                  LUANA
                </span>
                {/* Modern clean sans-serif FATEL with luxurious metallic gold gradient */}
                <span className="font-sans font-light tracking-[0.32em] bg-clip-text text-transparent bg-gradient-to-r from-[#DFBA73] via-[#FFF2D4] to-[#C5A059] filter drop-shadow-[0_4px_15px_rgba(197,160,89,0.4)]">
                  FATEL
                </span>
              </motion.h1>

              {/* Sub-brand Statement and Localization with precise letter tracking */}
              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8, duration: 1.5, ease: 'easeOut' }}
                  className="font-serif italic font-light text-base sm:text-lg md:text-xl text-amber-100/85 tracking-widest"
                >
                  "A casa onde você vive influencia diretamente em quem você é"
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 3.4, duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                  className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent mx-auto"
                />

                <motion.div
                  initial={{ opacity: 0, tracking: '0.2em', y: 10 }}
                  animate={{ opacity: 1, tracking: '0.5em', y: 0 }}
                  transition={{ delay: 3.8, duration: 2.2, ease: [0.19, 1, 0.22, 1] }}
                  className="text-[9px] sm:text-[11px] font-mono font-light text-white tracking-[0.5em] uppercase"
                >
                  ARQUITETURA & INTERIORES DE ALTO PADRÃO
                </motion.div>

                {/* Refined gold sound activator guidance */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1.0, 0.4] }}
                  transition={{ delay: 4.4, duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-[8px] sm:text-[9px] font-mono font-bold text-[#C5A059] tracking-[0.25em] uppercase flex items-center justify-center gap-2 pt-4 select-none"
                >
                  <span>🔊 TOQUE EM QUALQUER LUGAR PARA ATIVAR O SOM AMBIENTE</span>
                </motion.div>
              </div>

            </div>
          </div>

          {/* 5. Elegant Bottom Right Skip Button with circular progress countdown */}
          <div className="absolute bottom-10 right-10 z-50">
            <button
              onClick={handleFinish}
              className="group flex items-center space-x-3.5 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 hover:border-[#C5A059]/40 px-5 py-3 transition-all duration-300 rounded-none cursor-pointer"
            >
              {/* Circular countdown progress ring */}
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.5"
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
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Pular</span>
                <span className="text-[11px] font-serif font-bold text-white tracking-widest mt-0.5">
                  0{Math.max(0, 7 - Math.floor(progress / 14.28))}s
                </span>
              </div>
            </button>
          </div>

          {/* 6. Footer Luxury Brand Stamp */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 opacity-45">
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-gray-500">
              © LUANA FATEL • ATELIÊ DE ARQUITETURA
            </p>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
