import { Service, Project, Testimonial, Benefit, ProcessStep, FAQItem } from './types';

// Importing generated assets
import heroLuxuryImg from './assets/images/hero_luxury_living_1782740920347.jpg';
import luanaPortraitImg from './assets/images/luana_fatel_portrait_1782740935255.jpg';
import beforeLivingImg from './assets/images/before_living_room_1782740949424.jpg';
import afterLivingImg from './assets/images/after_living_room_1782740961654.jpg';
import commercialImg from './assets/images/commercial_reception_1782740977092.jpg';

export const IMAGES = {
  heroLuxury: 'https://i.postimg.cc/1XBgKQ00/Chat-GPT-Image-30-06-2026-13-44-13.png',
  luanaPortrait: 'https://i.postimg.cc/YS9xyDbV/eu.jpg',
  beforeLiving: beforeLivingImg,
  afterLiving: afterLivingImg,
  commercial: commercialImg,
  beforeAfter1_before: 'https://i.postimg.cc/sXTZW3pw/Sem-titulo.jpg',
  beforeAfter1_after: 'https://i.postimg.cc/B6m1FJx7/Sem-titulo2.jpg',
  beforeAfter2_before: 'https://i.postimg.cc/4dWhcXzL/Sem-titulo3.jpg',
  beforeAfter2_after: 'https://i.postimg.cc/pTsnjPD0/Sem-titulo4.jpg',
};

export const CONTACT_INFO = {
  phone: '71992505232',
  whatsappBaseUrl: 'https://wa.me/5571992505232',
  instagram: 'https://www.instagram.com/arq.luanafatel',
  email: 'contato@luanafatel.com.br',
  locations: [
    { city: 'Feira de Santana', state: 'BA', coverage: 'Atendimento presencial e acompanhamento local' },
    { city: 'Salvador', state: 'BA', coverage: 'Atendimento presencial, projetos residenciais e corporativos' },
    { city: 'Online', state: 'Brasil & Exterior', coverage: 'Projetos de interiores 100% digitais com visualização 3D' }
  ],
  links: {
    hero: 'https://wa.me/5571992505232?text=Olá,%20Luana!%20Gostaria%20de%20fazer%20um%20orçamento%20para%20o%20meu%20projeto.%20Assisti%20o%20seu%20site%20e%20me%20encantei%20com%20o%20seu%20portfólio.',
    services: 'https://wa.me/5571992505232?text=Olá,%20Luana!%20Tenho%20interesse%20em%20saber%20mais%20sobre%20seus%20serviços%20de%20arquitetura%20e%20interiores.',
    urgency: 'https://wa.me/5571992505232?text=Olá,%20Luana!%20Gostaria%20de%20garantir%20uma%20das%20últimas%20vagas%20de%20projetos%20para%20este%20mês%20com%20o%20bônus%20exclusivo.',
    popup: 'https://wa.me/5571992505232?text=Olá,%20Luana!%20Acabei%20de%20ver%20a%20oferta%20no%20seu%20site%20e%20gostaria%20de%20garantir%20meu%20Estudo%20de%20Viabilidade%20exclusivo.',
    floating: 'https://wa.me/5571992505232?text=Olá,%20Luana!%20Gostaria%20de%20tirar%20algumas%20dúvidas%20e%20entender%20como%20funciona%20o%20projeto%20com%20você.',
  }
};

export const SERVICES: Service[] = [
  {
    id: 'residencial',
    title: 'Arquitetura Residencial',
    shortDescription: 'Projetos completos do zero para a sua nova casa, da fundação ao acabamento luxuoso.',
    detailedDescription: 'Criamos residências autorais que combinam estética imponente, conforto térmico e acústico, e funcionalidade máxima. Pensamos em cada pilar, fluxo e abertura para que sua casa conte a sua história e valorize seu patrimônio.',
    iconName: 'Home',
    highlights: ['Estudo solar e ventilação natural', 'Fachadas modernas e imponentes', 'Aproveitamento inteligente do terreno', 'Compatibilização de estruturas']
  },
  {
    id: 'interiores',
    title: 'Design de Interiores',
    shortDescription: 'Decoração e ambientação sofisticada para transformar espaços existentes sem quebra-quebra.',
    detailedDescription: 'O design de interiores da Luana Fatel traduz sua essência em texturas, cores, iluminação cênica e mobiliário sob medida. Projetamos salas, quartos, studios, cozinhas e varandas com sofisticação extrema e aproveitamento milimétrico.',
    iconName: 'Sparkles',
    highlights: ['Detalhamento de marcenaria de luxo', 'Escolha de paleta de cores e texturas', 'Projetos luminotécnicos integrados', 'Especificação de mobiliário e adornos']
  },
  {
    id: 'reformas',
    title: 'Reformas e Otimização',
    shortDescription: 'Renove apartamentos, casas antigas ou cômodos específicos com segurança, rapidez e inteligência.',
    detailedDescription: 'Dê uma nova vida ao seu imóvel sem as dores de cabeça tradicionais de uma obra. Planejamos intervenções estratégicas que trazem frescor e modernidade, com o melhor custo-benefício e foco em soluções inteligentes.',
    iconName: 'Hammer',
    highlights: ['Layout otimizado de fluxo', 'Soluções sem grandes obras ou demolição', 'Indicação estratégica de acabamentos', 'Maximização de luz e ventilação']
  },
  {
    id: 'comerciais',
    title: 'Projetos Comerciais',
    shortDescription: 'Arquitetura estratégica que atrai clientes, valoriza sua marca e otimiza a experiência de vendas.',
    detailedDescription: 'Projetamos clínicas, consultórios, salões de beleza, escritórios corporativos e lojas boutique. Criamos ambientes instagramáveis e funcionais que aumentam a percepção de valor dos seus serviços ou produtos.',
    iconName: 'Briefcase',
    highlights: ['Pontos de venda estratégicos', 'Setorização e fluxo operacional', 'Identidade de marca aplicada ao espaço', 'Materiais de alta durabilidade']
  },
  {
    id: 'visualizacao-3d',
    title: 'Projetos 3D e Visualização Realista',
    shortDescription: 'Caminhe dentro do seu futuro imóvel antes de assentar o primeiro tijolo com renders hiper-realistas.',
    detailedDescription: 'Chega de dúvidas sobre o resultado. Criamos imagens 3D fidedignas com texturas e luzes reais do projeto. Você visualiza exatamente como cada revestimento, marcenaria e iluminação se comportarão no ambiente final.',
    iconName: 'Eye',
    highlights: ['Renders hiper-realistas', 'Maquete eletrônica interativa', 'Simulação de iluminação dia/noite', 'Fácil compreensão para a equipe de obra']
  },
  {
    id: 'acompanhamento',
    title: 'Acompanhamento de Obras',
    shortDescription: 'Tranquilidade absoluta de que o projeto será executado exatamente como foi idealizado.',
    detailedDescription: 'Acompanhamos as etapas críticas da sua obra ou reforma em Salvador e Feira de Santana. Fazemos visitas técnicas para alinhar especificações com empreiteiros, garantindo o padrão de acabamento e evitando desperdício de material.',
    iconName: 'CheckCircle',
    highlights: ['Visitas técnicas agendadas', 'Resolução de dúvidas com equipe local', 'Garantia de fidelidade estética', 'Indicação de fornecedores homologados']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Projeto 1',
    category: 'residencial',
    imageUrl: IMAGES.heroLuxury,
    location: 'Feira de Santana - BA',
    description: 'Uma casa projetada para abraçar a luz natural, com pé-direito duplo, revestimentos nobres e painéis ripados integrando a área social à varanda gourmet.',
    tags: ['Pé-direito Duplo', 'Design Biofílico', 'Madeira Slatted', 'Varanda Gourmet']
  },
  {
    id: 'proj-2',
    title: 'Projeto 2',
    category: 'comercial',
    imageUrl: IMAGES.commercial,
    location: 'Salvador - BA',
    description: 'Um espaço de saúde que se assemelha a um hotel boutique. Tons de bege, painéis iluminados e detalhes dourados transmitem sofisticação e acalmam o paciente.',
    tags: ['Clínica Boutique', 'Iluminação Cênica', 'Mármore Translúcido', 'Elegante']
  },
  {
    id: 'proj-3',
    title: 'Projeto 3',
    category: 'interiores',
    imageUrl: IMAGES.afterLiving,
    location: 'Salvador - BA',
    description: 'Transformação de uma sala de estar compacta em um ambiente incrivelmente amplo e funcional. Uso inteligente de marcenaria multifuncional e paleta off-white.',
    tags: ['Aproveitamento de Espaço', 'Tons Neutros', 'Marcenaria Inteligente', 'Conforto']
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 'b-1',
    title: 'Espaços que refletem sua personalidade',
    description: 'Nenhum projeto é copiado. Cada linha e textura são escolhidas para traduzir quem você é, seus hábitos e suas memórias mais afetivas.',
    iconName: 'Smile'
  },
  {
    id: 'b-2',
    title: 'Funcionalidade aliada à Beleza extrema',
    description: 'Ambientes lindos precisam ser confortáveis e práticos para viver. Desenhamos pensando na sua rotina diária e na facilidade de manutenção.',
    iconName: 'Layers'
  },
  {
    id: 'b-3',
    title: 'Aproveitamento Inteligente de cada milímetro',
    description: 'Especialista em criar amplitude em apartamentos e otimizar plantas residenciais e comerciais, eliminando espaços perdidos e cantos inutilizados.',
    iconName: 'Maximize'
  },
  {
    id: 'b-4',
    title: 'Transformação Inteligente sem grandes quebras',
    description: 'Sabemos onde intervir estrategicamente. É possível modernizar e trazer luxo ao seu imóvel renovando marcenaria, pintura e iluminação com rapidez.',
    iconName: 'Zap'
  },
  {
    id: 'b-5',
    title: 'Valorização imediata do seu patrimônio',
    description: 'Um projeto assinado por arquiteto eleva o valor de revenda ou aluguel do seu imóvel em até 30%, tornando-se um investimento altamente rentável.',
    iconName: 'TrendingUp'
  },
  {
    id: 'b-6',
    title: 'Experiência Completa, sem estresse',
    description: 'Nós cuidamos de tudo. Desde a primeira conversa e renderizações em 3D realista até a entrega dos desenhos técnicos e suporte para os construtores.',
    iconName: 'Heart'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Briefing & Imersão',
    subtitle: 'Alinhamento de desejos',
    description: 'Nossa primeira reunião serve para mergulhar no seu estilo de vida, preferências e necessidades. Discutimos o orçamento pretendido e extraímos a sua essência.',
    details: ['Entrevista de perfil detalhada', 'Coleta de referências do Instagram/Pinterest', 'Definição de metas e prazos', 'Medição do local (se aplicável)']
  },
  {
    stepNumber: '02',
    title: 'Estudo Preliminar & 3D',
    subtitle: 'Visualização da sua essência',
    description: 'Desenvolvemos a proposta de layout e volumetria. Criamos renders hiper-realistas em 3D para você caminhar virtualmente pelo seu novo lar com texturas e luzes.',
    details: ['Imagens 3D fidedignas', 'Apresentação de paleta de cores reais', 'Estudo de fluxos e iluminação', 'Ajustes até aprovação de 100%']
  },
  {
    stepNumber: '03',
    title: 'Projeto Executivo',
    subtitle: 'O manual de instruções da obra',
    description: 'Geramos o caderno técnico completo e extremamente detalhado que os pedreiros, eletricistas e gesseiros precisam para executar tudo com precisão.',
    details: ['Planta de demolição e construção', 'Projeto luminotécnico e de tomadas', 'Indicação exata de revestimentos', 'Detalhamento de gesso e tetos']
  },
  {
    stepNumber: '04',
    title: 'Detalhamento de Marcenaria',
    subtitle: 'Otimização e sofisticação sob medida',
    description: 'Desenhamos detalhadamente todos os móveis planejados, portas, painéis ripados e armários para que o marceneiro produza com qualidade máxima.',
    details: ['Cortes técnicos milimétricos', 'Definição de ferragens e puxadores', 'Especificação de padrões de MDF', 'Vistas de frentes e gavetas']
  },
  {
    stepNumber: '05',
    title: 'Obras & Fornecedores',
    subtitle: 'Do papel para a realidade concreta',
    description: 'Acompanhamos as etapas mais cruciais e fazemos reuniões com fornecedores de Salvador e Feira de Santana para garantir fidelidade ao que você aprovou.',
    details: ['Suporte técnico para pedreiros', 'Alinhamento de montagem de marcenaria', 'Auxílio na escolha de tecidos e sofás', 'Tranquilidade e segurança para você']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Carolina Mendes',
    role: 'Proprietária do Apt Aura',
    location: 'Salvador - BA',
    text: 'A Luana conseguiu colocar em papel exatamente o que eu sonhava e não sabia expressar! Meu apartamento virou um verdadeiro refúgio. A iluminação e a marcenaria ficaram incríveis, e ela aproveitou cada centímetro sem quebrar paredes desnecessárias.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Dr. Thiago Vasconcelos',
    role: 'Fundador da Clínica Odonto Luxury',
    location: 'Feira de Santana - BA',
    text: 'Trabalho de extremo profissionalismo. Luana desenhou nossa clínica e hoje nossos pacientes elogiam o conforto e a elegância do ambiente todos os dias. O projeto comercial gerou mais valor de marca e retorno de investimento imediato.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Mariana & Roberto Silveira',
    role: 'Proprietários de Casa em Condomínio',
    location: 'Feira de Santana - BA',
    text: 'Acompanhamento do início ao fim. Estávamos com medo de construir nossa primeira casa, mas o detalhamento em 3D e as orientações da Luana nos pouparam muito dinheiro e estresse com a obra. Ficou simplesmente espetacular!',
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Vocês atendem apenas em Salvador e Feira de Santana?',
    answer: 'Atendemos presencialmente em Feira de Santana, Salvador e região metropolitana. Para outras cidades da Bahia, estados do Brasil ou exterior, oferecemos nossa modalidade de Projeto Online com suporte 100% digital, reuniões por videoconferência e imagens 3D hiper-realistas de altíssima qualidade.'
  },
  {
    id: 'faq-2',
    question: 'Preciso gastar muito ou fazer grandes obras para transformar meu lar?',
    answer: 'Não necessariamente! Um dos grandes diferenciais da Luana Fatel é a capacidade de realizar transformações de alto impacto visual e funcional através de projetos de interiores inteligentes. Trabalhamos focado em marcenaria estratégica, iluminação correta, pintura e escolha certa de móveis e decorações, evitando quebra-quebra onde não é preciso.'
  },
  {
    id: 'faq-3',
    question: 'Como funciona o processo de pagamento e quanto custa um projeto?',
    answer: 'O investimento é calculado de forma personalizada de acordo com a metragem quadrada, complexidade e quantidade de cômodos do seu imóvel. Facilitamos o pagamento em parcelas durante o desenvolvimento do projeto. Toque no botão do WhatsApp para conversarmos e receber uma proposta personalizada de acordo com o seu sonho!'
  },
  {
    id: 'faq-4',
    question: 'O que está incluso no material final entregue?',
    answer: 'Você receberá o Caderno de Projeto completo, composto por: Imagens 3D hiper-realistas para aprovação visual, Planta de Layout com fluxos, Projeto Luminotécnico e Elétrico, Planta de Gesso e Acabamentos, Especificação exata de revestimentos e tintas, e o Detalhamento de Marcenaria pronto para orçamento em marcenarias de sua preferência.'
  },
  {
    id: 'faq-5',
    question: 'Quanto tempo leva para o projeto ficar pronto?',
    answer: 'Dependendo da dimensão do espaço e das etapas de revisão, o prazo médio para a entrega do estudo preliminar em 3D varia entre 15 a 30 dias úteis após a reunião de briefing. Após a sua aprovação, o executivo técnico e marcenaria costumam levar de 10 a 20 dias úteis adicionais.'
  }
];

export interface BeforeAfterPairData {
  id: number;
  before: string;
  after: string;
  category: string;
  description: string;
}

export const BEFORE_AFTER_GALLERY: BeforeAfterPairData[] = [
  {
    id: 1,
    before: 'https://i.postimg.cc/CKcddqp1/639249.jpg',
    after: 'https://i.postimg.cc/yNLWWZ45/639252.jpg',
    category: 'Transformação 01',
    description: 'Aproveitamento refinado do ambiente com iluminação cênica integrada e acabamentos sob medida.'
  },
  {
    id: 2,
    before: 'https://i.postimg.cc/GpX99ynp/639255.jpg',
    after: 'https://i.postimg.cc/DzxmmX3f/639258.jpg',
    category: 'Transformação 02',
    description: 'Otimização inteligente do espaço com marcenaria planejada contemporânea e fluidez visual.'
  },
  {
    id: 3,
    before: 'https://i.postimg.cc/R0gqqHxS/639261.jpg',
    after: 'https://i.postimg.cc/25033ZNz/639264.jpg',
    category: 'Transformação 03',
    description: 'Integração de sala de jantar e estar trazendo amplitude, aconchego e luxo contemporâneo.'
  },
  {
    id: 4,
    before: 'https://i.postimg.cc/7LKbb2rq/639267.jpg',
    after: 'https://i.postimg.cc/7LKbb2r8/639270.jpg',
    category: 'Transformação 04',
    description: 'Cozinha sofisticada com bancadas esculpidas, organization estratégica e alto padrão nos detalhes.'
  },
  {
    id: 5,
    before: 'https://i.postimg.cc/R0gqqHxr/639273.jpg',
    after: 'https://i.postimg.cc/PqSNNwsg/639276.jpg',
    category: 'Transformação 05',
    description: 'Painéis elegantes de madeira integrados com iluminação indireta sutil e mobiliário curado.'
  },
  {
    id: 6,
    before: 'https://i.postimg.cc/PqSNNwsB/639279.jpg',
    after: 'https://i.postimg.cc/QtVC7dj8/639285.jpg',
    category: 'Transformação 06',
    description: 'Living requintado redefinindo fluxos de circulação e integrando materiais nobres na decoração.'
  },
  {
    id: 7,
    before: 'https://i.postimg.cc/PxNJD5dd/639288.jpg',
    after: 'https://i.postimg.cc/R0gqqHxq/639291.jpg',
    category: 'Transformação 07',
    description: 'Banheiro de casal luxuoso com revestimentos de grande formato e metais minimalistas premium.'
  },
  {
    id: 8,
    before: 'https://i.postimg.cc/1t4XF3yX/639325.jpg',
    after: 'https://i.postimg.cc/FR1zSHhk/639333.jpg',
    category: 'Transformação 08',
    description: 'Closet planejado de alto padrão com portas em vidro reflecta e nichos de iluminação interna.'
  },
  {
    id: 9,
    before: 'https://i.postimg.cc/qRgqKvpX/639346.jpg',
    after: 'https://i.postimg.cc/sX1xWg3S/639350.jpg',
    category: 'Transformação 09',
    description: 'Varanda e área externa integradas com revestimentos atérmicos e conforto paisagístico.'
  },
  {
    id: 10,
    before: 'https://i.postimg.cc/SsjR9xmz/639351.jpg',
    after: 'https://i.postimg.cc/W3tzZ1sk/639355.jpg',
    category: 'Transformação 10',
    description: 'Suíte secundária com cabeceiras estofadas em linho e luz suave ideal para o descanso.'
  },
  {
    id: 11,
    before: 'https://i.postimg.cc/DZm0Gw7P/639360.jpg',
    after: 'https://i.postimg.cc/wv3MNj9X/639361.jpg',
    category: 'Transformação 11',
    description: 'Estúdio de home office requintado com painéis de madeira confortáveis e excelente ergonomia.'
  },
  {
    id: 12,
    before: 'https://i.postimg.cc/cH6C3Ldm/639364.jpg',
    after: 'https://i.postimg.cc/xCq8m19K/639366.jpg',
    category: 'Transformação 12',
    description: 'Espaço home theater focado em acústica, iluminação dimerizável e estofados ultra profundos.'
  },
  {
    id: 13,
    before: 'https://i.postimg.cc/zBMBFYft/639372.jpg',
    after: 'https://i.postimg.cc/tTfTNGgB/639375.jpg',
    category: 'Transformação 13',
    description: 'Hall social privativo com aparadores esculpidos em pedra de alto luxo e espelhos bronze.'
  },
  {
    id: 14,
    before: 'https://i.postimg.cc/3R6RFQw9/639378.jpg',
    after: 'https://i.postimg.cc/cHjHBGJD/639381.jpg',
    category: 'Transformação 14',
    description: 'Layout social com pé-direito duplo unificado de forma cênica com marcenaria integrada.'
  },
  {
    id: 15,
    before: 'https://i.postimg.cc/8535mgCd/639384.jpg',
    after: 'https://i.postimg.cc/Jngn5ChJ/639385.jpg',
    category: 'Transformação 15',
    description: 'Varanda gourmet com marcenaria náutica e mesa de madeira maciça de alta durabilidade.'
  },
  {
    id: 16,
    before: 'https://i.postimg.cc/63S3fxQn/639388.jpg',
    after: 'https://i.postimg.cc/C1t1spKb/639390.jpg',
    category: 'Transformação 16',
    description: 'Quarto master com painel estofado sob medida e arandelas douradas em composição simétrica.'
  },
  {
    id: 17,
    before: 'https://i.postimg.cc/QtVC7dj0/639394.jpg',
    after: 'https://i.postimg.cc/3R6RFQwF/639399-(1).jpg',
    category: 'Transformação 17',
    description: 'Redesenho completo de fachada contemporânea com brises deslizantes e linhas minimalistas puras.'
  }
];

export const NEW_PROJECT_IMAGES = [
  'https://i.postimg.cc/nzMrmhnp/639285-(1).jpg',
  'https://i.postimg.cc/d1D3CVJD/639317-(1).jpg',
  'https://i.postimg.cc/k4DGSg76/639333-(1).jpg',
  'https://i.postimg.cc/cH6C3Ldh/639394-(1).jpg',
  'https://i.postimg.cc/1t4XF3yt/639309.jpg',
  'https://i.postimg.cc/QtVC7djH/639317.jpg'
];
