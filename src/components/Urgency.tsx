import { useState, useEffect } from 'react';
import { Calendar, MessageSquare, AlertCircle, Users, CheckCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function Urgency() {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  // Resetting realistic countdown simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 24h cycle
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden border-b border-white/5">
      {/* Absolute glow decorative light */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-none blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-[#111111] border border-[#C5A059]/20 rounded-none p-8 sm:p-12 shadow-2xl relative">
          
          {/* Top Live Pulse Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#C5A059] text-black px-4 py-1.5 rounded-none text-[10px] tracking-[0.2em] font-mono font-bold uppercase flex items-center space-x-2 shadow-lg">
            <span className="w-2 h-2 rounded-none bg-black animate-pulse" />
            <span>Vagas Limitadas para este mês</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Scarcity Messaging */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-[#C5A059]">
                <AlertCircle className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
                  Atendimento Exclusivo e Sob Medida
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight leading-tight">
                Garanta o início do seu <span className="font-serif italic font-medium text-[#C5A059]">projeto dos sonhos</span> ainda este mês
              </h2>

              <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
                Para manter o altíssimo padrão de detalhamento em 3D, precisão executiva e acompanhamento próximo, a arquiteta Luana Fatel aceita apenas <strong>3 novos projetos residenciais ou comerciais</strong> por período.
              </p>

              {/* Slots Counter */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-none w-fit mx-auto lg:mx-0">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-none bg-[#C5A059] flex items-center justify-center text-[10px] font-bold text-black font-mono">LF</div>
                  <div className="w-8 h-8 rounded-none bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-bold font-mono">24</div>
                  <div className="w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-mono text-gray-400">+12</div>
                </div>
                <div className="text-[10px] font-mono text-gray-300 text-center sm:text-left uppercase tracking-wider">
                  <span className="text-[#C5A059] font-bold">Apenas 1 vaga restante</span> disponível para a cobertura de Salvador/Feira de Santana esta semana.
                </div>
              </div>
            </div>

            {/* Countdown widget & CTA */}
            <div className="lg:col-span-5 bg-[#0A0A0A] border border-white/5 rounded-none p-6 sm:p-8 text-center space-y-6">
              <p className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                O bônus de Estudo de Viabilidade expira em:
              </p>

              {/* Clock display */}
              <div className="flex justify-center items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-serif font-light text-[#C5A059] tracking-wider">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-1">Horas</span>
                </div>
                <span className="text-2xl font-bold text-[#C5A059]/30 -translate-y-2 font-mono">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-serif font-light text-[#C5A059] tracking-wider">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-1">Minutos</span>
                </div>
                <span className="text-2xl font-bold text-[#C5A059]/30 -translate-y-2 font-mono">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-serif font-light text-[#C5A059] tracking-wider">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-1">Segundos</span>
                </div>
              </div>

              {/* Action */}
              <div className="space-y-3">
                <a
                  id="urgency-section-cta"
                  href={CONTACT_INFO.links.urgency}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-[#C5A059] hover:bg-[#b18b41] text-black font-bold py-4 rounded-none text-xs uppercase tracking-widest transition-transform duration-300"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Garantir minha vaga agora</span>
                </a>
                <p className="text-[10px] text-gray-400 font-mono flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Garantia de atendimento prioritário</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
