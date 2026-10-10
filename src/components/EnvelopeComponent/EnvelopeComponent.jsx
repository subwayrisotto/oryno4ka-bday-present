import React, { useRef, useState } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const AUDIO_SRC = "/assets/greetings.mp3";

function EnvelopeComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [heartFlight, setHeartFlight] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setHeartFlight((f) => f + 1);
  };

  const toggleAudio = (event) => {
    event.stopPropagation(); // don't trigger the envelope click
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <div className="content">
      <div className="evnelope-wrapper">
        <div
          id="evnelope"
          className={`evnelope ${isOpen ? "open" : "closed"}`}
          onClick={handleOpen}
        >
          <div className="front flap"></div>
          <div className="front pocket"></div>

          <div className="letter">
            <div className="letter-content">
              {isOpen && (
                <>
                  <img
                    className="letter-cover"
                    src="/assets/letter-cover.jpg"
                    alt="Happy Birthday"
                  />
                  <button
                    className={`letter-play-button ${isPlaying ? "playing" : ""}`}
                    type="button"
                    aria-label={
                      isPlaying ? "Pause voice message" : "Play voice message"
                    }
                    onClick={toggleAudio}
                  >
                    <span aria-hidden="true">
                      {isPlaying ? "\u23F8" : "\u25B6"}
                    </span>
                  </button>

                  <audio
                    ref={audioRef}
                    src={AUDIO_SRC}
                    preload="auto"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                </>
              )}
            </div>
          </div>

          <div
            key={heartFlight}
            className={`hearts ${heartFlight > 0 && isOpen ? "fly" : ""}`}
          >
            <div className="heart a1"></div>
            <div className="heart a2"></div>
            <div className="heart a3"></div>
          </div>
        </div>
      </div>

      <HeaderComponent />
    </div>
  );
}

export default EnvelopeComponent;
