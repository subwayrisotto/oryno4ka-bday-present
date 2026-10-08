import React, { useEffect, useRef, useState } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const VIDEO_SRC = "/assets/birthday.mp4";
const POSTER_SRC = "/assets/letter-cover.jpg";

function EnvelopeComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [heartFlight, setHeartFlight] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setHeartFlight((f) => f + 1);
  };

  const handlePlay = (event) => {
    event.stopPropagation();
    setIsVideoPlaying(true);
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!isVideoPlaying || !video) return;

    video.play().catch(() => {});

    try {
      video.requestFullscreen?.()?.catch?.(() => {});
    } catch {}
  }, [isVideoPlaying]);

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
              {isOpen && isVideoPlaying && (
                <video
                  ref={videoRef}
                  className="letter-video visible"
                  src={VIDEO_SRC}
                  poster={POSTER_SRC}
                  autoPlay
                  controls
                  playsInline
                />
              )}

              {isOpen && !isVideoPlaying && (
                <>
                  <img
                    className="letter-cover"
                    src="/assets/letter-cover.jpg"
                    alt="Happy Birthday"
                  />
                  <button
                    className="letter-play-button"
                    type="button"
                    aria-label="Play birthday video"
                    onClick={handlePlay}
                  >
                    <span aria-hidden="true">&#9654;</span>
                  </button>
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
