import { Home, Sparkles, Hammer, Briefcase, Eye, CheckCircle, ArrowUpRight } from 'lucide-react';
import { SERVICES, CONTACT_INFO } from '../data';

export default function Services() {
  // Helper to render lucide icon dynamically
  const renderIcon = (iconName: string, isHovered = false) => {
    const classNames = `w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-black' : 'text-[#C5A059]'}`;
    switch (iconName) {
      case 'Home':
        return <Home className={classNames} />;
      case 'Sparkles':
        return <Sparkles className={classNames} />;
      case 'Hammer':
        return <Hammer className={classNames} />;
      case 'Briefcase':
        return <Briefcase className={classNames} />;
      case 'Eye':
        return <Eye className={classNames} />;
      case 'CheckCircle':
        return <CheckCircle className={classNames} />;
      default:
        return <Sparkles className={classNames} />;
    }
  };

  return (
    <section id="servicos" className="py-24 bg-[#0A0A0A] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#C5A059] tracking-[0.25em] uppercase block">
            Nossas Especialidades
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
            Serviços projetados para <span className="font-serif italic font-medium text-[#C5A059]">materializar sua essência</span>
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Da concepção do plano em maquete 3D ultra-realista até a entrega técnica de engenharia e marcenaria. Soluções sob medida para valorizar seu imóvel.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-[#111111] hover:bg-[#151515] border border-white/10 hover:border-[#C5A059]/40 rounded-none p-8 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Decorative Subtle Gold Corner Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/5 rounded-none blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <div className="space-y-6">
                {/* Header Icon & Tiny badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-none group-hover:bg-[#C5A059] transition-all duration-300">
                    {/* The icon class changes color on group-hover */}
                    <div className="group-hover:hidden">
                      {renderIcon(service.iconName, false)}
                    </div>
                    <div className="hidden group-hover:block">
                      {renderIcon(service.iconName, true)}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-500 font-medium group-hover:text-[#C5A059] transition-colors">
                    Fatel.arq
                  </span>
                </div>

                {/* Title & Descr */}
                <div className="space-y-3">
                  <h3 className="text-xl font-serif font-light text-white group-hover:text-[#C5A059] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2.5 pt-4 border-t border-white/10">
                  {service.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-none bg-[#C5A059]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Action Link */}
              <div className="pt-8 mt-auto">
                <a
                  id={`service-cta-${service.id}`}
                  href={`https://wa.me/5571992505232?text=Olá,%20Luana!%20Gostaria%20de%20conversar%20sobre%20o%20serviço%20de%20*${encodeURIComponent(service.title)}*%20que%20vi%20no%20seu%20site.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-white/80 group-hover:text-[#C5A059] transition-colors duration-300"
                >
                  <span>Solicitar orçamento deste serviço</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Core CTA */}
        <div className="mt-16 text-center bg-[#0F0F0F] border border-white/10 p-8 rounded-none max-w-3xl mx-auto">
          <p className="text-sm text-gray-300 font-medium">
            Tem dúvidas sobre qual serviço melhor se adapta ao seu momento ou imóvel?
          </p>
          <a
            id="services-bottom-cta"
            href={CONTACT_INFO.links.services}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#C5A059] hover:bg-[#b18b41] text-black font-bold px-6 py-3.5 rounded-none text-xs uppercase tracking-widest mt-4 transition-all duration-300"
          >
            <span>Consultar arquiteta gratuitamente</span>
          </a>
        </div>

      </div>
    </section>
  );
}
