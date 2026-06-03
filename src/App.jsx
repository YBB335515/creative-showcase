import { useScroll } from 'framer-motion'
import './App.css'
import Scene3D from './components/Scene3D.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Works from './components/Works.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'

function App() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="app">
      <div className="canvas-wrapper">
        <Scene3D scrollProgress={scrollYProgress} />
      </div>
      <Navbar />
      <MusicPlayer />
      <div className="content">
        <Hero />
        <About />
        <Experience />
        <Works />
        <Testimonials />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
