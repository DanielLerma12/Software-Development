import "./App.css";

import { JavaScriptLogo } from "./JavaScriptLogo";
import { Container, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import { Start } from "./Start";

import { Game } from "./Game";
import { useQuestionsStore } from "./store/questions";

function App() {
  const questions = useQuestionsStore((state) => state.questions);
  const titleQuiz = useQuestionsStore((state) => state.titleQuiz);

  return (
    <>
      <main>
        <Container maxWidth="sm">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <JavaScriptLogo />
            <Typography variant="h2" component="h1">
              {`${titleQuiz} Quiz`}
            </Typography>
          </Stack>
          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Game />}
        </Container>
      </main>
    </>
  );
}

export default App;
