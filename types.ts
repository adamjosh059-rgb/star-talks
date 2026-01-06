
export interface BirthDetails {
  date: string;
  time: string;
  location: string;
}

export interface PlanetaryPosition {
  planet: string;
  house: number;
  sign: string;
  isRetrograde: boolean;
}

export interface ChartData {
  lagna: string;
  positions: PlanetaryPosition[];
  summary: string;
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
