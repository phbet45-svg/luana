import { useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Defina o volume inicial em um nível de fundo agradável e discreto (35%)
    audio.volume = 0.35;

    const playAttempt = () => {
      audio.play()
        .then(() => {
          // Playback bem-sucedido! Remove os ouvintes para evitar chamadas extras
          removeInteractionListeners();
        })
        .catch(() => {
          // Bloqueado pelas políticas de autoplay do navegador; aguardará a primeira interação do usuário.
        });
    };

    const handleInteraction = () => {
      playAttempt();
    };

    const addInteractionListeners = () => {
      window.addEventListener('click', handleInteraction, { once: true, capture: true });
      window.addEventListener('touchstart', handleInteraction, { once: true, capture: true });
      window.addEventListener('scroll', handleInteraction, { once: true, capture: true });
      window.addEventListener('keydown', handleInteraction, { once: true, capture: true });
    };

    const removeInteractionListeners = () => {
      window.removeEventListener('click', handleInteraction, { capture: true });
      window.removeEventListener('touchstart', handleInteraction, { capture: true });
      window.removeEventListener('scroll', handleInteraction, { capture: true });
      window.removeEventListener('keydown', handleInteraction, { capture: true });
    };

    // Tenta reproduzir imediatamente ao carregar a página
    playAttempt();

    // Configura os ouvintes para detectar o primeiro gesto/interação do usuário
    addInteractionListeners();

    return () => {
      removeInteractionListeners();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="https://audionautix.com/Music/MidnightBlue.mp3"
      loop
      autoPlay
      style={{ display: 'none' }}
    />
  );
}
