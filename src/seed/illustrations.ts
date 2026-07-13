import sharp from 'sharp'

/**
 * Generated demo illustrations — warm, stylized scenes in the "Lumière du matin"
 * palette. Deliberately object/landscape based: no children are ever depicted.
 * Production replaces these with real, consent-cleared photography.
 */

const W = 1200
const H = 900

const palette = {
  paper: '#faf5ec',
  skyTop: '#ffe6bd',
  skyBottom: '#fdd9a8',
  ground: '#a9c4a0',
  groundDeep: '#7d9b76',
  sun: '#eeb04b',
  sunGlow: '#f6c96a',
  honey: '#e8a93c',
  terracotta: '#cd7051',
  terracottaSoft: '#dd9179',
  ciel: '#7fa8c9',
  cielSoft: '#9dbdd6',
  lavande: '#a48bbf',
  ink: '#38291a',
  cream: '#fffaf0',
  water: '#8fb8d8',
  waterDeep: '#6d9cc4',
}

function frame(motif: string, opts: { water?: boolean } = {}): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${palette.skyTop}"/>
      <stop offset="1" stop-color="${palette.skyBottom}"/>
    </linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${palette.water}"/>
      <stop offset="1" stop-color="${palette.waterDeep}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="980" cy="180" r="120" fill="${palette.sunGlow}" opacity="0.4"/>
  <circle cx="980" cy="180" r="72" fill="${palette.sun}"/>
  <g fill="${palette.cream}" opacity="0.85">
    <ellipse cx="240" cy="170" rx="90" ry="26"/>
    <ellipse cx="330" cy="150" rx="60" ry="20"/>
    <ellipse cx="620" cy="120" rx="70" ry="20"/>
  </g>
  ${
    opts.water
      ? `<rect y="560" width="${W}" height="340" fill="url(#water)"/>
         <g stroke="${palette.cream}" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.7">
           <path d="M80 640 q40 -18 80 0 t80 0 t80 0"/>
           <path d="M700 720 q40 -18 80 0 t80 0 t80 0"/>
           <path d="M320 800 q40 -18 80 0 t80 0"/>
         </g>`
      : `<path d="M0 620 Q 300 520 620 600 T ${W} 580 V ${H} H 0 Z" fill="${palette.ground}"/>
         <path d="M0 700 Q 400 620 800 690 T ${W} 680 V ${H} H 0 Z" fill="${palette.groundDeep}" opacity="0.85"/>`
  }
  ${motif}
</svg>`
}

const tree = (x: number, y: number, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-14" y="0" width="28" height="90" rx="10" fill="#a97c50"/>
    <circle cx="0" cy="-46" r="78" fill="${palette.groundDeep}"/>
    <circle cx="-52" cy="-10" r="52" fill="${palette.ground}"/>
    <circle cx="54" cy="-14" r="56" fill="${palette.ground}"/>
  </g>`

const butterfly = (x: number, y: number, c: string, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s}) rotate(-10)">
    <ellipse cx="-14" cy="0" rx="18" ry="24" fill="${c}"/>
    <ellipse cx="14" cy="0" rx="18" ry="24" fill="${c}" opacity="0.75"/>
    <rect x="-3.5" y="-18" width="7" height="36" rx="3.5" fill="${palette.ink}" opacity="0.7"/>
  </g>`

const MOTIFS: Record<string, string> = {
  piscine: frame(
    `
    <circle cx="330" cy="470" r="64" fill="${palette.terracotta}"/>
    <path d="M266 470 a64 64 0 0 1 128 0" fill="${palette.cream}" opacity="0.9"/>
    <path d="M266 470 a64 64 0 0 1 64 -64 l0 64 z" fill="${palette.honey}"/>
    <g transform="translate(760 460)">
      <ellipse cx="0" cy="30" rx="86" ry="56" fill="${palette.honey}"/>
      <circle cx="66" cy="-8" r="40" fill="${palette.honey}"/>
      <circle cx="84" cy="-16" r="6" fill="${palette.ink}"/>
      <path d="M100 -4 l30 8 -30 10 z" fill="${palette.terracotta}"/>
    </g>
    <g transform="translate(520 260)">
      <rect x="-10" y="0" width="20" height="140" rx="8" fill="${palette.cream}"/>
      <path d="M-10 0 h120 a14 14 0 0 1 0 28 h-120 z" fill="${palette.terracotta}"/>
      <path d="M-10 42 h96 a12 12 0 0 1 0 24 h-96 z" fill="${palette.cream}"/>
    </g>`,
    { water: true },
  ),

  zoo: frame(`
    ${tree(180, 560, 1.1)}
    <g transform="translate(700 330)">
      <rect x="-16" y="60" width="32" height="220" rx="14" fill="${palette.honey}"/>
      <rect x="120" y="120" width="30" height="160" rx="14" fill="${palette.honey}"/>
      <path d="M-16 60 Q -10 -60 60 -70 Q 140 -78 150 40 L 150 140 L 120 140 L 120 60 Q 70 20 16 60 Z" fill="${palette.honey}"/>
      <circle cx="52" cy="-88" r="34" fill="${palette.honey}"/>
      <circle cx="66" cy="-96" r="5" fill="${palette.ink}"/>
      <g fill="${palette.terracottaSoft}">
        <circle cx="30" cy="0" r="12"/><circle cx="80" cy="30" r="10"/><circle cx="50" cy="70" r="11"/><circle cx="110" cy="80" r="9"/>
      </g>
      <path d="M20 -110 l10 -22 8 22 z" fill="${palette.terracotta}"/>
    </g>
    ${butterfly(420, 300, palette.lavande)}
    ${butterfly(950, 420, palette.ciel, 0.8)}
  `),

  parc: frame(`
    ${tree(880, 560, 1.2)}
    ${tree(1060, 620, 0.8)}
    <g transform="translate(380 250) rotate(12)">
      <path d="M0 -90 L64 0 L0 90 L-64 0 Z" fill="${palette.ciel}"/>
      <path d="M0 -90 L64 0 L0 0 Z" fill="${palette.cielSoft}"/>
      <path d="M0 90 q -30 90 -110 120" stroke="${palette.ink}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.6"/>
      <g fill="${palette.terracotta}">
        <path d="M-40 140 l16 -8 -2 18 z"/><path d="M-80 180 l16 -8 -2 18 z"/>
      </g>
    </g>
    <g transform="translate(240 640)">
      <rect x="-90" y="0" width="180" height="90" rx="16" fill="${palette.terracotta}"/>
      <rect x="-90" y="0" width="180" height="22" rx="11" fill="${palette.cream}" opacity="0.55"/>
      <circle cx="-46" cy="104" r="18" fill="${palette.ink}" opacity="0.75"/>
      <circle cx="46" cy="104" r="18" fill="${palette.ink}" opacity="0.75"/>
    </g>
    ${butterfly(620, 420, palette.honey, 0.9)}
  `),

  peinture: frame(`
    <g transform="translate(560 300)">
      <path d="M-150 220 L0 -160 L150 220 Z" fill="none" stroke="#a97c50" stroke-width="20" stroke-linejoin="round"/>
      <rect x="-130" y="-90" width="260" height="200" rx="10" fill="${palette.cream}"/>
      <circle cx="-50" cy="-20" r="34" fill="${palette.honey}"/>
      <circle cx="34" cy="10" r="42" fill="${palette.ciel}" opacity="0.9"/>
      <path d="M-90 60 q60 -50 160 -10" stroke="${palette.terracotta}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <rect x="-130" y="110" width="260" height="18" rx="9" fill="#a97c50"/>
    </g>
    <g transform="translate(220 660)">
      <ellipse cx="0" cy="26" rx="80" ry="22" fill="${palette.terracotta}"/>
      <rect x="-80" y="-6" width="160" height="34" rx="16" fill="${palette.terracottaSoft}"/>
      <g>
        <rect x="-56" y="-64" width="16" height="70" rx="8" fill="${palette.honey}" transform="rotate(-12 -48 -30)"/>
        <rect x="-8" y="-74" width="16" height="80" rx="8" fill="${palette.ciel}"/>
        <rect x="40" y="-62" width="16" height="68" rx="8" fill="${palette.lavande}" transform="rotate(10 48 -28)"/>
      </g>
    </g>
    <g fill="${palette.honey}" opacity="0.9">
      <circle cx="920" cy="520" r="14"/><circle cx="980" cy="480" r="9"/><circle cx="890" cy="460" r="7"/>
    </g>
  `),

  musique: frame(`
    <g transform="translate(500 470)">
      <circle cx="0" cy="0" r="120" fill="${palette.terracotta}"/>
      <circle cx="0" cy="0" r="96" fill="${palette.terracottaSoft}"/>
      <circle cx="0" cy="0" r="96" fill="none" stroke="${palette.cream}" stroke-width="6" stroke-dasharray="4 22" stroke-linecap="round"/>
      <g fill="${palette.honey}"><circle cx="-108" cy="-52" r="12"/><circle cx="108" cy="-52" r="12"/><circle cx="-108" cy="52" r="12"/><circle cx="108" cy="52" r="12"/></g>
    </g>
    <g fill="${palette.ink}" opacity="0.75">
      <g transform="translate(780 300)"><ellipse cx="0" cy="40" rx="22" ry="16"/><rect x="16" y="-60" width="9" height="100" rx="4"/><path d="M25 -60 q50 10 44 48 q-8 -18 -44 -22 z"/></g>
      <g transform="translate(900 420) scale(0.75)"><ellipse cx="0" cy="40" rx="22" ry="16"/><rect x="16" y="-60" width="9" height="100" rx="4"/><path d="M25 -60 q50 10 44 48 q-8 -18 -44 -22 z"/></g>
    </g>
    <g transform="translate(240 520)">
      <path d="M-70 90 L-40 -70 L40 -70 L70 90 Z" fill="${palette.honey}"/>
      <g stroke="${palette.cream}" stroke-width="7" opacity="0.9"><line x1="-30" y1="-50" x2="-42" y2="70"/><line x1="0" y1="-50" x2="0" y2="70"/><line x1="30" y1="-50" x2="42" y2="70"/></g>
    </g>
    ${butterfly(680, 200, palette.lavande, 0.9)}
  `),

  jardinage: frame(`
    <g transform="translate(330 560)">
      <path d="M-90 0 h180 l-24 110 h-132 z" fill="${palette.terracotta}"/>
      <rect x="-100" y="-16" width="200" height="30" rx="12" fill="${palette.terracottaSoft}"/>
      <g stroke="${palette.groundDeep}" stroke-width="12" stroke-linecap="round" fill="none">
        <path d="M-40 -20 q-6 -60 -40 -80"/><path d="M0 -20 q0 -70 0 -95"/><path d="M40 -20 q6 -60 40 -80"/>
      </g>
      <g fill="${palette.ground}">
        <ellipse cx="-84" cy="-104" rx="26" ry="14" transform="rotate(-30 -84 -104)"/>
        <ellipse cx="0" cy="-124" rx="14" ry="26"/>
        <ellipse cx="84" cy="-104" rx="26" ry="14" transform="rotate(30 84 -104)"/>
      </g>
    </g>
    <g transform="translate(760 620)">
      <path d="M-60 0 h120 l-16 74 h-88 z" fill="${palette.honey}"/>
      <path d="M-34 -10 q34 -80 68 -10 q-34 24 -68 10" fill="${palette.groundDeep}"/>
    </g>
    <g transform="translate(950 560) rotate(18)">
      <rect x="-8" y="-90" width="16" height="150" rx="8" fill="#a97c50"/>
      <path d="M-26 -90 h52 v-34 a26 26 0 0 0 -52 0 z" fill="${palette.ciel}"/>
    </g>
    ${butterfly(560, 380, palette.honey, 0.85)}
  `),

  histoires: frame(`
    <g transform="translate(600 480)">
      <path d="M0 -20 C -60 -70 -180 -70 -230 -30 L -230 120 C -180 80 -60 80 0 120 C 60 80 180 80 230 120 L 230 -30 C 180 -70 60 -70 0 -20 Z" fill="${palette.cream}"/>
      <path d="M0 -20 L0 120" stroke="${palette.ink}" stroke-width="6" opacity="0.4"/>
      <g stroke="${palette.ciel}" stroke-width="8" stroke-linecap="round" opacity="0.8">
        <line x1="-190" y1="-4" x2="-60" y2="-16"/><line x1="-190" y1="30" x2="-60" y2="18"/><line x1="-190" y1="64" x2="-60" y2="52"/>
      </g>
      <g stroke="${palette.terracotta}" stroke-width="8" stroke-linecap="round" opacity="0.8">
        <line x1="60" y1="-16" x2="190" y2="-4"/><line x1="60" y1="18" x2="190" y2="30"/><line x1="60" y1="52" x2="190" y2="64"/>
      </g>
    </g>
    <g fill="${palette.honey}">
      <path d="M320 260 l10 22 24 3 -17 17 4 24 -21 -11 -21 11 4 -24 -17 -17 24 -3 z"/>
      <path d="M860 300 l8 17 19 2 -14 13 4 19 -17 -9 -17 9 4 -19 -14 -13 19 -2 z" opacity="0.9"/>
      <path d="M540 200 l6 13 15 2 -11 10 3 15 -13 -7 -13 7 3 -15 -11 -10 15 -2 z" opacity="0.8"/>
    </g>
  `),

  motricite: frame(`
    <g transform="translate(430 560)">
      <circle cx="0" cy="0" r="90" fill="${palette.ciel}"/>
      <path d="M-90 0 a90 90 0 0 1 180 0" fill="${palette.cielSoft}"/>
      <circle cx="-28" cy="-24" r="16" fill="${palette.cream}" opacity="0.6"/>
    </g>
    <g transform="translate(700 620)">
      <circle cx="0" cy="0" r="56" fill="${palette.terracotta}"/>
      <path d="M-56 0 a56 56 0 0 1 112 0" fill="${palette.terracottaSoft}"/>
    </g>
    <g stroke="${palette.honey}" stroke-width="18" fill="none" opacity="0.95">
      <circle cx="920" cy="540" r="80"/>
      <circle cx="1040" cy="620" r="56" stroke="${palette.lavande}"/>
    </g>
    <g transform="translate(200 430)">
      <rect x="-14" y="0" width="28" height="200" rx="12" fill="${palette.honey}"/>
      <rect x="90" y="40" width="28" height="160" rx="12" fill="${palette.honey}"/>
      <path d="M0 0 Q 52 -70 104 40" stroke="${palette.terracotta}" stroke-width="18" fill="none" stroke-linecap="round"/>
    </g>
  `),

  pique_nique: frame(`
    ${tree(160, 540, 1.0)}
    <g transform="translate(620 600)">
      <path d="M-190 0 L190 0 L150 130 L-150 130 Z" fill="${palette.terracotta}" opacity="0.92"/>
      <g stroke="${palette.cream}" stroke-width="10" opacity="0.7">
        <line x1="-140" y1="20" x2="140" y2="20"/><line x1="-120" y1="60" x2="120" y2="60"/><line x1="-105" y1="100" x2="105" y2="100"/>
        <line x1="-90" y1="-2" x2="-60" y2="128"/><line x1="0" y1="-2" x2="0" y2="128"/><line x1="90" y1="-2" x2="60" y2="128"/>
      </g>
      <g transform="translate(-40 -50)">
        <path d="M-60 30 h120 l-14 44 h-92 z" fill="#a97c50"/>
        <path d="M-60 30 a60 34 0 0 1 120 0" fill="none" stroke="#a97c50" stroke-width="12"/>
        <circle cx="-18" cy="18" r="17" fill="${palette.honey}"/>
        <circle cx="16" cy="12" r="14" fill="${palette.terracottaSoft}"/>
        <circle cx="42" cy="20" r="12" fill="${palette.groundDeep}"/>
      </g>
    </g>
    ${butterfly(880, 380, palette.lavande, 1.1)}
    ${butterfly(420, 320, palette.ciel, 0.8)}
  `),
}

export const ILLUSTRATION_THEMES = Object.keys(MOTIFS)

export async function renderIllustration(theme: string): Promise<Buffer> {
  const svg = MOTIFS[theme]
  if (!svg) throw new Error(`Unknown illustration theme: ${theme}`)
  return sharp(Buffer.from(svg)).resize(1200, 900).png({ quality: 90 }).toBuffer()
}
