import { useState } from "react";
import "./App.css";
import AgeVerificationComponent from "./components/AgeVerificationComponent/AgeVerificationComponent";
import ChoiceStepsComponent from "./components/ChoiceStepsComponent/ChoiceStepsComponent";
import EnvelopeComponent from "./components/EnvelopeComponent/EnvelopeComponent";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import WarningComponent from "./components/WarningComponent/WarningComponent";
import { sendAnswers } from "./sendAnswers";
import { QUESTIONS } from "./components/ChoiceStepsComponent/ChoiceStepsComponent";
const STORAGE_KEY = "birthday-answers";

const loadAnswers = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : null;
  } catch {
    return null;
  }
};

function App() {
  const [answers, setAnswers] = useState(() => loadAnswers() ?? []);
  const [stage, setStage] = useState(() =>
    loadAnswers() ? "envelope" : "verify",
  );

  const handleChoicesComplete = (result) => {
    setAnswers(result);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } catch {}

    const text = QUESTIONS.map(
      (q, i) => `${i + 1}. ${q.question}\n   → ${result[i]}`,
    ).join("\n\n");

    sendAnswers(text).catch((err) => console.error("Email failed", err));

    setStage("loading");
  };

  return (
    <div>
      {stage === "verify" && (
        <AgeVerificationComponent onVerified={() => setStage("warning")} />
      )}
      {stage === "warning" && (
        <WarningComponent onContinue={() => setStage("choices")} />
      )}
      {stage === "choices" && (
        <ChoiceStepsComponent onComplete={handleChoicesComplete} />
      )}
      {stage === "loading" && (
        <LoadingComponent onDone={() => setStage("envelope")} />
      )}
      {stage === "envelope" && <EnvelopeComponent />}
      <FooterComponent />
    </div>
  );
}

export default App;
