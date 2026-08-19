export interface Question {
  id: number;
  question: string;
  code: string;
  answers: string[];
  correctAnswer: number; // Índice de la respuesta correcta
  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}
