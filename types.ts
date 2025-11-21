export enum SectionId {
  INTRO = 'INTRO',
  PRINCIPLE = 'PRINCIPLE',
  THROTTLING = 'THROTTLING',
  APPLICATIONS = 'APPLICATIONS',
  DESIGN = 'DESIGN'
}

export interface ThrottlingMethod {
  id: string;
  name: string;
  description: string;
  mechanism: string;
  stiffness: string;
  pros: string[];
  cons: string[];
  applications: string[];
  formula?: string; // Simplified representation
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ContentSectionData {
  id: SectionId;
  title: string;
  content: React.ReactNode;
}