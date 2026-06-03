import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const images = [
  { src: '/creative-showcase/images/profile.jpg' },
  { src: '/creative-showcase/images/img1.jpg' },
  { src: '/creative-showcase/images/img2.jpg' },
  { src: '/creative-showcase/images/img3.png' },
  { src: '/creative-showcase/images/img4.jpg' },
]

const RADIUS = 280
const ANGLE_STEP = 360 / images.length

export default function Gallery() {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const lastX = useRef(0)
  const rotationRef = useRef(0)
  const velocityRef = useRef(0)
  const rafRef = useRef(null)

  const handlePointerDown = useCallback((e) => {
    setIsDragging(true)
    lastX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    velocityRef.current = 0
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const delta = clientX - lastX.current
    velocityRef.current = delta * 0.5
    rotationRef.current += velocityRef.current
    setRotation(rotationRef.current)
    lastX.current = clientX
  }, [isDragging])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    // Inertia
    const v = velocityRef.current
    if (Math.abs(v) > 0.5) {
      const decay = () => {
        velocityRef.current *= 0.95
        rotationRef.current += velocityRef.current
        setRotation(rotationRef.current)
        if (Math.abs(velocityRef.current) > 0.1) {
          rafRef.current = requestAnimationFrame(decay)
        }
      }
      rafRef.current = requestAnimationFrame(decay)
    }
  }, [])

  return (
    <section id="gallery" className="section section-glass">
      <div className="section-inner">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          图片画廊
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          拖拽旋转环形画廊
        </motion.p>
      </div>

      <div
        style={{
          width: '100%',
          height: 500,
          perspective: 900,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          style={{
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease',
          }}
        >
          {images.map((img, i) => {
            const angle = i * ANGLE_STEP
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 200,
                  height: 260,
                  left: -100,
                  top: -130,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '2px solid var(--glass-border)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={img.src}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
