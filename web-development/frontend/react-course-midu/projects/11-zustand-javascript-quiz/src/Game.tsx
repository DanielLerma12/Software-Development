import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useQuestionsStore } from "./store/questions";
import type { Question as QuestionType } from "./types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import confetti from "canvas-confetti";
import { Footer } from "./Footer.tsx";

const getBackgroundColor = (info: QuestionType, answerIndex: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  // usuario no ha seleccionado nada todavia
  if (userSelectedAnswer === undefined) return "transparent";
  // si ya soluciono pero la solucion es incorrecta
  if (answerIndex !== correctAnswer && answerIndex !== userSelectedAnswer)
    return "transparent";
  // si esta es la solucion correcta
  if (answerIndex === correctAnswer) {
    return "green";
  }
  // si esta es la seleccion del usuario pero no es correcta
  if (answerIndex === userSelectedAnswer) return "red";
  // si no es ninguna de las anteriores
  return "transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);
  const isFetching = useQuestionsStore((state) => state.isFetching);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
    if (answerIndex === info.correctAnswer) {
      confetti();
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        textAlign: "left",
        backgroundColor: "#222",
        padding: 2,
        marginTop: 4,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {info.question}
      </Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ backgroundColor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index),
              }}
              disabled={info.userSelectedAnswer !== undefined || isFetching}
            >
              <ListItemText
                primary={answer}
                sx={{ textAlign: "center" }}
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion,
  );
  const isFetching = useQuestionsStore((state) => state.isFetching);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0 || isFetching}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1 || isFetching}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
