import { useState, useEffect } from 'react';
import { X, Gift, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or accepted the popup in this session
    const isDismissed = sessionStorage.getItem('exit_popup_dismissed');
    if (isDismissed) {
      return;
    }

    // 1. Mouse Leave detector (Desktop exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exit_popup_dismissed', 'true');
      }
    };

    // 2. Mobile / General Fallback Timer (triggers after 45 seconds)
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exit_popup_dismissed', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      
      {/* Outer Click dismisser */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Main Popup Modal */}
      <div className="bg-[#111111] border border-[#C5A059]/30 text-white rounded-none p-6 sm:p-10 max-w-lg w-full shadow-2xl relative z-10 overflow-hidden text-center transform scale-100 transition-transform duration-300">
        
        {/* Gold accent line or glow on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A059]/40 via-[#C5A059] to-[#C5A059]/40" />
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C5A059]/5 rounded-none blur-2xl" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-none text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Fechar popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Message */}
        <div className="space-y-6">
          
          <div className="w-16 h-16 bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] rounded-none flex items-center justify-center mx-auto shadow-inner">
            <Gift className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] font-bold text-[#C5A059] uppercase">
              Espere! Não vá embora ainda
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-tight">
              Garantimos sua <span className="font-serif italic font-medium text-[#C5A059]">Cortesia Exclusiva</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-md mx-auto">
              Sabemos que tomar a decisão de reformar ou construir exige planejamento. Por isso, queremos te dar uma ajudinha especial hoje.
            </p>
          </div>

          {/* Offer Details Box */}
          <div className="bg-white/5 border border-white/10 rounded-none p-5 text-left space-y-3 relative">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans font-bold text-sm text-[#C5A059]">Estudo Preliminar de Viabilidade Gratuito</h4>
                <p className="text-xs text-gray-400 mt-1 font-light leading-relaxed">
                  Análise técnica da sua planta ou terreno em Salvador/Feira para definir se suas ideias cabem no bolso e na metragem, sem quebrar normas.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 border-t border-white/5 pt-3 mt-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                Válido apenas fechando esta semana
              </span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider">100% Grátis</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              id="exit-intent-whatsapp-cta"
              href={CONTACT_INFO.links.popup}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="w-full flex items-center justify-center space-x-2 bg-[#C5A059] hover:bg-[#b18b41] text-black font-bold py-4 rounded-none text-xs uppercase tracking-widest transition-transform duration-300"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Garantir minha cortesia no WhatsApp</span>
            </a>
            
            <button
              onClick={handleClose}
              className="text-xs text-gray-500 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
            >
              Não, obrigado. Quero apenas sair.
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
