import { motion } from 'framer-motion'

const timeline = [
  { year: '2024', title: '自由创意开发', desc: '专注于 3D 交互与前沿技术探索' },
  { year: '2023', title: '高级前端工程师', desc: '主导多个大型项目的前端架构设计' },
  { year: '2021', title: '独立开发者', desc: '开始接触 Three.js，探索 3D 可视化领域' },
  { year: '2019', title: '前端入门', desc: '踏上编程之路，从 HTML/CSS 开始' },
]

export default function Experience() {
  return (
    <section id="experience" className="section section-glass">
      <div className="section-inner">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          成长历程
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          每一步都是成长的见证
        </motion.p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', paddingLeft: 40 }}>
          {/* Timeline line */}
          <div style={{ position: 'absolute', left: 15, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--color-primary), var(--color-secondary))' }} />
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              style={{
                display: 'flex',
                gap: 24,
                padding: '24px 0',
                position: 'relative',
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginLeft: -40,
                fontSize: '0.75rem', fontWeight: 700, color: '#fff',
                zIndex: 1,
              }}>
                {item.year.slice(-2)}
              </div>
              <div>
                <div style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>{item.year}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 6 }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
