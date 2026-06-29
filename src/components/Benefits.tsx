import { Smile, Layers, Maximize, Zap, TrendingUp, Heart, ArrowRight } from 'lucide-react';
import { BENEFITS, CONTACT_INFO } from '../data';

export default function Benefits() {
  const renderIcon = (iconName: string, isHovered = false) => {
    const classNames = `w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-black' : 'text-[#C5A059]'}`;
    switch (iconName) {
      case 'Smile':
        return <Smile className={classNames} />;
      case 'Layers':
        return <Layers className={classNames} />;
      case 'Maximize':
        return <Maximize className={classNames} />;
      case 'Zap':
        return <Zap className={classNames} />;
      case 'TrendingUp':
        return <TrendingUp className={classNames} />;
      case 'Heart':
        return <Heart className={classNames} />;
      default:
        return <Heart className={classNames} />;
    }
  };

  return (
    <section id="beneficios" className="py-24 bg-[#0F0F0F] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono font-semibold text-[#C5A059] tracking-[0.25em] uppercase block">
              Diferenciais Fatel
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
              Por que projetar com <span className="font-serif italic font-medium text-[#C5A059]">Luana Fatel</span>?
            </h2>
          </div>
          <div className="lg:col-span-5 text-gray-400 font-light text-base leading-relaxed">
            Nossa missão é ir além do desenho de plantas. Entregamos uma experiência de tranquilidade, onde cada canto é projetado especificamente para o seu estilo de vida ou sucesso empresarial.
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={benefit.id}
              className="bg-[#111111] border border-white/10 rounded-none p-8 hover:border-[#C5A059]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Icon wrap with count bubble */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-none group-hover:bg-[#C5A059] transition-all duration-300 w-fit">
                    <div className="group-hover:hidden">
                      {renderIcon(benefit.iconName, false)}
                    </div>
                    <div className="hidden group-hover:block">
                      {renderIcon(benefit.iconName, true)}
                    </div>
                  </div>
                  <span className="text-3xl font-serif font-bold text-white/5 group-hover:text-[#C5A059]/10 transition-colors select-none">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-serif font-light text-white group-hover:text-[#C5A059] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Decorative indicator link */}
              <div className="pt-6 border-t border-white/5 mt-6 flex items-center space-x-2 text-[10px] font-mono text-[#C5A059] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider">
                <span>Garantia de entrega premium</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Emotional Value Statement */}
        <div className="mt-16 bg-[#0A0A0A] border border-white/10 rounded-none p-8 sm:p-12 text-white relative overflow-hidden">
          {/* Ambient visual overlay effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/5 rounded-none blur-3xl -z-10" />
          
          <div className="max-w-3xl space-y-6">
            <p className="text-[#C5A059] font-mono text-xs uppercase tracking-widest font-semibold">
              Sua vida em um novo patamar
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light leading-tight italic">
              "A casa onde você vive influencia diretamente em como você se sente, pensa e age."
            </h3>
            <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
              Não se contente com espaços genéricos ou mal iluminados. Permitir-se viver em um ambiente de alto padrão, desenhado sob medida para sua essência, é um ato de valorização pessoal e profissional.
            </p>
            
            <div className="pt-4">
              <a
                id="benefits-inner-cta"
                href={CONTACT_INFO.links.hero}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-[#C5A059] hover:bg-[#b18b41] text-black font-bold px-8 py-4 rounded-none text-xs uppercase tracking-widest transition-all duration-300"
              >
                <span>Garantir transformação de alto padrão</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
