import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { mascot, type MascotSlotId } from '../config/mascot'
import { Bandit } from './bandit/Bandit'
import { Scene } from './bandit/Scenes'
import type { Outfit } from './bandit/Figure'

type Props = {
  id: MascotSlotId
  className?: string
  style?: CSSProperties
  // Fill the parent instead of using the manifest's fixed size (for framed scene cards).
  fill?: boolean
  // Override the slot's outfit (Meet Bandit's outfit tiles).
  outfit?: Outfit
}

// One Bandit spot: a rendered file once it exists, otherwise Bandit drawn in code.
export function MascotSlot({ id, className = '', style, fill = false, outfit }: Props) {
  const slot = mascot[id]
  const size: CSSProperties = fill
    ? { width: '100%', height: '100%' }
    : { width: `min(${slot.width}px, 100%)`, aspectRatio: `${slot.width} / ${slot.height}` }
  const wrap = { 'data-mascot': id, className: `relative shrink-0 ${className}`, style: { ...size, ...style } }

  if (slot.ready) {
    const src = `/mascot/${slot.file}`
    return slot.type === 'video' ? (
      <div {...wrap}>
        <LazyVideo src={src} label={slot.note} />
      </div>
    ) : (
      <img {...wrap} src={src} alt="" loading="lazy" style={{ ...size, objectFit: 'contain', ...style }} />
    )
  }

  const art = slot.art
  return (
    <div {...wrap}>
      {'scene' in art ? (
        <Scene id={art.scene} outfit={outfit ?? art.outfit} />
      ) : (
        <Bandit pose={art.pose} outfit={outfit ?? art.outfit} className="block h-full w-full" />
      )}
    </div>
  )
}

// Loads only when near the viewport; plays muted and looping only while on screen.
function LazyVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [src])
  return <video ref={ref} muted loop playsInline preload="none" aria-label={label} className="h-full w-full object-cover" />
}
