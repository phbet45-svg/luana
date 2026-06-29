import { Star, ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function GoogleCertificate() {
  return (
    <div className="w-full">
      {/* Authentic Google Certificate Card */}
      <div 
        id="google-review-certificate"
        className="relative overflow-hidden bg-gradient-to-b from-[#141414] to-[#0D0D0D] border-2 border-[#C5A059]/40 p-8 sm:p-10 shadow-2xl text-left"
      >
        {/* Decorative Luxury Certificate Border Accent */}
        <div className="absolute inset-2 border border-white/5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#C5A059] pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#C5A059] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#C5A059] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#C5A059] pointer-events-none" />

        {/* Ambient Subtle Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          
          {/* Left Block: Google Logo & Title */}
          <div className="space-y-5 text-center md:text-left flex-1">
            
            {/* Google Verified Logo Combo */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              {/* Official Google G Logo SVG */}
              <div className="bg-white p-2.5 rounded-full shadow-md inline-flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8" referrerPolicy="no-referrer">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  <span className="font-serif text-lg font-bold text-white tracking-wide">Google</span>
                  <span className="font-sans text-xs font-medium text-gray-400 bg-white/5 border border-white/15 px-2 py-0.5 rounded-none">Empresa Verificada</span>
                </div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] mt-0.5">Certificado de Excelência</p>
              </div>
            </div>

            {/* Certificate Header Statement */}
            <div className="space-y-2">
              <h4 className="font-serif text-xl sm:text-2xl font-light text-white leading-snug">
                Autenticidade e Satisfação <span className="font-serif italic font-medium text-[#C5A059]">Garantidas</span>
              </h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl">
                O selo de avaliação Google certifica o alto padrão de comprometimento técnico, criatividade arquitetônica e satisfação extrema comprovada por clientes reais de Luana Fatel na Bahia.
              </p>
            </div>

            {/* Badges of guarantee */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C5A059]" />
                <span>Avaliações Auditadas</span>
              </div>
              <span className="text-white/20 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Perfil 100% Autêntico</span>
              </div>
            </div>

          </div>

          {/* Right Block: Golden 4.9 Star Rating Shield */}
          <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 p-6 sm:p-8 min-w-[240px] text-center space-y-4 shadow-inner relative">
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
              <span className="text-[8px] font-mono tracking-widest text-[#34A853] uppercase">Ativo</span>
            </div>
            
            <span className="text-xs font-mono text-gray-400 tracking-wider uppercase block">Média Geral no Google</span>
            
            {/* Rating Number */}
            <div className="space-y-1">
              <div className="text-5xl sm:text-6xl font-serif font-bold text-white tracking-tighter flex items-baseline justify-center">
                <span>4.9</span>
                <span className="text-xl sm:text-2xl text-gray-400 font-light">/5.0</span>
              </div>
              <div className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest">Altamente Recomendada</div>
            </div>

            {/* 4.9 Stars visualization */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center space-x-1">
                {/* Star 1 */}
                <Star className="w-6 h-6 fill-[#C5A059] text-[#C5A059]" />
                {/* Star 2 */}
                <Star className="w-6 h-6 fill-[#C5A059] text-[#C5A059]" />
                {/* Star 3 */}
                <Star className="w-6 h-6 fill-[#C5A059] text-[#C5A059]" />
                {/* Star 4 */}
                <Star className="w-6 h-6 fill-[#C5A059] text-[#C5A059]" />
                {/* Star 5 (A partial Star using CSS clip path or standard partial stroke) */}
                <div className="relative">
                  {/* Empty base star */}
                  <Star className="w-6 h-6 text-[#C5A059]/30" />
                  {/* Filled overlay (90% width) representing 4.9 average */}
                  <div className="absolute inset-0 overflow-hidden" style={{ width: '90%' }}>
                    <Star className="w-6 h-6 fill-[#C5A059] text-[#C5A059]" />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 font-light">Baseado em avaliações de clientes reais</p>
            </div>

            <a
              href="https://www.google.com/search?q=Luana+Fatel+Arquitetura"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#C5A059] uppercase tracking-widest border border-[#C5A059]/30 hover:bg-[#C5A059] hover:text-black py-2 px-4 transition-all duration-300 w-full"
            >
              <span>Verificar no Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
