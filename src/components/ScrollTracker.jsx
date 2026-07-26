import { useState, useEffect } from 'react';
import './ScrollTracker.css';

const SECTIONS = [
  { id: 'top', label: 'TOP' },
  { id: 'work', label: 'WORKS' },
  { id: 'skills', label: 'CAPABILITIES' },
  { id: 'about', label: 'MISSION' },
  { id: 'contact', label: 'CONTACT' },
];

export default function ScrollTracker() {
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="TopScrollIndicator__top_scroll_indicator">
      <div className="TopScrollIndicator__section_list">
        {SECTIONS.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className={`TopScrollIndicator__section_item ${
              activeSection === sec.id ? 'is-active' : ''
            }`}
          >
            <div className="TopScrollIndicator__section_main">
              <div className="TopScrollIndicator__section_line">
                <div className="TopScrollIndicator__section_label">
                  {sec.label}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
