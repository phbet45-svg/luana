import { useState, useEffect } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  // Show a simulated online text notification bubble after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Tooltip bubble (Clickable, pointer-events enabled) */}
      {showTooltip && (
        <div className="mb-3 bg-[#111111] text-white border border-[#C5A059]/30 p-3.5 rounded-none shadow-2xl max-w-xs pointer-events-auto animate-bounce relative">
          {/* Close tiny button */}
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-2 text-gray-400 hover:text-white text-xs"
          >
            ×
          </button>
          
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-none h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-[#C5A059] uppercase tracking-wider flex items-center gap-1">
              Luana Fatel
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
            </span>
          </div>
          
          <p className="text-xs text-gray-300 mt-1 font-light leading-snug pr-3">
            Olá! Vamos conversar sobre o seu projeto? Fale comigo agora.
          </p>
          
          {/* Tiny decorative triangle pointer on bottom right */}
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-[#111111] border-r border-b border-[#C5A059]/30 rotate-45" />
        </div>
      )}

      {/* Main Pulse Action button (Pointer-events enabled) */}
      <a
        id="floating-whatsapp-action"
        href={CONTACT_INFO.links.floating}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 pointer-events-auto group"
        title="Falar no WhatsApp"
        onClick={() => setShowTooltip(false)}
      >
        {/* Animated concentric ring glows */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping opacity-75 -z-10" />
        
        <MessageSquare className="w-6 h-6 fill-current transition-transform duration-300 group-hover:rotate-12" />
      </a>

    </div>
  );
}
