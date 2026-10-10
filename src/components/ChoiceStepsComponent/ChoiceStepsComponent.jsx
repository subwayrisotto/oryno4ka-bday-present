import React, { useState } from "react";

export const QUESTIONS = [
  { question: "Sea or Mountain?", options: ["1_1", "1_2"] },
  { question: "Who is the GOAT?", options: ["2_1", "2_2"] },
  {
    question: "Which song describes you the best?",
    type: "text",
    placeholder: "Type your answer...",
  },
  { question: "Healthy shit or McDonald's?", options: ["3_1", "3_2"] },
  { question: "Gym or Gaming?", options: ["4_1", "4_2"] },
  { question: "Which type of evening do you prefer?", options: ["5_1", "5_2"] },
  {
    question: "Describe yourself in 3 words:",
    type: "text",
    placeholder: "Type your answer...",
  },
  { question: "Home chill or clubbing?", options: ["6_1", "6_2"] },
  {
    question: "No idea who they are, but you have to choose one",
    options: ["8_1", "8_2"],
  },
  {
    question: "Your funniest red flag that nobody knows about is:",
    type: "text",
    placeholder: "Type your answer...",
  },
  {
    question: "🫣🫣🫣",
    options: ["7_1", "7_2"],
    warning:
      "And now the MOST IMPORTANT question, the one that can change everything.",
  },
];

function ChoiceStepsComponent({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [text, setText] = useState("");
  const [warningSeen, setWarningSeen] = useState(false);

  const submitText = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setText("");
    choose(value);
  };

  const current = QUESTIONS[index];

  if (current.warning && !warningSeen) {
    return (
      <div className="content">
        <div className="warning-card warning-final">
          <div className="warning-icon" aria-hidden="true">
            🚨
          </div>
          <h2 className="warning-title">Wait!</h2>
          <p className="warning-text">{current.warning}</p>

          <div className="btn-ctn">
            <button type="button" onClick={() => setWarningSeen(true)}>
              I understand
            </button>
          </div>
        </div>
      </div>
    );
  }

  const choose = (option) => {
    const nextAnswers = [...answers, option];

    if (index === QUESTIONS.length - 1) {
      onComplete(nextAnswers);
      return;
    }
    setAnswers(nextAnswers);
    setWarningSeen(false);
    setIndex(index + 1);
  };

  return (
    <div className="content">
      <p className="step-counter">
        Step {index + 1} of {QUESTIONS.length}
      </p>

      <div className="step-progress">
        <div
          className="step-progress-fill"
          style={{ width: `${(index / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {current.type === "text" ? (
        <form className="text-answer" onSubmit={submitText}>
          <label htmlFor="text-answer" className="sr-only">
            {current.question}
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={current.placeholder}
            maxLength={60}
            autoFocus
            id="text-answer"
          />
          <div className="btn-ctn">
            <button type="submit" disabled={!text.trim()}>
              Next
            </button>
          </div>
        </form>
      ) : (
        <div className="question-option-ctn">
          <p className="sr-only">{current.question}</p>
          <div>
            {current.options.map((option) => (
              // <button key={option} type="button" onClick={() => choose(option)}>
              //   {option}
              // </button>
              <img
                src={`/assets/questions/${option}.jpg`}
                alt={option}
                key={option}
                onClick={() => choose(option)}
                className="question-option-img"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChoiceStepsComponent;
