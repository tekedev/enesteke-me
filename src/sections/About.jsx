import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import './About.css';

const TECHS = [
  'PYTHON', 'REACT', 'FASTAPI', 'NEXT.JS', 'GEMINI AI', 'DOCKER',
  'TYPESCRIPT', 'POSTGRESQL', 'VERTEX AI', 'THREE.JS', 'FIREBASE',
  'PLAYWRIGHT', 'REDIS', 'SUPABASE', 'FLASK', 'ELECTRON', 'NODE.JS',
  'TAILWIND', 'MONGODB', 'OPENAI', 'FFMPEG', 'STRIPE', 'VERCEL',
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="about">
      <div className="about__inner" ref={ref}>
        <motion.span
          className="label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          ABOUT
        </motion.span>

        <motion.h2
          className="about__heading"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          I build things that<br />
          <em className="italic-accent">matter.</em>
        </motion.h2>

        <motion.p
          className="about__text"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          Full-stack developer focused on AI automation, FinTech systems, and creative web
          experiences. I build production tools that handle real scale — from 260+ managed
          accounts to real-time trading signals.
        </motion.p>
      </div>

      {/* Tech marquee */}
      <motion.div
        className="about__marquee-wrap"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="about__marquee">
          <div className="about__marquee-track">
            {[...TECHS, ...TECHS].map((t, i) => (
              <span key={i} className="about__marquee-item">
                {t}
                <span className="about__marquee-dot" aria-hidden="true">·</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
