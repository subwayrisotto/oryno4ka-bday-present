import React, { useState } from "react";

const B_DAY = "8.10";
const VIDEO_URL =
  "https://www.youtube.com/embed/yuIdcXnixqo?autoplay=1&playsinline=1";

function AgeVerificationComponent({ onVerified }) {
  const [isBirthday, setIsBirthday] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  const verifyAge = () => {
    const today = new Date();
    const [day, month] = B_DAY.split(".").map(Number);

    const matches = today.getMonth() + 1 === month && today.getDate() === day;

    setIsBirthday(matches);
    if (matches) onVerified();
  };

  return (
    <div className="content">
      <p>Do you confirm that you are 26 years old?</p>
      {isBirthday === false && (
        <p>Today is not your birthday! Don't lie to me.</p>
      )}

      <div className="btn-ctn">
        <button type="button" onClick={verifyAge}>
          Yes
        </button>
        <button type="button" onClick={() => setShowVideo(true)}>
          No
        </button>
      </div>

      {showVideo && (
        <div className="video-ctn">
          <p>In that case you should watch this video:</p>
          <iframe
            className="video-frame"
            src={VIDEO_URL}
            title="YouTube video"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

export default AgeVerificationComponent;
