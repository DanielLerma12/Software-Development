import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";

import "./App.css";
import { AUTO_LANGUAGUE } from "./constants";
import { ArrowInterButton, SpeakerButton } from "./components/icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";
import { CopyButton } from "./components/icons";

function App() {
  const {
    state,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debouncedFromText = useDebounce(state.fromText);

  useEffect(() => {
    if (debouncedFromText === "") return;
    translate({
      fromLanguage: state.fromLanguage,
      toLanguage: state.toLanguage,
      text: debouncedFromText,
    })
      .then((result) => {
        if (result === null) return;
        setResult(result);
      })
      .catch(() => setResult("Error"));
  }, [debouncedFromText, state.fromLanguage, state.toLanguage]);

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(state.result);
    utterance.lang = state.toLanguage;
    speechSynthesis.speak(utterance);
  };

  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={state.fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={state.fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button
            onClick={interchangeLanguages}
            disabled={state.fromLanguage === AUTO_LANGUAGUE}
          >
            <ArrowInterButton />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={state.toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: "relative" }}>
              <TextArea
                type={SectionType.To}
                value={state.result}
                onChange={setResult}
                loading={state.loading}
              />

              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  display: "flex",
                }}
              >
                {" "}
                <Button
                  variant="link"
                  style={{ position: "absolute", left: 0, bottom: 0 }}
                  onClick={() => {
                    navigator.clipboard.writeText(state.result);
                  }}
                >
                  {<CopyButton />}
                </Button>
                <Button
                  variant="link"
                  onClick={handleSpeak}
                  style={{ position: "absolute", left: 50, bottom: 0 }}
                >
                  {<SpeakerButton />}
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
