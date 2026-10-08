import React from "react";

function FooterComponent() {
  return (
    <footer className="footer">
      <svg
        className="footer-wave"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="#ffc2d1"
        />
      </svg>

      <div className="footer-body">
        <span className="footer-heart">♥</span>
        <p className="footer-text">Made with love, just for you</p>
        <span className="footer-heart">♥</span>
      </div>
    </footer>
  );
}

export default FooterComponent;
