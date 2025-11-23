
export enum ViewState {
  LANDING = 'LANDING',
  COURSE_PLAYER = 'COURSE_PLAYER',
}

export interface LessonStep {
  id: string;
  title: string;
  description?: string; // Brief description shown in sidebar
  instruction: string;
  initialCode: string;
  expectedOutputKeyword?: string; // Simple validation check
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  lessons: LessonStep[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ExecutionResult {
  output: string;
  isError: boolean;
}
