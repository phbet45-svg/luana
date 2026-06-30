export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'residencial' | 'comercial' | 'reforma' | 'interiores';
  imageUrl: string;
  beforeImageUrl?: string;
  location: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface BeforeAfterPair {
  id: number;
  before: string;
  after: string;
  category?: string;
  description?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
