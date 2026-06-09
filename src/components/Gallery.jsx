import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

const images = [
  { src: '/images/profile.jpg' },
  { src: '/images/img1.jpg' },
  { src: '/images/img2.jpg' },
  { src: '/images/img3.png' },
  { src: '/images/img4.jpg' },
]

const RADIUS = 280
const ANGLE_STEP = 360 / images.length

export default function Gallery() {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isInertia, setIsInertia] = useState(false)  // 惯性阶段禁用 CSS transition
  const [loadedImages, setLoadedImages] = useState(new Set())
  const lastX = useRef(0)
  const rotationRef = useRef(0)
  const velocityRef = useRef(0)
  const rafRef = useRef(null)

  // Snap to nearest image
  const snapToNearest = useCallback(() => {
    const snapped = Math.round(rotationRef.current / ANGLE_STEP) * ANGLE_STEP
    rotationRef.current = snapped
    setRotation(snapped)
  }, [])

  const handlePointerDown = useCallback((e) => {
    setIsDragging(true)
    setIsInertia(false)
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
    const v = velocityRef.current
    if (Math.abs(v) > 0.5) {
      // Inertia with cubic-bezier-like decay
      setIsInertia(true)  // 惯性阶段关掉 CSS transition，避免与 JS 逐帧更新冲突
      const decay = () => {
        velocityRef.current *= 0.92
        rotationRef.current += velocityRef.current
        setRotation(rotationRef.current)
        if (Math.abs(velocityRef.current) > 0.3) {
          rafRef.current = requestAnimationFrame(decay)
        } else {
          setIsInertia(false)
          snapToNearest()
        }
      }
      rafRef.current = requestAnimationFrame(decay)
    } else {
      snapToNearest()
    }
  }, [snapToNearest])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Calculate current active index
  const activeIndex = Math.round(-rotationRef.current / ANGLE_STEP) % images.length
  const activeIdx = ((activeIndex % images.length) + images.length) % images.length

  const goTo = (index) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const target = -(index * ANGLE_STEP)
    rotationRef.current = target
    setRotation(target)
  }

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
            transition: isDragging || isInertia ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
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
                  border: `2px solid ${i === activeIdx ? 'var(--color-primary)' : 'var(--glass-border)'}`,
                  boxShadow: i === activeIdx
                    ? '0 0 30px rgba(0, 240, 255, 0.3), 0 8px 32px rgba(0,0,0,0.4)'
                    : '0 8px 32px rgba(0,0,0,0.4)',
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: 'hidden',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
              >
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  onLoad={() => setLoadedImages((prev) => new Set(prev).add(i))}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    pointerEvents: 'none',
                    opacity: loadedImages.has(i) ? 1 : 0,
                    transform: i === activeIdx ? 'scale(1.05)' : 'scale(1)',
                    transition: 'opacity 0.5s ease, transform 0.3s ease',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Pagination dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 12,
        marginTop: -20,
        paddingBottom: 40,
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === activeIdx ? 32 : 10,
              height: 10,
              borderRadius: 5,
              border: 'none',
              cursor: 'pointer',
              background: i === activeIdx
                ? 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))'
                : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
            }}
            aria-label={`跳转到第 ${i + 1} 张图片`}
          />
        ))}
      </div>
    </section>
  )
}
