import React, { useRef, useState } from "react";

function VoiceMessage({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <div className="voice">
      <button type="button" className="voice-btn" onClick={toggle}>
        {isPlaying ? "⏸" : "▶"} Voice message
      </button>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

export default VoiceMessage;
