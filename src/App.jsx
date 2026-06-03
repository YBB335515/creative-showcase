import { useScroll } from 'framer-motion'
import './App.css'
import Scene3D from './components/Scene3D.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import About from './components/About.jsx'
import Works from './components/Works.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Testimonials from './components/Testimonials.jsx'
import Gallery from './components/Gallery.jsx'
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
        <Intro />
        <About />
        <Experience />
        <Works />
        <Testimonials />
        <Gallery />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
