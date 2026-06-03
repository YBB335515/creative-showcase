import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!audioRef.current) {
      // 把音乐文件放在 public/music/ 目录下，命名为 bgm.mp3
      audioRef.current = new Audio('/creative-showcase/music/bgm.mp3')
      audioRef.current.loop = true
    }
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        // 浏览器可能阻止自动播放，忽略即可
      })
    }
    setPlaying(!playing)
  }

  return (
    <motion.button
      onClick={toggle}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 100,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        color: playing ? 'var(--color-primary)' : 'var(--color-text-muted)',
        fontSize: '1.3rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={playing ? '暂停音乐' : '播放音乐'}
    >
      {playing ? '🔊' : '🔇'}
    </motion.button>
  )
}
