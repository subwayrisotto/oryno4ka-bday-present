import React from "react";

function WarningComponent({ onContinue }) {
  return (
    <div className="content">
      <div className="warning-card">
        <div className="warning-icon" aria-hidden="true">
          ⚠️
        </div>
        <h2 className="warning-title">Attention!</h2>
        <p className="warning-text">
          I have a few different presents for you, but only one of them can be
          yours.
        </p>
        <p className="warning-text warning-small">
          Your answers will decide which one. Choose wisely.
        </p>

        <div className="btn-ctn">
          <button type="button" onClick={onContinue}>
            I'm ready
          </button>
        </div>
      </div>
    </div>
  );
}

export default WarningComponent;
