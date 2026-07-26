import { useState } from 'react';
import './SlotButton.css';

export default function SlotButton({ text, href, onClick, className = '' }) {
  const [displayText, setDisplayText] = useState(text);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  const handleMouseEnter = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
  };

  const content = (
    <span className="SlotButton__text_wrapper">
      <span className="SlotButton__text">{displayText}</span>
      <span className="SlotButton__text_hover">{text}</span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`SlotButton__button ${className}`}
        onMouseEnter={handleMouseEnter}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`SlotButton__button ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      type="button"
    >
      {content}
    </button>
  );
}
