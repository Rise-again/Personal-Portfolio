import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

import { nowPlaying } from '@/data/site'

const PlayerContext = createContext(null)

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer 必须在 PlayerProvider 内使用')
  return context
}

// 音频元素挂在全局布局里，路由切换时不会卸载，音乐因此可以跨页面持续播放。
export default function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [audioError, setAudioError] = useState(false)

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      setPlaying(false)
      return
    }

    try {
      audio.volume = 0.7
      await audio.play()
      setPlaying(true)
      setStarted(true)
      setAudioError(false)
    } catch {
      setAudioError(true)
      setPlaying(false)
    }
  }, [])

  const value = useMemo(
    () => ({ playing, started, audioError, toggle }),
    [playing, started, audioError, toggle]
  )

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={nowPlaying.src}
        loop
        preload="none"
        className="hidden"
      />
    </PlayerContext.Provider>
  )
}
