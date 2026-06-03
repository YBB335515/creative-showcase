import { motion } from 'framer-motion'

const stats = [
  { number: 50, suffix: '+', label: '项目经验' },
  { number: 5, suffix: '+', label: '开发年限' },
  { number: 99, suffix: '%', label: '客户满意' },
]

export default function About() {
  return (
    <section id="about" className="section section-glass">
      <div className="section-inner">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          关于我
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign: 'left' }}
        >
          热爱技术与创意的前端开发者
        </motion.p>
        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h3>用代码创造视觉奇迹</h3>
            <p>
              我是一名专注于前端开发和 3D 视觉的创意工程师。
              擅长将复杂的技术转化为直观、精美的用户体验。
              从交互式数据可视化到沉浸式 3D 场景，
              我始终追求在技术与艺术之间找到完美的平衡点。
            </p>
            <div className="about-stats">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="about-stat"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                >
                  <div className="about-stat-number">
                    {s.number}{s.suffix}
                  </div>
                  <div className="about-stat-label">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="about-3d-box" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
