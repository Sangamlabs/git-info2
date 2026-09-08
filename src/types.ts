/**
 * Core type definitions for 17-Slide GitHub Presentation Deck
 * 15 Main Content Slides + 2 Temporary Greeting Slides
 */

export type NavigationSection = 
  | 'WELCOME'
  | 'FOUNDATIONS'
  | 'WORKFLOW'
  | 'SYNC'
  | 'COLLABORATION'
  | 'SECURITY'
  | 'INTEGRATION'
  | 'PROFILE'
  | 'CONCLUSION';

export interface LearningPattern {
  technicalTerm: string;
  simpleMeaning: string;
  analogy: string;
  visualDescription: string;
  realExample: string;
  keyTakeaway: string;
}

export interface SpeakerNote {
  whatToSay: string;
  simpleExplanation: string;
  realWorldExample: string;
  technicalDetail: string;
  questionForStudents: string;
  transition: string;
}

export interface MemoryTrick {
  term: string;
  analogy: string;
  icon?: string;
}

export interface SlideData {
  id: number; // Exactly 1 to 17
  numberStr: string; // "01" to "17"
  title: string;
  subtitle?: string;
  topic?: string;
  badge?: string;
  section: NavigationSection;
  tempType?: 'TEMP_GREETING' | 'TEMP_THANK_YOU';
  points: string[];
  takeaway?: string;
  memory?: string;
  flowSteps?: string[];
  codeSnippet?: {
    title?: string;
    code: string;
    language?: string;
  };
  speakerNotes: SpeakerNote;
  visualPlaceholderText?: string;
  visualType?: 
    | 'greeting' 
    | 'comparison' 
    | 'timeline' 
    | 'grid' 
    | 'areas' 
    | 'terminal' 
    | 'clone' 
    | 'sync' 
    | 'pr' 
    | 'security' 
    | 'fork' 
    | 'api' 
    | 'profile' 
    | 'thank_you';
  layout?: string;
  payload?: any;
}

