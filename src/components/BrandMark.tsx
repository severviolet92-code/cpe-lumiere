/** « La Voie lactée » brand mark — a small arc of stars over a soft hill, morning light. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="15" cy="22" r="8" fill="var(--honey)" />
      <g stroke="var(--honey)" strokeWidth="2.2" strokeLinecap="round">
        <line x1="15" y1="8" x2="15" y2="11" />
        <line x1="4" y1="12" x2="6.2" y2="14.2" />
        <line x1="1" y1="22" x2="4" y2="22" />
      </g>
      <g fill="var(--honey)">
        <path d="M30 10 l1.8 3.7 4 .6 -2.9 2.9 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.9 4 -.6 z" />
        <path d="M41 20 l1.2 2.4 2.7 .4 -2 2 .5 2.7 -2.4 -1.3 -2.4 1.3 .5 -2.7 -2 -2 2.7 -.4 z" opacity="0.85" />
        <circle cx="36" cy="7" r="1.6" opacity="0.7" />
      </g>
      <path d="M2 46c8-12 22-14 30-9 6 3.5 11 6 14 5v4H2v0z" fill="var(--sauge)" opacity="0.9" />
    </svg>
  )
}
