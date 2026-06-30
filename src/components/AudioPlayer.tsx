import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

// Redundant premium sources with the local custom file
const SOUNDTRACK_SOURCES = [
  'https://res.cloudinary.com/dfahypfmr/video/upload/v1782844212/AUD-20260630-WA0012_ulk3x5.mp3',
  '/ambient-jazz.mp3'
];

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configured high premium background level volume (80%)
    audio.volume = 0.80;

    const handlePlayState = () => {
      setIsPlaying(true);
    };

    const handlePauseState = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlayState);
    audio.addEventListener('pause', handlePauseState);

    const playAudio = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          // Playback succeeded! Remove listeners to avoid redundant calls
          removeInteractionListeners();
        })
        .catch((err) => {
          console.warn('Playback blocked by browser or source failed. Waiting for next interaction.', err);
        });
    };

    const handleInteraction = () => {
      playAudio();
    };

    const addInteractionListeners = () => {
      window.addEventListener('click', handleInteraction, { once: true, capture: true });
      window.addEventListener('touchstart', handleInteraction, { once: true, capture: true });
      window.addEventListener('scroll', handleInteraction, { once: true, capture: true });
      window.addEventListener('keydown', handleInteraction, { once: true, capture: true });
      window.addEventListener('mousemove', handleInteraction, { once: true, capture: true });
      window.addEventListener('mousedown', handleInteraction, { once: true, capture: true });
    };

    const removeInteractionListeners = () => {
      window.removeEventListener('click', handleInteraction, { capture: true });
      window.removeEventListener('touchstart', handleInteraction, { capture: true });
      window.removeEventListener('scroll', handleInteraction, { capture: true });
      window.removeEventListener('keydown', handleInteraction, { capture: true });
      window.removeEventListener('mousemove', handleInteraction, { capture: true });
      window.removeEventListener('mousedown', handleInteraction, { capture: true });
    };

    // Attempt immediately
    playAudio();

    // Register active user gesture listeners
    addInteractionListeners();

    return () => {
      removeInteractionListeners();
      audio.removeEventListener('play', handlePlayState);
      audio.removeEventListener('pause', handlePauseState);
    };
  }, [sourceIndex]);

  // If a source fails to load, dynamically rotate to the next backup source to guarantee playback!
  const handleAudioError = () => {
    if (sourceIndex < SOUNDTRACK_SOURCES.length - 1) {
      console.log(`Source ${sourceIndex} failed. Falling back to source ${sourceIndex + 1}`);
      setSourceIndex(sourceIndex + 1);
    }
  };

  const togglePlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Error starting playback manually:", err));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={SOUNDTRACK_SOURCES[sourceIndex]}
        loop
        autoPlay
        onError={handleAudioError}
        style={{ display: 'none' }}
      />

      {/* Elegant Floating Luxury Audio Control Widget */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center pointer-events-auto">
        <button
          onClick={togglePlayback}
          className="relative flex items-center space-x-3 bg-black/85 hover:bg-black backdrop-blur-md border border-[#C5A059]/30 hover:border-[#C5A059]/60 px-4 py-2.5 shadow-2xl transition-all duration-300 group hover:scale-105 active:scale-95"
          title={isPlaying ? "Pausar música" : "Tocar música"}
        >
          {/* Animated Wave Bars or Mute Icon */}
          <div className="w-5 h-5 flex items-center justify-center relative">
            {isPlaying ? (
              <div className="flex items-end space-x-[2px] h-3">
                <span className="w-[2px] bg-[#C5A059] rounded-none animate-soundwave-1" style={{ height: '4px' }} />
                <span className="w-[2px] bg-[#C5A059] rounded-none animate-soundwave-2" style={{ height: '10px' }} />
                <span className="w-[2px] bg-[#C5A059] rounded-none animate-soundwave-3" style={{ height: '7px' }} />
                <span className="w-[2px] bg-[#C5A059] rounded-none animate-soundwave-4" style={{ height: '11px' }} />
                <span className="w-[2px] bg-[#C5A059] rounded-none animate-soundwave-5" style={{ height: '5px' }} />
              </div>
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400 group-hover:text-[#C5A059] transition-colors" />
            )}
          </div>

          <div className="flex flex-col items-start leading-none select-none">
            <span className="text-[8px] font-mono text-gray-400 uppercase tracking-[0.2em]">Trilha Sonora</span>
            <span className="text-[10px] font-serif font-light text-white tracking-wider mt-0.5 flex items-center gap-1">
              {isPlaying ? "Jazz Ambiente" : "Som Desativado"}
              {isPlaying && <Sparkles className="w-2.5 h-2.5 text-[#C5A059] animate-pulse" />}
            </span>
          </div>
        </button>
      </div>
    </>
  );
}
