
export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number; // 1-100
}

export interface PortfolioData {
  name: string;
  title: string;
  summary: string;
  about: string;
  skills: Skill[];
  projects: Project[];
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
  };
}

export interface AppState {
  portfolioData: PortfolioData | null;
  isGenerating: boolean;
  theme: 'dark' | 'light';
  isPromptView: boolean;
}
