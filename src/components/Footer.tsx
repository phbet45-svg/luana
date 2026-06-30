import { Instagram, MapPin, Phone, MessageSquare, Compass, ArrowUp } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#0A0A0A] text-gray-300 pt-20 pb-8 relative overflow-hidden border-t border-white/5">
      
      {/* Decorative Blueprint or Line design */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/25 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
        
        {/* Column 1: Monogram and Brand summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex flex-col">
            <span className="font-serif font-light text-white text-2xl tracking-widest">
              LUANA FATEL
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#C5A059] font-light uppercase mt-1">
              Arquitetura & Interiores
            </span>
          </div>
          <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
            Especialista em transformar espaços físicos em refúgios sofisticados que refletem a essência de famílias e impulsionam o sucesso de marcas comerciais em Salvador, Feira de Santana e online.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 hover:bg-[#C5A059] hover:text-black rounded-none text-gray-400 transition-colors duration-300"
              title="Acompanhe no Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={CONTACT_INFO.links.floating}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 hover:bg-[#C5A059] hover:text-black rounded-none text-gray-400 transition-colors duration-300"
              title="Fale no WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Atendimento (Locations) */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
            Escritórios & Cobertura
          </h4>
          <div className="space-y-4">
            {CONTACT_INFO.locations.map((loc, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-light text-white">{loc.city} - {loc.state}</h5>
                  <p className="text-xs text-gray-400 mt-0.5 font-light leading-relaxed">
                    {loc.coverage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Contact & Hours */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
            Fale Diretamente Conosco
          </h4>
          <div className="space-y-4 text-sm">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-[#C5A059]" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <div className="pt-4 border-t border-white/5 space-y-1 text-xs text-gray-400">
              <p className="font-medium text-gray-300">Horário de Atendimento:</p>
              <p>Segunda a Sexta: 08:00 às 18:00</p>
              <p>Sábado: Com agendamento prévio</p>
            </div>
          </div>
        </div>

      </div>

      {/* Licensing, copyright and structural details */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <div className="text-center sm:text-left space-y-1">
          <p>© {currentYear} Luana Fatel • Arquitetura & Design de Interiores. Todos os direitos reservados.</p>
          <p className="font-mono text-[10px]">CAU nº A249870-1 • ART de execução registrado na Bahia</p>
        </div>
        
        {/* Back to top or legal compliance */}
        <div className="flex items-center space-x-4">
          <span className="text-[10px] tracking-wider uppercase font-mono text-gray-400">Salvador • Feira de Santana</span>
          <button
            onClick={handleScrollTop}
            className="p-2.5 bg-white/5 hover:bg-[#C5A059] hover:text-black rounded-none transition-colors cursor-pointer"
            title="Voltar ao Topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

    </footer>
  );
}
