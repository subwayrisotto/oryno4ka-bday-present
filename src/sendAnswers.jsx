import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export function sendAnswers(text) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { answers: text, sent_at: new Date().toLocaleString() },
    { publicKey: PUBLIC_KEY },
  );
}
