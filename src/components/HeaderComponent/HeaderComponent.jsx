import React, { useEffect, useState } from "react";
import VoiceMessage from "../VoiceMessage/VoiceMessage";

const BIO_TITLE = "A little note from me ♥";
// const BIO_TEXT =
//   "Write your cute text here. A few sentences is perfect: who you are, what you wish for her/him, anything sweet.";

function HeaderComponent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      <header className="header">
        <button
          type="button"
          className="header-link"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
        >
          <span className="header-heart">
            <img src="/assets/heart.svg" alt="Heart" />
          </span>
          <span>psst... click me</span>
        </button>
      </header>

      {isOpen && (
        <div className="bio-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="bio-card"
            role="dialog"
            aria-modal="true"
            aria-label="Bio"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="bio-close"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <h2 className="bio-title">{BIO_TITLE}</h2>
            {/* <p className="bio-text">{BIO_TEXT}</p> */}
            <VoiceMessage src="/assets/voice.mp3" />
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderComponent;
