/** Morning-sun brand mark — a rising sun over a small hill, in the signature honey hue. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="22" r="10" fill="var(--honey)" />
      <g stroke="var(--honey)" strokeWidth="2.6" strokeLinecap="round">
        <line x1="24" y1="4" x2="24" y2="8" />
        <line x1="37.5" y1="8.5" x2="34.6" y2="11.4" />
        <line x1="10.5" y1="8.5" x2="13.4" y2="11.4" />
        <line x1="42" y1="22" x2="38" y2="22" />
        <line x1="6" y1="22" x2="10" y2="22" />
      </g>
      <path d="M2 46c8-12 22-14 30-9 6 3.5 11 6 14 5v4H2v0z" fill="var(--sauge)" opacity="0.9" />
    </svg>
  )
}
