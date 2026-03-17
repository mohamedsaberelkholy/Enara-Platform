
export type UserRole = 'student' | 'teacher' | 'admin' | 'enara-admin';

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  avatar: string;
  progress: number;
  avgScore: number;
  studyTime: string;
  streak: number;
  status: 'excelling' | 'on track' | 'at risk';
  currentModule: string;
  subjects: Array<{
    name: string;
    progress: number;
    score: number;
  }>;
  batchId?: string;
  pastResults?: ExamResult[];
  chatLogs?: ChatMessage[];
}

export interface ExamResult {
  assessmentId: string;
  assessmentTitle: string;
  score: number;
  answers: Array<{
    questionId: string;
    questionText: string;
    studentAnswer: string | number;
    correctAnswer: string | number;
    isCorrect: boolean;
    explanation: string;
    modelAnswer?: string;
  }>;
  date: string;
}

export interface Chapter {
  id: string;
  title: string;
  uploads: string[]; // URLs or file names
  description?: string;
}

export interface Curriculum {
  id: string;
  name: string;
  courseName: string;
  type: string; // e.g., 'American', 'National', 'IB', 'IGCSE'
  level: string; // e.g., 'Grade 10', 'Advanced'
  languages: string[];
  summary: string; // Mandatory for AI context
  description: string;
  lastUpdated: string;
  subjectsCount: number;
  assignedBatches: string[];
  chapters: Chapter[];
  status: 'draft' | 'deployed';
  deploymentLink?: string;
}

export interface Batch {
  id: string;
  name: string;
  studentCount: number;
  curriculumId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'active' | 'locked';
  content?: string;
  order: number;
  materials?: string[];
  videoUrl?: string;
  quiz?: {
    questions: Array<{
      id: string;
      text: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  };
}

export interface Module {
  id: string;
  title: string;
  status: 'completed' | 'active' | 'locked';
  lessonsCount: number;
  completedLessons: number;
  lessons: Lesson[];
  materials?: string[];
  explanation?: string;
}

export interface Course {
  id: string;
  subject: string;
  title: string;
  modules: Module[];
}

export interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  text: string;
  options?: string[]; // Optional for short-answer
  correctAnswer: string | number; // Index for MC/TF, string for short-answer
  explanation: string;
  modelAnswer?: string;
}

export interface Assessment {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  questions: Question[];
  status: 'upcoming' | 'completed' | 'in-progress';
  dueDate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  curriculumId?: string;
  batchId?: string;
  instructions?: string;
}

export interface AssessmentRecommendation {
  suggestedTopic: string;
  suggestedDifficulty: 'Easy' | 'Medium' | 'Hard';
  suggestedQuestionTypes: string[];
  reasoning: string;
  focusAreas: string[];
}
