import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { tracks } from '@/data/site'

const PlayerContext = createContext(null)

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer 必须在 PlayerProvider 内使用')
  return context
}

// 音频元素挂在全局布局里，路由切换时不会卸载，音乐因此可以跨页面持续播放。
export default function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const playingRef = useRef(false)

  const track = tracks[index] ?? tracks[0]
  const total = tracks.length

  // 初始音源只设置一次，之后换歌由 select 直接改 audio.src，
  // 保证「换源 → 播放」在同一个动作里完成，状态不会落后于声音。
  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.src = tracks[0].src
  }, [])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      audio.volume = 0.7
      await audio.play()
      playingRef.current = true
      setPlaying(true)
      setStarted(true)
      setAudioError(false)
    } catch {
      playingRef.current = false
      setPlaying(false)
      setAudioError(true)
    }
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    playingRef.current = false
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (playingRef.current) pause()
    else play()
  }, [pause, play])

  // 选曲即播放；下一首 / 上一首 / 曲目表都走这里
  const select = useCallback(
    (nextIndex, restart = false) => {
      const audio = audioRef.current
      if (!audio) return

      setAudioError(false)

      if (nextIndex !== index) {
        setIndex(nextIndex)
        audio.src = tracks[nextIndex].src
        audio.load()
      } else if (restart) {
        audio.currentTime = 0
      }

      play()
    },
    [index, play]
  )

  const next = useCallback(() => {
    const target = total <= 1 ? 0 : (index + 1) % total
    select(target, total <= 1)
  }, [index, total, select])

  const prev = useCallback(() => {
    const target = total <= 1 ? 0 : (index - 1 + total) % total
    select(target, total <= 1)
  }, [index, total, select])

  const value = useMemo(
    () => ({
      tracks,
      track,
      index,
      total,
      playing,
      started,
      audioError,
      toggle,
      next,
      prev,
      select,
    }),
    [track, index, total, playing, started, audioError, toggle, next, prev, select]
  )

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="none" onEnded={next} className="hidden" />
    </PlayerContext.Provider>
  )
}
