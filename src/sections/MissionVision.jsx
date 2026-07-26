import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import './MissionVision.css';

export default function MissionVision() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="mission-vision">
      {/* MISSION SECTION */}
      <div className="mv-container" ref={ref1}>
        <motion.div
          className="mv-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="label">MISSION / PHILOSOPHY</span>
        </motion.div>

        <motion.div
          className="mv-title-svg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="stroke-title">MISSION</h2>
        </motion.div>

        <div className="mv-body">
          <motion.p
            className="mv-text-ja"
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Geleceğin dijital dünyasında hiç deneyimlenmemiş otonom yapay zeka sistemleri, yüksek ölçekli FinTech altyapıları ve büyüleyici web platformları inşa ediyoruz.
          </motion.p>
          <motion.p
            className="mv-text-en"
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Architecting production-grade AI platforms, FinTech intelligence, and high-concurrency systems like no other.
          </motion.p>
        </div>
      </div>

      {/* VISION SECTION */}
      <div className="mv-container mv-container--vision" ref={ref2}>
        <motion.div
          className="mv-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="label">VISION / FUTURE</span>
        </motion.div>

        <motion.div
          className="mv-title-svg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="stroke-title stroke-title--cyan">VISION</h2>
        </motion.div>

        <div className="mv-body">
          <motion.p
            className="mv-text-ja"
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Mühendislik sınırlarını zorlayan, karmaşık problemleri zarif çözümlere dönüştüren ve kullanıcılarda iz bırakan eserler tasarlamak.
          </motion.p>
          <motion.p
            className="mv-text-en"
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Architect worlds that move hearts and spark hope. Transforming complex engineering into seamless digital reality.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
