import { motion } from 'framer-motion'

const testimonials = [
  { text: '极具创意的前端开发者，对 3D 交互有独到的理解。', author: '某科技公司 CTO' },
  { text: '交付质量超出预期，细节把控非常到位。', author: '某产品经理' },
  { text: '技术栈全面，沟通高效，是值得长期合作的伙伴。', author: '某设计总监' },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section-glass">
      <div className="section-inner">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          客户评价
        </motion.h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              style={{
                padding: 32,
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.95rem', fontStyle: 'italic' }}>
                "{item.text}"
              </p>
              <div style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 500 }}>
                — {item.author}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
