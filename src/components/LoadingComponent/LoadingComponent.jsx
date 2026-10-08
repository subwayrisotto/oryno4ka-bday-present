import React, { useEffect, useState } from "react";

const MESSAGES = [
  "Analyzing your choices...",
  "Thinking what you deserve...",
  "Wrapping the present...",
  "Almost ready...",
];

const MESSAGE_INTERVAL = 1500;

function LoadingComponent({ onDone }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((i) => {
        if (i === MESSAGES.length - 1) {
          clearInterval(timer);
          return i;
        }
        return i + 1;
      });
    }, MESSAGE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (messageIndex !== MESSAGES.length - 1) return;
    const done = setTimeout(onDone, MESSAGE_INTERVAL);
    return () => clearTimeout(done);
  }, [messageIndex, onDone]);

  return (
    <div className="content">
      <div className="spinner" />
      <p className="loading-text">{MESSAGES[messageIndex]}</p>
    </div>
  );
}

export default LoadingComponent;
