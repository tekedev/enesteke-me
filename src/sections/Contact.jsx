import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="contact" className="contact">
      <div className="contact__inner" ref={ref}>
        <motion.span
          className="label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          CONTACT
        </motion.span>

        <motion.h2
          className="contact__heading"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Let's work<br />
          <em className="italic-accent">together.</em>
        </motion.h2>

        <motion.p
          className="contact__text"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Have an idea? Let's make it real.
        </motion.p>

        <motion.a
          href="mailto:hello@enesteke.me"
          className="contact__email"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          hello@enesteke.me →
        </motion.a>

        <motion.div
          className="contact__socials"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="https://github.com/tekedev" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className="contact__dot" aria-hidden="true">·</span>
          <a href="https://x.com/enesteke" target="_blank" rel="noopener noreferrer">X</a>
          <span className="contact__dot" aria-hidden="true">·</span>
          <a href="https://linkedin.com/in/enesteke" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </motion.div>
      </div>
    </section>
  );
}
