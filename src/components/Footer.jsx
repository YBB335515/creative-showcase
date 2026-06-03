export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} 创意工坊. All rights reserved.</p>
      <p className="footer-tech">Built with React + Three.js + Framer Motion</p>
    </footer>
  )
}
