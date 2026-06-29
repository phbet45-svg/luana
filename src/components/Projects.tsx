import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, MapPin, ZoomIn, X, MessageSquare } from 'lucide-react';
import { PROJECTS, CONTACT_INFO } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'residencial' | 'comercial' | 'interiores'>('todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterCategories = [
    { id: 'todos', label: 'Todos os Projetos' },
    { id: 'residencial', label: 'Residencial' },
    { id: 'comercial', label: 'Comercial' },
    { id: 'interiores', label: 'Design de Interiores' },
  ];

  const filteredProjects = activeFilter === 'todos'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section id="projetos" className="py-24 bg-[#0F0F0F] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#C5A059] tracking-[0.25em] uppercase block">
            Portfólio Premium
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
            Projetos que traduzem <span className="font-serif italic font-medium text-[#C5A059]">exclusividade</span>
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Uma curadoria especial de renders em alta fidelidade e transformações concluídas de apartamentos, consultórios e residências de alto padrão na Bahia.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          <Filter className="w-4 h-4 text-gray-500 mr-2 hidden sm:block" />
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`px-5 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-[#C5A059] text-black shadow-lg shadow-black/40'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group relative bg-[#111111] rounded-none overflow-hidden border border-white/10 hover:border-[#C5A059]/40 flex flex-col justify-between"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0A]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6" />
                  
                  {/* Floating magnification button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute top-4 right-4 p-2.5 bg-[#C5A059] text-black rounded-none shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:brightness-110"
                    title="Ampliar Detalhes"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm text-white px-3 py-1 rounded-none text-[9px] font-mono tracking-widest font-semibold uppercase flex items-center gap-1 border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-light text-white group-hover:text-[#C5A059] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Dynamic Inquiry */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="bg-white/5 text-gray-300 border border-white/5 px-2.5 py-0.5 rounded-none text-[9px] tracking-widest font-semibold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      id={`project-inquiry-${project.id}`}
                      href={`https://wa.me/5571992505232?text=Olá,%20Luana!%20Me%20interessei%20pelo%20projeto%20*${encodeURIComponent(project.title)}*%20que%20vi%20no%20seu%20site%20e%20gostaria%20de%20fazer%20um%20parecido.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black font-bold py-2.5 px-4 rounded-none text-[10px] uppercase tracking-widest transition-all duration-300"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Consultar projeto similar</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Lightbox for Project Details */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-[#111111] rounded-none overflow-hidden max-w-4xl w-full shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Close button */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#0A0A0A]">
                  <div>
                    <h4 className="font-serif font-light text-white text-lg">{selectedProject.title}</h4>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedProject.location}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-none text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left: Huge Picture */}
                  <div className="aspect-[4/3] bg-[#0A0A0A]">
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right: Detailed Context and custom WhatsApp form */}
                  <div className="p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C5A059] tracking-[0.2em] block mb-1">
                          Sobre o Projeto
                        </span>
                        <p className="text-sm text-gray-300 leading-relaxed font-light">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#C5A059] tracking-[0.2em] block">
                          Soluções Aplicadas
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.tags.map((tag, idx) => (
                            <span key={idx} className="bg-white/5 text-gray-200 border border-white/10 px-3 py-1 rounded-none text-xs font-semibold uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-white/10">
                      <p className="text-xs text-gray-400 italic">
                        Quer um projeto com esse mesmo nível de acabamento e sofisticação ajustado ao seu orçamento?
                      </p>
                      <a
                        id="lightbox-whatsapp-cta"
                        href={`https://wa.me/5571992505232?text=Olá,%20Luana!%20Gostaria%20de%20fazer%20um%20orçamento%20de%20um%20projeto%20com%20o%20padrão%20de%20sofisticação%20do%20*${encodeURIComponent(selectedProject.title)}*%20que%20vi%20no%20seu%20site.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center space-x-2 bg-[#C5A059] hover:bg-[#b18b41] text-black font-bold py-3 px-4 rounded-none text-xs uppercase tracking-widest transition-colors shadow-lg shadow-black"
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                        <span>Falar no WhatsApp sobre esse projeto</span>
                      </a>
                    </div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
