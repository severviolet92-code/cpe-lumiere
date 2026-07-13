'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

/**
 * Tier gate for the real-time diorama.
 * The Tier 0/1 SVG renders instantly for everyone; this overlay upgrades
 * capable devices only, after the page is interactive, with a soft crossfade.
 * Any gate failing = nothing happens (the still remains) — never an error.
 */
export function HeroTier2() {
  const [enabled, setEnabled] = useState(false)
  const [faded, setFaded] = useState(false)
  const [inView, setInView] = useState(true)
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
      if (nav.connection?.saveData) return
      if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return
      const probe = document.createElement('canvas')
      if (!probe.getContext('webgl2')) return

      const start = () => {
        const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
          .requestIdleCallback
        if (idle) idle(() => setEnabled(true), { timeout: 4000 })
        else setTimeout(() => setEnabled(true), 1500)
      }
      if (document.readyState === 'complete') start()
      else window.addEventListener('load', start, { once: true })
    } catch {
      // Any detection failure keeps the still — silent by design.
    }
  }, [])

  // Pause rendering cost when the hero is out of view (canvas unmounts, still remains).
  useEffect(() => {
    const el = hostRef.current
    if (!el || !enabled) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '120px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '30px',
        overflow: 'hidden',
        opacity: faded ? 1 : 0,
        transition: 'opacity 1.2s ease',
        pointerEvents: 'none',
      }}
    >
      {inView && <Scene3D onReady={() => setFaded(true)} />}
    </div>
  )
}
