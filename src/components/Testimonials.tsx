import { Star, Quote, Instagram, MessageSquare } from 'lucide-react';
import { TESTIMONIALS, CONTACT_INFO } from '../data';
import GoogleCertificate from './GoogleCertificate';

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden border-b border-white/5">
      
      {/* Decorative ambient background circle */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C5A059]/5 rounded-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#C5A059] tracking-[0.25em] uppercase block">
            Prova Social Genuína
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
            O que dizem os clientes de <span className="font-serif italic font-medium text-[#C5A059]">Luana Fatel</span>
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Histórias reais de transformações que traduziram a essência de famílias e negócios, gerando harmonia, sofisticação e retorno de investimento na Bahia.
          </p>
        </div>

        {/* Authentic Google Review Certificate Badge */}
        <div className="max-w-4xl mx-auto mb-16">
          <GoogleCertificate />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#111111] border border-white/10 rounded-none p-8 relative flex flex-col justify-between hover:border-[#C5A059]/40 transition-all duration-300"
            >
              {/* Quote Icon decorative */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#C5A059]/10" />

              <div className="space-y-6">
                {/* Stars */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                </div>

                {/* Text quote */}
                <p className="text-sm text-gray-300 italic font-light leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center space-x-3 pt-6 border-t border-white/5 mt-6">
                {/* Initial Avatar */}
                <div className="w-10 h-10 rounded-none bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center font-serif text-sm font-bold text-[#C5A059]">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif font-light text-sm text-white">{testimonial.name}</h4>
                  <p className="text-[10px] text-gray-400 font-mono font-medium">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram proof visual banner */}
        <div className="mt-16 bg-[#0F0F0F] border border-white/10 rounded-none p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif font-light text-lg text-white flex items-center justify-center md:justify-start gap-2">
              <Instagram className="w-5 h-5 text-[#C5A059]" />
              <span>Acompanhe o dia a dia das obras</span>
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              No perfil <strong>@arq.luanafatel</strong>, compartilhamos stories diários em Feira de Santana e Salvador, renders interativos, novidades em lojas parceiras e reviews de marcenaria de alto luxo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold px-6 py-3 rounded-none text-xs uppercase tracking-widest transition-colors duration-300"
            >
              Ver Instagram oficial
            </a>
            <a
              id="testimonials-whatsapp-action"
              href={CONTACT_INFO.links.hero}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-[#C5A059] hover:bg-[#b18b41] text-black font-bold px-6 py-3 rounded-none text-xs uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Agendar via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
