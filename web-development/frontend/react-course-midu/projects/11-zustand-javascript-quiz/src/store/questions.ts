import { create } from "zustand";
import { type Question } from "../types.d";
import { persist } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  titleQuiz: string;
  modTitleQuiz: (titleQuiz: string) => void;
  isFetching: boolean;
  isFetchingChange: () => void;
  fetchQuestion: (limit: number) => Promise<void>;
  fetchQuestionChange: (newQuestions: Question[]) => void;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  resetQuiz: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      //set y get como parámetros
      return {
        questions: [],
        currentQuestion: 0,
        titleQuiz: "JavaScript",
        modTitleQuiz: (titleQuiz: string) => {
          set({ titleQuiz });
        },
        isFetching: false,
        isFetchingChange: () =>
          set((state) => ({
            isFetching: !state.isFetching,
          })),
        fetchQuestion: async (limit: number) => {
          const res = await fetch("http://localhost:5173/data.json");
          const json = await res.json();

          const questions = json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);

          set({ questions });
        },

        fetchQuestionChange: (newQuestions) => {
          set({ questions: newQuestions });
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();
          const newQuestions = structuredClone(questions);

          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId,
          );
          const questionInfo = newQuestions[questionIndex];
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;

          // cambiar la informacion en la copia de la pregunta
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };

          // actualizar el estado

          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;

          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion });
          }
        },

        resetQuiz: () => {
          set({
            questions: [],
            currentQuestion: 0,
            isFetching: false,
            titleQuiz: "JavaScript",
          });
        },
      };
    },
    {
      name: "questions", // por defecto guarda en el localStorage si no se especifica
    },
  ),
);
