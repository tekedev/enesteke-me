import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/projectsData';
import './Skills.css';

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="service-section">
      <div className="service-container" ref={ref}>
        <motion.div
          className="service-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="label">SERVICES & CAPABILITIES</span>
          <h2 className="heading-lg">
            Engineering <em className="italic-accent">stack & domain mastery.</em>
          </h2>
        </motion.div>

        <div className="service-grid">
          {skills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Corner Crosshair Decoration (Alche Studio style) */}
              <div className="service-cross">
                <div className="cross-dot"></div>
              </div>

              <div className="service-card-top">
                <span className="service-num">0{idx + 1}</span>
                <h3 className="service-title">{cat.category}</h3>
                <p className="service-desc">{cat.description}</p>
              </div>

              <div className="service-pills">
                {cat.items.map(item => (
                  <div key={item.name} className="service-pill">
                    <span className="pill-name">{item.name}</span>
                    <span className="pill-lvl">{item.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
