import { useEffect, useRef, useState } from 'react';

// Redundant premium sources with the local custom file as primary
const SOUNDTRACK_SOURCES = [
  '/ambient-jazz.mp3',
  'https://res.cloudinary.com/dfahypfmr/video/upload/v1782844212/AUD-20260630-WA0012_ulk3x5.mp3'
];

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configured clear background level volume (50%)
    audio.volume = 0.50;

    const playAudio = () => {
      audio.play()
        .then(() => {
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
    };
  }, [sourceIndex]);

  // If a source fails to load, dynamically rotate to the next backup source to guarantee playback!
  const handleAudioError = () => {
    if (sourceIndex < SOUNDTRACK_SOURCES.length - 1) {
      console.log(`Source ${sourceIndex} failed. Falling back to source ${sourceIndex + 1}`);
      setSourceIndex(sourceIndex + 1);
    }
  };

  return (
    <audio
      ref={audioRef}
      src={SOUNDTRACK_SOURCES[sourceIndex]}
      loop
      autoPlay
      onError={handleAudioError}
      style={{ display: 'none' }}
    />
  );
}
