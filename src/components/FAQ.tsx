import { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { FAQS, CONTACT_INFO } from '../data';

export default function FAQ() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#0F0F0F] border-b border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#C5A059] tracking-[0.25em] uppercase block">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-tight">
            Perguntas <span className="font-serif italic font-medium text-[#C5A059]">Mais Comuns</span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Tudo o que você precisa saber antes de dar o primeiro passo na transformação do seu imóvel com a arquiteta Luana Fatel.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#111111] border border-white/10 rounded-none overflow-hidden transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start space-x-3.5 pr-4">
                    <HelpCircle className="w-5 h-5 text-[#C5A059] mt-0.5 flex-shrink-0" />
                    <span className="font-serif font-light text-sm sm:text-base text-white leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#C5A059]' : ''}`} />
                </button>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-white/5 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  } overflow-hidden`}
                >
                  <div className="p-6 text-xs sm:text-sm text-gray-300 font-light leading-relaxed bg-[#0A0A0A]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ unresolved inquiry banner */}
        <div className="mt-16 text-center space-y-4 bg-[#111111] border border-white/10 text-white p-8 rounded-none">
          <p className="text-sm font-serif font-light">
            Ainda tem alguma pergunta específica sobre o seu projeto?
          </p>
          <p className="text-xs text-gray-400 max-w-md mx-auto font-light leading-relaxed">
            Seja sobre prazos específicos, formas de parcelamento ou compatibilização estrutural, a Luana responde você pessoalmente e sem compromisso!
          </p>
          <div className="pt-2">
            <a
              id="faq-whatsapp-cta"
              href={CONTACT_INFO.links.floating}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#C5A059] hover:bg-[#b18b41] text-black font-bold px-6 py-3.5 rounded-none text-xs uppercase tracking-widest transition-transform duration-300"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Tirar Dúvidas no WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
