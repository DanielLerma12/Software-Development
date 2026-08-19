import { useQuestionsData } from "./hooks/useQuestionsData.ts";
import { Button, TextField } from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { selectQuiz } from "./services/selectQuiz.ts";
import { Toaster, toast } from "sonner";

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();

  const resetQuiz = useQuestionsStore((state) => state.resetQuiz);
  const isFetching = useQuestionsStore((state) => state.isFetching);
  const isFetchingChange = useQuestionsStore((state) => state.isFetchingChange);
  const modTitleQuiz = useQuestionsStore((state) => state.modTitleQuiz);
  const fetchQuestionChange = useQuestionsStore(
    (state) => state.fetchQuestionChange,
  );

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== "Enter") return;

    const input = event.target as HTMLInputElement;
    const textValue = input.value;
    if (textValue === "") return;

    const regex = /^[^,]+,\s*[^,]+$/;
    if (!regex.test(textValue)) return;

    const textValueSplitRaw = textValue.split(",");
    const titleQuizRaw = textValueSplitRaw[0];
    const difficulty = textValueSplitRaw[1];

    try {
      isFetchingChange(); // disabled de toda interaccion
      const { titleQuiz, newQuestions } = await selectQuiz(
        titleQuizRaw,
        difficulty,
      ); // return de las dos propiedades a cambiar
      if (titleQuiz !== "" || newQuestions !== "") {
        modTitleQuiz(titleQuiz); // modificar el titulo
        fetchQuestionChange(newQuestions); // cambio del cuestionario
      } else {
        toast("Ingresa un quiz type o level correcto");
      }
    } finally {
      isFetchingChange(); // enabled de toda interaccion
    }
  };

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>
        {`✅ ${correct} correct -- ❌ ${incorrect} incorrect -- ❓ ${unanswered} unanswered`}{" "}
      </strong>
      <div
        style={{
          marginTop: "16px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Button onClick={() => resetQuiz()} disabled={isFetching}>
          Reset Quiz
        </Button>
        <TextField
          label="quiz type, level"
          variant="outlined"
          size="small"
          onKeyDown={handleKeyDown}
          disabled={isFetching}
        />
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "#800B00",
            color: "#E8BEBE",
            fontSize: 14,
          },
        }}
      />
    </footer>
  );
};
