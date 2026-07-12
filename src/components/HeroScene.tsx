'use client'

import { useEffect, useRef } from 'react'

/**
 * "Lumière du matin" diorama — a stylized miniature playroom at morning.
 * Tier 0: renders instantly as a static vector scene (this IS the LCP element).
 * Tier 1: CSS drift animations + pointer parallax on fine pointers.
 * prefers-reduced-motion: everything holds still (handled in CSS + checked here).
 * Tier 2 (react-three-fiber) mounts over this scene in a later pass.
 */
export function HeroScene({ label }: { label: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<SVGGElement>(null)
  const midRef = useRef<SVGGElement>(null)
  const frontRef = useRef<SVGGElement>(null)
  const floatRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const set = (el: SVGGElement | null, f: number) => {
          if (el) el.style.transform = `translate(${-nx * f}px, ${-ny * f * 0.6}px)`
        }
        set(backRef.current, 4)
        set(midRef.current, 8)
        set(frontRef.current, 14)
        set(floatRef.current, 20)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      for (const el of [backRef, midRef, frontRef, floatRef]) {
        if (el.current) el.current.style.transform = ''
      }
    }

    container.addEventListener('pointermove', onMove)
    container.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={containerRef}>
      <svg
        viewBox="0 0 660 560"
        role="img"
        aria-label={label}
        style={{ display: 'block', width: '100%', filter: 'drop-shadow(0 30px 50px rgba(88,60,20,0.22))' }}
      >
        <defs>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fdf8ec" />
            <stop offset="1" stopColor="#f4e6cc" />
          </linearGradient>
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#efdcba" />
            <stop offset="1" stopColor="#e4c99e" />
          </linearGradient>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe6bd" />
            <stop offset="0.55" stopColor="#fdd9a8" />
            <stop offset="1" stopColor="#cfe0ea" />
          </linearGradient>
          <linearGradient id="beam" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor="#f9dfa8" stopOpacity="0.75" />
            <stop offset="1" stopColor="#f9dfa8" stopOpacity="0" />
          </linearGradient>
          <clipPath id="stage">
            <rect x="10" y="10" width="640" height="540" rx="30" />
          </clipPath>
        </defs>

        <g clipPath="url(#stage)">
          {/* ---- BACK: wall, window, morning sky ---- */}
          <g ref={backRef} className="parallax-layer">
            <rect x="10" y="10" width="640" height="540" fill="url(#wall)" />

            {/* Arched window */}
            <path
              d="M96 300 L96 176 A104 104 0 0 1 304 176 L304 300 Z"
              fill="#e5c795"
            />
            <path
              d="M110 292 L110 180 A90 90 0 0 1 290 180 L290 292 Z"
              fill="url(#sky)"
            />
            {/* Sun + glow */}
            <circle cx="200" cy="176" r="46" fill="#f6c96a" opacity="0.32" className="shimmer" />
            <circle cx="200" cy="176" r="27" fill="#eeb04b" />
            {/* Clouds */}
            <g fill="#fffaf0" opacity="0.85">
              <rect x="128" y="212" width="52" height="14" rx="7" />
              <rect x="228" y="238" width="44" height="12" rx="6" />
            </g>
            {/* Muntins + sill */}
            <rect x="196" y="102" width="8" height="190" fill="#e5c795" />
            <rect x="110" y="216" width="180" height="8" fill="#e5c795" />
            <rect x="88" y="292" width="224" height="16" rx="6" fill="#dcb987" />

            {/* Framed child-drawing on the wall (right) */}
            <g>
              <rect x="452" y="96" width="92" height="74" rx="6" fill="#fffdf6" stroke="#dcb987" strokeWidth="5" />
              <path d="M466 152 l16 -22 12 14 14 -20 16 28 z" fill="#a9c4a0" />
              <circle cx="524" cy="116" r="8" fill="#f0b95c" />
            </g>
          </g>

          {/* Light beam pouring from the window (between back and mid) */}
          <polygon points="112,292 288,292 520,550 150,550" fill="url(#beam)" />

          {/* ---- MID: floor, rug, shelf, plants ---- */}
          <g ref={midRef} className="parallax-layer">
            <rect x="10" y="402" width="640" height="148" fill="url(#floor)" />
            <rect x="10" y="399" width="640" height="5" fill="#d9bd93" opacity="0.7" />

            {/* Round rug */}
            <ellipse cx="330" cy="474" rx="196" ry="50" fill="#dde7d4" />
            <ellipse cx="330" cy="472" rx="150" ry="37" fill="#e9efe0" />
            <ellipse
              cx="330"
              cy="472"
              rx="172"
              ry="43"
              fill="none"
              stroke="#c3d4b6"
              strokeWidth="3"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />

            {/* Wall shelf with books + small plant */}
            <rect x="470" y="228" width="150" height="11" rx="4" fill="#dcb987" />
            <g>
              <rect x="484" y="192" width="15" height="36" rx="2.5" fill="#89aecb" />
              <rect x="502" y="198" width="15" height="30" rx="2.5" fill="#d38264" />
              <rect x="520" y="193" width="13" height="35" rx="2.5" fill="#b39bcc" transform="rotate(6 526 228)" />
            </g>
            <g>
              <path d="M576 228 l26 0 -5 -22 -16 0 z" fill="#cd7051" />
              <g fill="#7d9b76">
                <ellipse cx="583" cy="196" rx="7" ry="14" transform="rotate(-24 583 196)" />
                <ellipse cx="595" cy="192" rx="7" ry="16" transform="rotate(10 595 192)" />
                <ellipse cx="604" cy="199" rx="6" ry="12" transform="rotate(32 604 199)" />
              </g>
            </g>

            {/* Tall plant, floor left */}
            <g>
              <ellipse cx="76" cy="512" rx="34" ry="8" fill="#5b452c" opacity="0.10" />
              <path d="M56 512 l40 0 -7 -34 -26 0 z" fill="#c96f4f" />
              <g fill="#7d9b76">
                <ellipse cx="66" cy="446" rx="10" ry="24" transform="rotate(-18 66 446)" />
                <ellipse cx="86" cy="440" rx="10" ry="26" transform="rotate(12 86 440)" />
                <ellipse cx="76" cy="430" rx="9" ry="22" />
              </g>
              <g fill="#46603f" opacity="0.85">
                <ellipse cx="58" cy="462" rx="7" ry="16" transform="rotate(-34 58 462)" />
                <ellipse cx="94" cy="458" rx="7" ry="15" transform="rotate(28 94 458)" />
              </g>
            </g>
          </g>

          {/* ---- FRONT: toys on the rug ---- */}
          <g ref={frontRef} className="parallax-layer">
            {/* Teddy */}
            <g>
              <ellipse cx="252" cy="502" rx="44" ry="9" fill="#5b452c" opacity="0.12" />
              <circle cx="234" cy="470" r="15" fill="#c89a6b" />
              <circle cx="270" cy="470" r="15" fill="#c89a6b" />
              <ellipse cx="252" cy="462" rx="30" ry="34" fill="#d4a878" />
              <ellipse cx="252" cy="472" rx="17" ry="20" fill="#e8cba4" />
              <circle cx="236" cy="410" r="9" fill="#c89a6b" />
              <circle cx="268" cy="410" r="9" fill="#c89a6b" />
              <circle cx="236" cy="411" r="4.5" fill="#e8cba4" />
              <circle cx="268" cy="411" r="4.5" fill="#e8cba4" />
              <circle cx="252" cy="424" r="22" fill="#d4a878" />
              <ellipse cx="252" cy="432" rx="10" ry="8" fill="#e8cba4" />
              <circle cx="244" cy="420" r="2.6" fill="#38291a" />
              <circle cx="260" cy="420" r="2.6" fill="#38291a" />
              <ellipse cx="252" cy="429" rx="3.4" ry="2.6" fill="#38291a" />
            </g>

            {/* Block tower */}
            <g>
              <ellipse cx="402" cy="490" rx="56" ry="9" fill="#5b452c" opacity="0.12" />
              <rect x="356" y="444" width="44" height="44" rx="7" fill="#eeb04b" />
              <rect x="404" y="444" width="44" height="44" rx="7" fill="#89aecb" />
              <rect x="380" y="398" width="44" height="44" rx="7" fill="#cd7051" transform="rotate(-3 402 420)" />
              <text x="378" y="475" fontFamily="Georgia, serif" fontSize="26" fill="#fffaf0" textAnchor="middle">a</text>
              <text x="426" y="475" fontFamily="Georgia, serif" fontSize="26" fill="#fffaf0" textAnchor="middle">b</text>
              <text x="402" y="429" fontFamily="Georgia, serif" fontSize="26" fill="#fffaf0" textAnchor="middle" transform="rotate(-3 402 420)">c</text>
            </g>

            {/* Ball */}
            <g>
              <ellipse cx="496" cy="502" rx="26" ry="6" fill="#5b452c" opacity="0.12" />
              <circle cx="496" cy="480" r="20" fill="#cd7051" />
              <path d="M478 472 a20 20 0 0 1 36 0 a30 30 0 0 0 -36 0" fill="#f8e7de" />
              <circle cx="489" cy="472" r="5" fill="#ffffff" opacity="0.5" />
            </g>
          </g>

          {/* ---- FLOAT: mobile, butterflies, dust ---- */}
          <g ref={floatRef} className="parallax-layer">
            {/* Hanging mobile, top right */}
            <g className="sway" style={{ transformOrigin: '565px 10px' }}>
              <line x1="565" y1="10" x2="565" y2="46" stroke="#b59c7c" strokeWidth="2.5" />
              <line x1="522" y1="52" x2="608" y2="42" stroke="#b59c7c" strokeWidth="3" strokeLinecap="round" />
              <line x1="530" y1="51" x2="530" y2="78" stroke="#b59c7c" strokeWidth="1.8" />
              <line x1="600" y1="43" x2="600" y2="88" stroke="#b59c7c" strokeWidth="1.8" />
              {/* Star */}
              <path
                d="M530 78 l4.2 8.6 9.4 1.3 -6.8 6.7 1.6 9.4 -8.4 -4.5 -8.4 4.5 1.6 -9.4 -6.8 -6.7 9.4 -1.3 z"
                fill="#eeb04b"
              />
              {/* Little cloud */}
              <g fill="#cfe0ea">
                <circle cx="594" cy="94" r="8" />
                <circle cx="604" cy="92" r="10" />
                <circle cx="612" cy="96" r="7" />
                <rect x="586" y="94" width="33" height="9" rx="4.5" />
              </g>
            </g>

            {/* Paper butterflies */}
            <g className="drift-a">
              <g transform="translate(120 330) rotate(-12)">
                <ellipse cx="-7" cy="0" rx="9" ry="12" fill="#a48bbf" />
                <ellipse cx="7" cy="0" rx="9" ry="12" fill="#b39bcc" />
                <rect x="-1.6" y="-9" width="3.2" height="18" rx="1.6" fill="#64487f" />
              </g>
            </g>
            <g className="drift-b">
              <g transform="translate(420 176) rotate(14)">
                <ellipse cx="-7" cy="0" rx="8" ry="11" fill="#7fa8c9" />
                <ellipse cx="7" cy="0" rx="8" ry="11" fill="#9dbdd6" />
                <rect x="-1.5" y="-8" width="3" height="16" rx="1.5" fill="#3d6485" />
              </g>
            </g>
            <g className="drift-c">
              <g transform="translate(350 316) rotate(-6)">
                <ellipse cx="-6" cy="0" rx="7" ry="10" fill="#cd7051" />
                <ellipse cx="6" cy="0" rx="7" ry="10" fill="#dd9179" />
                <rect x="-1.4" y="-7" width="2.8" height="14" rx="1.4" fill="#92462c" />
              </g>
            </g>

            {/* Dust motes in the beam */}
            <g fill="#f3cd8a">
              <circle className="shimmer" cx="256" cy="336" r="3" />
              <circle className="shimmer" cx="310" cy="386" r="2.4" style={{ animationDelay: '1.2s' }} />
              <circle className="shimmer" cx="352" cy="352" r="2" style={{ animationDelay: '2.4s' }} />
              <circle className="shimmer" cx="398" cy="452" r="2.8" style={{ animationDelay: '3.1s' }} />
              <circle className="shimmer" cx="300" cy="312" r="1.8" style={{ animationDelay: '4s' }} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
