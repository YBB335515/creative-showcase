import { motion } from 'framer-motion'

export default function Intro() {
  return (
    <section id="intro" className="section section-glass">
      <div className="section-inner">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          个人介绍
        </motion.h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p style={{
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
              fontSize: '1.1rem',
            }}>
              很抱歉，出于隐私信息保护的考虑，我暂时无法提供相应信息。
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              width: 280,
              height: 280,
              borderRadius: 24,
              overflow: 'hidden',
              border: '2px solid var(--glass-border)',
              boxShadow: 'var(--shadow-glow)',
            }}>
              <img
                src="/images/profile.jpg"
                alt="个人照片"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
