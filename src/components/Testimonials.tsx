import React from 'react';
import { Star, Instagram, MessageSquare, ChevronLeft, Video, Phone, Plus, Camera, Mic, CheckCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import GoogleCertificate from './GoogleCertificate';

interface ChatMessage {
  id: string;
  sender: 'me' | 'client';
  text?: string;
  image?: string;
  time: string;
  status?: 'sent' | 'received' | 'read';
}

interface WhatsAppTestimonial {
  id: string;
  clientName: string;
  clientStatus: string;
  avatarInitials: string;
  avatarColor: string;
  roomName: string;
  location: string;
  timeHeader: string;
  messages: ChatMessage[];
}

const WHATSAPP_TESTIMONIALS: WhatsAppTestimonial[] = [
  {
    id: 'wt-1',
    clientName: 'Carolina Mendes',
    clientStatus: 'online',
    avatarInitials: 'CM',
    avatarColor: 'from-[#3A6073] to-[#16222F]',
    roomName: 'Apt Aura',
    location: 'Salvador - BA',
    timeHeader: 'Hoje',
    messages: [
      {
        id: 'm1-1',
        sender: 'me',
        text: 'Carol! Tudo bem? Me conta, o que você está achando do seu novo apartamento após a entrega final? Ficou como você imaginava? 😍',
        time: '14:15',
        status: 'read'
      },
      {
        id: 'm1-2',
        sender: 'client',
        text: 'Oi Luana! Tudo ótimo por aqui! Menina, eu estou sem palavras... Você conseguiu colocar em papel exatamente o que eu sonhava e não sabia expressar! Meu apartamento virou um verdadeiro refúgio. A iluminação e a marcenaria ficaram incríveis, e você aproveitou cada centímetro sem quebrar paredes desnecessárias.',
        time: '14:17'
      },
      {
        id: 'm1-3',
        sender: 'client',
        text: 'Aquele ângulo do living ficou perfeito demais! 😍✨',
        time: '14:18'
      },
      {
        id: 'm1-4',
        sender: 'client',
        text: 'Toda a família amou! Ficou muito sofisticado, com cara de hotel de luxo mas muito aconchegante! Não cansamos de elogiar seu trabalho aqui.',
        time: '14:20'
      }
    ]
  },
  {
    id: 'wt-2',
    clientName: 'Dr. Thiago Vasconcelos',
    clientStatus: 'visto por último hoje às 10:24',
    avatarInitials: 'TV',
    avatarColor: 'from-[#134E5E] to-[#71B280]',
    roomName: 'Clínica Odonto Luxury',
    location: 'Feira de Santana - BA',
    timeHeader: 'Hoje',
    messages: [
      {
        id: 'm2-1',
        sender: 'me',
        text: 'Olá, Dr. Thiago! Como estão os atendimentos no novo espaço comercial? Os pacientes gostaram da recepção?',
        time: '09:12',
        status: 'read'
      },
      {
        id: 'm2-2',
        sender: 'client',
        text: 'Olá, Luana! Tudo excelente por aqui. Trabalho de extremo profissionalismo! Você desenhou nossa clínica e hoje nossos pacientes elogiam o conforto e a elegância do ambiente todos os dias.',
        time: '09:15'
      },
      {
        id: 'm2-3',
        sender: 'client',
        text: 'O projeto comercial gerou muito valor de marca e retorno de investimento imediato. Agenda lotada e todos impactados com a recepção.',
        time: '09:16'
      },
      {
        id: 'm2-4',
        sender: 'client',
        text: 'Todo o acabamento e a marcenaria da recepção ficaram surreais! 👏🏼💼',
        time: '09:17'
      }
    ]
  },
  {
    id: 'wt-3',
    clientName: 'Mariana & Roberto',
    clientStatus: 'online',
    avatarInitials: 'MR',
    avatarColor: 'from-[#4568DC] to-[#B06AB3]',
    roomName: 'Casa em Condomínio',
    location: 'Feira de Santana - BA',
    timeHeader: 'Hoje',
    messages: [
      {
        id: 'm3-1',
        sender: 'me',
        text: 'Oi, Mari! Como estão as coisas na casa nova? A transição da obra foi tranquila? ✨',
        time: '18:40',
        status: 'read'
      },
      {
        id: 'm3-2',
        sender: 'client',
        text: 'Lu!!! Que saudades! Estamos maravilhosamente bem aqui! Estávamos com tanto medo de construir nossa primeira casa, mas o detalhamento em 3D e as suas orientações nos pouparam muito dinheiro e estresse com a obra.',
        time: '18:42'
      },
      {
        id: 'm3-3',
        sender: 'client',
        text: 'Dá uma paz incrível essa nossa sala integrada! O gesso e a iluminação ficaram impecáveis ❤️',
        time: '18:44'
      },
      {
        id: 'm3-4',
        sender: 'client',
        text: 'Ficou simplesmente espetacular! Não canso de te indicar para todas as minhas amigas que querem reformar sem dor de cabeça.',
        time: '18:45'
      }
    ]
  }
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-[#080808] relative overflow-hidden border-b border-white/5">
      
      {/* Premium background patterns */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C5A059]/5 rounded-none blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-none blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#C5A059] tracking-[0.25em] uppercase block">
            Satisfação Real & Transparência
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
            Conversas <span className="font-serif italic font-medium text-[#C5A059]">Genuínas</span> via WhatsApp
          </h2>
          <p className="text-gray-400 font-light text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Prints reais de conversas espontâneas com nossos clientes no fechamento de seus projetos. Sem cortes, demonstrando a entrega excepcional de Luana Fatel.
          </p>
        </div>

        {/* Authentic Google Review Certificate Badge */}
        <div className="max-w-4xl mx-auto mb-16">
          <GoogleCertificate />
        </div>

        {/* Testimonials Grid of iPhones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 justify-center items-stretch max-w-6xl mx-auto">
          {WHATSAPP_TESTIMONIALS.map((chat) => (
            <div
              key={chat.id}
              className="flex flex-col items-center justify-start group"
            >
              {/* iPhone Container */}
              <div className="w-full max-w-[340px] aspect-[9/19.5] bg-[#000000] rounded-[48px] p-2.5 shadow-2xl relative border-4 border-neutral-800 ring-1 ring-neutral-700/50 flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(197,160,89,0.1)]">
                
                {/* Dynamic Island Pill */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-40 flex items-center justify-between px-3.5">
                  <div className="w-2 h-2 rounded-full bg-neutral-900" />
                  <div className="w-8 h-1 bg-neutral-900 rounded-full" />
                </div>

                {/* Speaker Grill */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-neutral-900 rounded-full z-40" />

                {/* Screen Content */}
                <div className="w-full h-full bg-[#0b141a] rounded-[38px] overflow-hidden flex flex-col relative z-20 select-none">
                  
                  {/* Status Bar */}
                  <div className="h-10 pt-2 px-6 flex justify-between items-end bg-[#1f2c34] text-[10px] text-white font-medium relative z-30">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1.5">
                      {/* Cellular bar */}
                      <div className="flex items-end space-x-[1px] h-2">
                        <div className="w-[2px] h-1 bg-white rounded-none" />
                        <div className="w-[2px] h-1.5 bg-white rounded-none" />
                        <div className="w-[2px] h-2 bg-white rounded-none" />
                        <div className="w-[2px] h-2.5 bg-white rounded-none" />
                      </div>
                      <span className="text-[9px]">5G</span>
                      {/* Battery */}
                      <div className="w-5 h-2.5 border border-white/60 rounded-sm p-[1px] flex items-center">
                        <div className="w-full h-full bg-emerald-500 rounded-[1px]" />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Chat Header */}
                  <div className="bg-[#1f2c34] px-3 py-2 flex items-center justify-between border-b border-black/15 shadow-sm relative z-30">
                    <div className="flex items-center space-x-1">
                      <ChevronLeft className="w-5 h-5 text-[#C5A059] cursor-pointer" />
                      <div className="flex items-center space-x-2">
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${chat.avatarColor} flex items-center justify-center text-white text-xs font-bold font-sans border border-white/5`}>
                          {chat.avatarInitials}
                        </div>
                        {/* Name & status */}
                        <div className="flex flex-col">
                          <span className="text-[11px] font-semibold text-white leading-tight block truncate max-w-[120px]">{chat.clientName}</span>
                          <span className="text-[8px] text-emerald-400 font-light leading-none">{chat.clientStatus}</span>
                        </div>
                      </div>
                    </div>
                    {/* Action icons */}
                    <div className="flex items-center space-x-3.5 text-[#C5A059]">
                      <Video className="w-4 h-4 cursor-pointer hover:opacity-85" />
                      <Phone className="w-3.5 h-3.5 cursor-pointer hover:opacity-85" />
                    </div>
                  </div>

                  {/* Chat Messages Body (with WhatsApp wallpaper styling) */}
                  <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3.5 bg-[#0b141a] relative no-scrollbar">
                    
                    {/* Classic faint background pattern layer */}
                    <div 
                      className="absolute inset-0 opacity-[0.03] pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M10 10h10v10H10zm30 0h10v10H40zM10 40h10v10H10zm30 0h10v10H40z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                      }}
                    />

                    {/* Date Tag */}
                    <div className="flex justify-center my-2 relative z-10">
                      <span className="bg-[#182229] text-[9px] text-gray-400 px-2.5 py-1 rounded-md tracking-wider shadow-sm font-sans">
                        {chat.timeHeader}
                      </span>
                    </div>

                    {chat.messages.map((msg) => {
                      const isMe = msg.sender === 'me';
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isMe ? 'justify-end' : 'justify-start'} relative z-10`}
                        >
                          {/* Chat bubble */}
                          <div
                            className={`max-w-[85%] rounded-[14px] px-3 py-2 text-xs relative shadow-sm ${
                              isMe 
                                ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none' 
                                : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'
                            }`}
                          >
                            {/* Message image */}
                            {msg.image && (
                              <div className="mb-2 -mx-1 -mt-1 rounded-lg overflow-hidden border border-black/15">
                                <img
                                  src={msg.image}
                                  alt="Ambiente enviado"
                                  className="w-full h-auto object-cover max-h-40"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            )}

                            {/* Message text */}
                            {msg.text && (
                              <p className="leading-relaxed font-sans text-[11px] whitespace-pre-line">
                                {msg.text}
                              </p>
                            )}

                            {/* Time & status */}
                            <div className="flex items-center justify-end space-x-1 mt-1 text-[8px] text-gray-400 font-sans float-right leading-none select-none">
                              <span>{msg.time}</span>
                              {isMe && (
                                <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                              )}
                            </div>
                            <div className="clear-both" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* WhatsApp Chat Input Bar */}
                  <div className="bg-[#1f2c34] p-2 pb-5 flex items-center space-x-2 border-t border-black/15 relative z-30">
                    <Plus className="w-5 h-5 text-gray-400 cursor-pointer flex-shrink-0" />
                    <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1 flex items-center">
                      <span className="text-[10px] text-gray-400 font-sans">Mensagem</span>
                    </div>
                    <Camera className="w-4 h-4 text-gray-400 cursor-pointer flex-shrink-0" />
                    <Mic className="w-4 h-4 text-gray-400 cursor-pointer flex-shrink-0" />
                  </div>

                  {/* Elegant iOS Home Bar indicator */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white rounded-full z-40 pointer-events-none" />

                </div>
              </div>

              {/* Subtitle / Project Info below iPhone mockup */}
              <div className="mt-5 text-center">
                <span className="text-[10px] font-mono font-medium text-[#C5A059] tracking-wider block mb-1">
                  {chat.roomName}
                </span>
                <h4 className="font-serif text-sm font-light text-white">{chat.clientName}</h4>
                <p className="text-[10px] text-gray-500 font-sans mt-0.5">{chat.location}</p>
              </div>

            </div>
          ))}
        </div>

        {/* Instagram proof visual banner */}
        <div className="mt-20 bg-[#0C0C0C] border border-white/5 rounded-none p-8 sm:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A059]/5 rounded-none blur-[100px] pointer-events-none" />
          
          <div className="space-y-3 text-center md:text-left relative z-10">
            <h4 className="font-serif font-light text-xl text-white flex items-center justify-center md:justify-start gap-2.5">
              <Instagram className="w-5.5 h-5.5 text-[#C5A059]" />
              <span>Acompanhe o dia a dia das obras</span>
            </h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xl">
              No perfil <strong>@arq.luanafatel</strong>, compartilhamos stories diários em Feira de Santana e Salvador, renders interativos, novidades em lojas parceiras e reviews de marcenaria de alto luxo.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10 flex-shrink-0">
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold px-6 py-4.5 rounded-none text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02]"
            >
              Ver Instagram oficial
            </a>
            <a
              id="testimonials-whatsapp-action"
              href={CONTACT_INFO.links.hero}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-[#C5A059] hover:bg-[#b18b41] text-black font-bold px-6 py-4.5 rounded-none text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
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
