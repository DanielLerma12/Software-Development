import { useQuestionsStore } from "../store/questions";

export const useQuestionsData = () => {
  /*   const {questions} = useQuestionsStore(state => state) */ // actualizara todo el estado (nuevo render) en caso de que una propiedad cambie
  const questions = useQuestionsStore((state) => state.questions); // aqui me aseguro que solo lo haga si questions cambia

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer === undefined) unanswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });

  return {
    correct,
    incorrect,
    unanswered,
  };
};
