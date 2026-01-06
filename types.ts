
export type AstrologicalSystem = 'western' | 'vedic' | 'chinese' | 'hellenistic';

export interface BirthDetails {
  name: string;
  date: string;
  time: string;
  location: string;
}

export interface PlanetaryPosition {
  planet: string;
  house?: number;
  sign?: string;
  element?: string; // For Chinese
  animal?: string; // For Chinese
  isRetrograde?: boolean;
}

export interface ChartData {
  system: AstrologicalSystem;
  lagna?: string; // Ascendant for Western/Vedic
  pillars?: any; // For Chinese BaZi
  positions: PlanetaryPosition[];
  summary: string;
  structuralAnalysis: string; // The "soul and genuine infrastructure" explanation
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
}
