import { motion } from 'framer-motion'

const links = [
  { label: 'GitHub', href: '#', icon: '💻' },
  { label: '邮箱', href: '#', icon: '📧' },
  { label: '掘金', href: '#', icon: '📝' },
  { label: '小红书', href: '#', icon: '📕' },
]

export default function Contact() {
  return (
    <section id="contact" className="section section-glass">
      <div className="section-inner">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2>联系我</h2>
          <p>
            如果你对我的作品感兴趣，或者有任何合作想法，
            <br />
            欢迎随时联系我！
          </p>
          <div className="contact-links">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="contact-link"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span>{link.icon}</span>
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
