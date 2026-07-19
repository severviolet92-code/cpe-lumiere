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

  ferme: frame(`
    ${tree(1040, 580, 0.9)}
    <g transform="translate(420 460)">
      <path d="M-160 140 L-160 0 L0 -110 L160 0 L160 140 Z" fill="${palette.terracotta}"/>
      <path d="M-176 10 L0 -122 L176 10 L150 34 L0 -80 L-150 34 Z" fill="${palette.ink}" opacity="0.75"/>
      <rect x="-40" y="40" width="80" height="100" rx="8" fill="${palette.ink}" opacity="0.65"/>
      <rect x="-120" y="30" width="52" height="52" rx="8" fill="${palette.cream}"/>
      <rect x="68" y="30" width="52" height="52" rx="8" fill="${palette.cream}"/>
    </g>
    <g transform="translate(780 640)">
      <ellipse cx="0" cy="26" rx="70" ry="34" fill="${palette.cream}"/>
      <circle cx="58" cy="-6" r="26" fill="${palette.cream}"/>
      <circle cx="66" cy="-12" r="4.5" fill="${palette.ink}"/>
      <ellipse cx="64" cy="4" rx="9" ry="6" fill="${palette.terracottaSoft}"/>
      <g fill="${palette.ink}" opacity="0.7"><rect x="-34" y="52" width="10" height="26" rx="5"/><rect x="20" y="52" width="10" height="26" rx="5"/></g>
    </g>
    <g transform="translate(240 680)">
      <path d="M-50 20 h100 l-12 40 h-76 z" fill="#a97c50"/>
      <g fill="${palette.honey}"><circle cx="-20" cy="10" r="12"/><circle cx="8" cy="4" r="11"/><circle cx="32" cy="12" r="10"/></g>
    </g>
    ${butterfly(620, 300, palette.honey, 0.9)}
  `),

  pommes: frame(`
    <g transform="translate(600 430)">
      <rect x="-20" y="90" width="40" height="180" rx="16" fill="#a97c50"/>
      <circle cx="0" cy="0" r="150" fill="${palette.groundDeep}"/>
      <circle cx="-110" cy="50" r="80" fill="${palette.ground}"/>
      <circle cx="112" cy="44" r="86" fill="${palette.ground}"/>
      <g fill="${palette.terracotta}">
        <circle cx="-60" cy="-40" r="20"/><circle cx="40" cy="-80" r="19"/><circle cx="90" cy="10" r="20"/>
        <circle cx="-110" cy="30" r="18"/><circle cx="30" cy="70" r="18"/><circle cx="-10" cy="60" r="19"/>
      </g>
    </g>
    <g transform="translate(300 660)">
      <path d="M-64 0 h128 l-16 84 h-96 z" fill="#a97c50"/>
      <g stroke="${palette.cream}" stroke-width="6" opacity="0.5"><line x1="-52" y1="18" x2="52" y2="18"/><line x1="-46" y1="44" x2="46" y2="44"/></g>
      <g fill="${palette.terracotta}"><circle cx="-28" cy="-8" r="15"/><circle cx="2" cy="-14" r="14"/><circle cx="30" cy="-6" r="13"/></g>
    </g>
    <g transform="translate(920 640)">
      <rect x="-30" y="-40" width="60" height="90" rx="12" fill="${palette.honey}"/>
      <path d="M-30 -40 a30 18 0 0 1 60 0" fill="none" stroke="${palette.honey}" stroke-width="10"/>
    </g>
  `),

  citrouilles: frame(`
    <g transform="translate(520 640)">
      <ellipse cx="0" cy="0" rx="120" ry="86" fill="${palette.honey}"/>
      <ellipse cx="0" cy="0" rx="70" ry="86" fill="${palette.terracottaSoft}" opacity="0.5"/>
      <ellipse cx="0" cy="0" rx="26" ry="86" fill="${palette.terracotta}" opacity="0.35"/>
      <rect x="-10" y="-108" width="20" height="34" rx="9" fill="${palette.groundDeep}"/>
      <path d="M10 -100 q60 -34 90 6" stroke="${palette.groundDeep}" stroke-width="9" fill="none" stroke-linecap="round"/>
    </g>
    <g transform="translate(800 690)">
      <ellipse cx="0" cy="0" rx="70" ry="52" fill="${palette.terracotta}"/>
      <rect x="-7" y="-70" width="14" height="24" rx="7" fill="${palette.groundDeep}"/>
    </g>
    <g transform="translate(290 700)">
      <ellipse cx="0" cy="0" rx="52" ry="40" fill="${palette.terracottaSoft}"/>
      <rect x="-6" y="-56" width="12" height="20" rx="6" fill="${palette.groundDeep}"/>
    </g>
    <g fill="${palette.terracotta}" opacity="0.85">
      <path d="M240 360 q14 -18 28 0 q-14 18 -28 0 z"/>
      <path d="M900 300 q12 -16 24 0 q-12 16 -24 0 z"/>
      <path d="M680 250 q10 -14 20 0 q-10 14 -20 0 z"/>
    </g>
    ${tree(1030, 560, 1.0)}
  `),

  neige: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dfe9f4"/>
      <stop offset="1" stop-color="#c7d9ec"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#wsky)"/>
  <circle cx="980" cy="180" r="64" fill="${palette.cream}" opacity="0.9"/>
  <path d="M0 620 Q 300 540 620 610 T ${W} 590 V ${H} H 0 Z" fill="#f4f8fc"/>
  <path d="M0 700 Q 400 640 800 700 T ${W} 690 V ${H} H 0 Z" fill="#e8f0f8"/>
  <g transform="translate(430 560)">
    <circle cx="0" cy="70" r="86" fill="${palette.cream}"/>
    <circle cx="0" cy="-40" r="62" fill="${palette.cream}"/>
    <circle cx="-18" cy="-52" r="7" fill="${palette.ink}"/>
    <circle cx="18" cy="-52" r="7" fill="${palette.ink}"/>
    <path d="M0 -40 l34 10 -34 8 z" fill="${palette.terracotta}"/>
    <path d="M-58 -66 h116 v-14 h-116 z M-38 -80 h76 v-40 a8 8 0 0 0 -8 -8 h-60 a8 8 0 0 0 -8 8 z" fill="${palette.ciel}"/>
    <path d="M-60 0 q-40 -30 -70 -60" stroke="#a97c50" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M60 0 q40 -30 70 -60" stroke="#a97c50" stroke-width="9" fill="none" stroke-linecap="round"/>
  </g>
  <g transform="translate(820 640)">
    <path d="M-90 30 q90 -70 180 0 l-20 26 q-70 -50 -140 0 z" fill="${palette.terracotta}"/>
    <path d="M84 30 q26 10 30 34 l-26 4 q-6 -20 -22 -26 z" fill="${palette.terracotta}"/>
  </g>
  <g fill="${palette.cream}">
    <circle cx="160" cy="200" r="9"/><circle cx="320" cy="130" r="7"/><circle cx="540" cy="220" r="8"/>
    <circle cx="720" cy="120" r="7"/><circle cx="880" cy="300" r="8"/><circle cx="1080" cy="200" r="9"/>
    <circle cx="240" cy="380" r="7"/><circle cx="640" cy="360" r="6"/><circle cx="1010" cy="420" r="7"/>
  </g>
  <g transform="translate(150 600)">
    <path d="M0 0 L0 -140 M0 -140 L-50 -80 M0 -140 L50 -80 M0 -95 L-38 -40 M0 -95 L38 -40" stroke="${palette.groundDeep}" stroke-width="12" stroke-linecap="round"/>
  </g>
</svg>`,

  cabane: frame(`
    ${tree(180, 560, 1.1)}
    ${tree(1060, 600, 0.85)}
    <g transform="translate(560 470)">
      <path d="M-130 130 L-130 10 L0 -80 L130 10 L130 130 Z" fill="#a97c50"/>
      <path d="M-146 18 L0 -92 L146 18 L122 40 L0 -52 L-122 40 Z" fill="${palette.terracotta}"/>
      <rect x="-34" y="40" width="68" height="90" rx="8" fill="${palette.ink}" opacity="0.6"/>
      <rect x="60" y="-64" width="26" height="60" rx="6" fill="${palette.ink}" opacity="0.7"/>
      <path d="M73 -70 q4 -18 18 -26" stroke="${palette.cream}" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.8"/>
    </g>
    <g transform="translate(850 620)">
      <rect x="-12" y="-60" width="24" height="120" rx="10" fill="#a97c50"/>
      <path d="M-40 -60 h80 v-20 a10 10 0 0 0 -10 -10 h-60 a10 10 0 0 0 -10 10 z" fill="${palette.ciel}"/>
      <ellipse cx="0" cy="70" rx="46" ry="14" fill="${palette.honey}" opacity="0.8"/>
    </g>
    <g transform="translate(320 680)">
      <ellipse cx="0" cy="0" rx="60" ry="18" fill="${palette.cream}"/>
      <path d="M-40 -6 q40 -26 80 0" stroke="${palette.honey}" stroke-width="10" fill="none" stroke-linecap="round"/>
    </g>
  `),

  bricolage: frame(`
    <g transform="translate(560 520)">
      <rect x="-220" y="-30" width="440" height="150" rx="18" fill="#a97c50"/>
      <rect x="-220" y="-30" width="440" height="26" rx="13" fill="${palette.cream}" opacity="0.4"/>
      <g transform="translate(-130 -80)">
        <rect x="-36" y="-36" width="72" height="72" rx="10" fill="${palette.ciel}" transform="rotate(-8)"/>
        <rect x="-20" y="-20" width="40" height="40" rx="6" fill="${palette.cream}" transform="rotate(-8)"/>
      </g>
      <g transform="translate(0 -86)">
        <path d="M0 -40 l12 26 28 4 -20 20 5 28 -25 -13 -25 13 5 -28 -20 -20 28 -4 z" fill="${palette.honey}"/>
      </g>
      <g transform="translate(130 -78)">
        <circle cx="0" cy="0" r="34" fill="${palette.lavande}"/>
        <circle cx="0" cy="0" r="16" fill="${palette.cream}"/>
      </g>
      <g transform="translate(-40 30)">
        <rect x="-10" y="-46" width="20" height="92" rx="9" fill="${palette.terracotta}" transform="rotate(24)"/>
      </g>
      <g transform="translate(60 34)">
        <path d="M-30 -20 q30 -34 60 0 q-30 34 -60 0 z" fill="${palette.ground}"/>
      </g>
    </g>
    <g fill="${palette.lavande}" opacity="0.8">
      <circle cx="250" cy="300" r="12"/><circle cx="300" cy="260" r="8"/>
    </g>
    <g fill="${palette.ciel}" opacity="0.8">
      <circle cx="930" cy="330" r="12"/><circle cx="980" cy="290" r="8"/>
    </g>
  `),

  sciences: frame(`
    <g transform="translate(520 500)">
      <path d="M-40 -160 h80 v70 l70 130 a26 26 0 0 1 -24 38 h-172 a26 26 0 0 1 -24 -38 l70 -130 z" fill="${palette.ciel}" opacity="0.9"/>
      <path d="M-52 40 l104 0 38 70 a12 12 0 0 1 -11 18 h-158 a12 12 0 0 1 -11 -18 z" fill="${palette.ground}"/>
      <rect x="-48" y="-172" width="96" height="20" rx="10" fill="${palette.ink}" opacity="0.6"/>
      <g fill="${palette.cream}"><circle cx="-14" cy="40" r="9"/><circle cx="22" cy="76" r="7"/><circle cx="-4" cy="104" r="6"/></g>
    </g>
    <g transform="translate(830 560)">
      <circle cx="0" cy="0" r="72" fill="none" stroke="${palette.honey}" stroke-width="16"/>
      <rect x="48" y="48" width="90" height="24" rx="12" fill="${palette.honey}" transform="rotate(45 48 48)"/>
    </g>
    <g fill="${palette.lavande}" opacity="0.85">
      <path d="M260 320 l8 17 19 2 -14 13 4 19 -17 -9 -17 9 4 -19 -14 -13 19 -2 z"/>
      <path d="M340 240 l6 13 15 2 -11 10 3 15 -13 -7 -13 7 3 -15 -11 -10 15 -2 z"/>
    </g>
  `),

  biblio: frame(`
    <g transform="translate(560 520)">
      <rect x="-240" y="-140" width="480" height="260" rx="18" fill="#a97c50"/>
      <rect x="-220" y="-120" width="440" height="100" rx="10" fill="${palette.cream}"/>
      <rect x="-220" y="0" width="440" height="100" rx="10" fill="${palette.cream}"/>
      <g transform="translate(0 -70)">
        <rect x="-200" y="-40" width="34" height="80" rx="6" fill="${palette.terracotta}"/>
        <rect x="-158" y="-32" width="30" height="72" rx="6" fill="${palette.ciel}"/>
        <rect x="-120" y="-40" width="36" height="80" rx="6" fill="${palette.honey}"/>
        <rect x="-76" y="-28" width="28" height="68" rx="6" fill="${palette.lavande}"/>
        <rect x="-40" y="-40" width="34" height="80" rx="6" fill="${palette.groundDeep}"/>
        <rect x="4" y="-32" width="30" height="72" rx="6" fill="${palette.terracottaSoft}"/>
        <rect x="42" y="-40" width="36" height="80" rx="6" fill="${palette.ciel}"/>
        <rect x="86" y="-28" width="28" height="68" rx="6" fill="${palette.honey}"/>
        <rect x="122" y="-40" width="34" height="80" rx="6" fill="${palette.lavande}"/>
        <rect x="164" y="-32" width="30" height="72" rx="6" fill="${palette.terracotta}"/>
      </g>
      <g transform="translate(0 50)">
        <rect x="-200" y="-40" width="30" height="80" rx="6" fill="${palette.ground}"/>
        <rect x="-162" y="-30" width="34" height="70" rx="6" fill="${palette.honey}"/>
        <rect x="-120" y="-40" width="28" height="80" rx="6" fill="${palette.lavande}"/>
        <rect x="-84" y="-32" width="34" height="72" rx="6" fill="${palette.terracotta}"/>
        <rect x="-42" y="-40" width="30" height="80" rx="6" fill="${palette.ciel}"/>
        <rect x="-4" y="-28" width="30" height="68" rx="6" fill="${palette.groundDeep}"/>
        <rect x="34" y="-40" width="36" height="80" rx="6" fill="${palette.terracottaSoft}"/>
        <rect x="78" y="-32" width="28" height="72" rx="6" fill="${palette.honey}"/>
        <rect x="114" y="-40" width="34" height="80" rx="6" fill="${palette.ciel}"/>
        <rect x="156" y="-30" width="30" height="70" rx="6" fill="${palette.lavande}"/>
      </g>
    </g>
    <g fill="${palette.honey}">
      <path d="M300 250 l8 17 19 2 -14 13 4 19 -17 -9 -17 9 4 -19 -14 -13 19 -2 z"/>
      <path d="M880 220 l6 13 15 2 -11 10 3 15 -13 -7 -13 7 3 -15 -11 -10 15 -2 z"/>
    </g>
  `),

  velo: frame(`
    <g transform="translate(560 600)">
      <circle cx="-120" cy="40" r="76" fill="none" stroke="${palette.ink}" stroke-width="14" opacity="0.8"/>
      <circle cx="120" cy="40" r="76" fill="none" stroke="${palette.ink}" stroke-width="14" opacity="0.8"/>
      <path d="M-120 40 L-40 -60 L80 -60 L120 40 M-40 -60 L40 40 L-120 40 M40 40 L120 40" stroke="${palette.terracotta}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-52 -78 h44" stroke="${palette.terracotta}" stroke-width="12" stroke-linecap="round"/>
      <path d="M80 -60 l-6 -26 h-24" stroke="${palette.honey}" stroke-width="12" fill="none" stroke-linecap="round"/>
      <circle cx="-120" cy="40" r="10" fill="${palette.honey}"/>
      <circle cx="120" cy="40" r="10" fill="${palette.honey}"/>
    </g>
    <g transform="translate(220 660)">
      <path d="M-40 24 a40 40 0 0 1 80 0 z" fill="${palette.ciel}"/>
      <rect x="-6" y="-30" width="12" height="54" rx="6" fill="${palette.ciel}"/>
    </g>
    <path d="M880 660 q60 -30 140 -10" stroke="${palette.groundDeep}" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.6"/>
    ${butterfly(900, 350, palette.lavande)}
    ${butterfly(300, 300, palette.honey, 0.8)}
  `),

  spectacle: frame(`
    <g transform="translate(560 480)">
      <rect x="-260" y="-160" width="520" height="300" rx="20" fill="${palette.ink}" opacity="0.8"/>
      <path d="M-260 -160 q130 60 260 0 q130 60 260 0 l0 40 q-130 60 -260 0 q-130 60 -260 0 z" fill="${palette.terracotta}"/>
      <path d="M-260 -160 h60 q-10 120 40 300 h-100 z" fill="${palette.terracotta}"/>
      <path d="M260 -160 h-60 q10 120 -40 300 h100 z" fill="${palette.terracotta}"/>
      <circle cx="0" cy="20" r="60" fill="${palette.sunGlow}" opacity="0.7"/>
      <g fill="${palette.honey}">
        <path d="M-40 30 l10 22 24 3 -17 17 4 24 -21 -11 -21 11 4 -24 -17 -17 24 -3 z"/>
        <path d="M60 -10 l8 17 19 2 -14 13 4 19 -17 -9 -17 9 4 -19 -14 -13 19 -2 z"/>
      </g>
    </g>
    <g fill="${palette.honey}" opacity="0.9">
      <circle cx="240" cy="720" r="10"/><circle cx="420" cy="740" r="10"/><circle cx="600" cy="730" r="10"/><circle cx="780" cy="740" r="10"/><circle cx="940" cy="720" r="10"/>
    </g>
  `),

  repas: frame(`
    <g transform="translate(560 560)">
      <ellipse cx="0" cy="30" rx="220" ry="60" fill="#a97c50" opacity="0.9"/>
      <g transform="translate(-110 -30)">
        <circle cx="0" cy="0" r="80" fill="${palette.cream}"/>
        <circle cx="0" cy="0" r="62" fill="${palette.honey}" opacity="0.35"/>
        <circle cx="-16" cy="-8" r="18" fill="${palette.terracotta}"/>
        <circle cx="20" cy="4" r="14" fill="${palette.groundDeep}"/>
        <path d="M-30 26 q30 16 56 -2" stroke="${palette.honey}" stroke-width="10" fill="none" stroke-linecap="round"/>
      </g>
      <g transform="translate(120 -40)">
        <path d="M-50 0 h100 l-12 60 h-76 z" fill="${palette.ciel}"/>
        <path d="M-50 0 a50 26 0 0 1 100 0" fill="none" stroke="${palette.ciel}" stroke-width="10"/>
        <path d="M-20 -30 q6 -18 -6 -30 M8 -30 q6 -18 -6 -30" stroke="${palette.cream}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.9"/>
      </g>
      <g transform="translate(10 60)">
        <rect x="-8" y="-50" width="16" height="82" rx="8" fill="${palette.cream}"/>
        <path d="M-14 -50 h28 v-16 a14 14 0 0 0 -28 0 z" fill="${palette.cream}"/>
      </g>
    </g>
    ${butterfly(880, 330, palette.honey, 0.85)}
  `),

  soupe: frame(`
    <g transform="translate(560 560)">
      <path d="M-150 -20 a150 70 0 0 0 300 0 z" fill="${palette.terracotta}"/>
      <ellipse cx="0" cy="-20" rx="150" ry="34" fill="${palette.terracottaSoft}"/>
      <ellipse cx="0" cy="-22" rx="128" ry="26" fill="${palette.honey}" opacity="0.8"/>
      <rect x="-170" y="-30" width="36" height="18" rx="9" fill="${palette.terracotta}"/>
      <rect x="134" y="-30" width="36" height="18" rx="9" fill="${palette.terracotta}"/>
      <g stroke="${palette.cream}" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.85">
        <path d="M-40 -90 q10 -24 -6 -44"/>
        <path d="M10 -100 q10 -24 -6 -44"/>
        <path d="M60 -90 q10 -24 -6 -44"/>
      </g>
      <g fill="${palette.groundDeep}"><circle cx="-60" cy="-24" r="9"/><circle cx="20" cy="-18" r="8"/><circle cx="80" cy="-26" r="9"/></g>
    </g>
    <g transform="translate(260 660)">
      <path d="M-46 0 h92 l-10 52 h-72 z" fill="${palette.cream}"/>
      <g fill="${palette.terracotta}"><circle cx="-14" cy="-10" r="12"/><circle cx="16" cy="-14" r="11"/></g>
      <path d="M-4 -34 q4 -14 14 -18" stroke="${palette.groundDeep}" stroke-width="7" fill="none" stroke-linecap="round"/>
    </g>
    <g transform="translate(880 640)">
      <rect x="-60" y="-14" width="120" height="28" rx="14" fill="#a97c50"/>
      <g fill="${palette.honey}"><circle cx="-30" cy="-30" r="16"/><circle cx="2" cy="-36" r="15"/><circle cx="34" cy="-28" r="14"/></g>
    </g>
  `),

  muffins: frame(`
    <g transform="translate(430 580)">
      <path d="M-60 0 h120 l-16 70 h-88 z" fill="${palette.honey}"/>
      <path d="M-66 0 a66 44 0 0 1 132 0 z" fill="${palette.terracottaSoft}"/>
      <g fill="${palette.terracotta}"><circle cx="-24" cy="-24" r="7"/><circle cx="10" cy="-34" r="6"/><circle cx="34" cy="-18" r="6"/></g>
      <g stroke="${palette.cream}" stroke-width="6" opacity="0.6"><line x1="-44" y1="14" x2="-38" y2="58"/><line x1="0" y1="16" x2="0" y2="62"/><line x1="44" y1="14" x2="38" y2="58"/></g>
    </g>
    <g transform="translate(650 600) scale(0.85)">
      <path d="M-60 0 h120 l-16 70 h-88 z" fill="${palette.ciel}"/>
      <path d="M-66 0 a66 44 0 0 1 132 0 z" fill="${palette.cream}"/>
      <g fill="${palette.lavande}"><circle cx="-20" cy="-26" r="7"/><circle cx="16" cy="-30" r="6"/></g>
    </g>
    <g transform="translate(850 620) scale(0.7)">
      <path d="M-60 0 h120 l-16 70 h-88 z" fill="${palette.lavande}"/>
      <path d="M-66 0 a66 44 0 0 1 132 0 z" fill="${palette.terracottaSoft}"/>
    </g>
    <g transform="translate(280 400)">
      <path d="M0 0 q-8 -30 12 -46" stroke="${palette.ink}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.5"/>
    </g>
    ${butterfly(900, 340, palette.honey, 0.9)}
  `),

  fete: frame(`
    <g stroke-width="10" fill="none" stroke-linecap="round">
      <path d="M180 200 Q 400 320 620 220" stroke="${palette.terracotta}"/>
      <path d="M620 220 Q 840 320 1040 200" stroke="${palette.ciel}"/>
    </g>
    <g>
      <path d="M300 254 l-14 34 h28 z" fill="${palette.honey}"/>
      <path d="M420 290 l-14 34 h28 z" fill="${palette.lavande}"/>
      <path d="M540 268 l-14 34 h28 z" fill="${palette.terracotta}"/>
      <path d="M700 268 l-14 34 h28 z" fill="${palette.ciel}"/>
      <path d="M840 292 l-14 34 h28 z" fill="${palette.honey}"/>
      <path d="M960 246 l-14 34 h28 z" fill="${palette.terracottaSoft}"/>
    </g>
    <g transform="translate(560 620)">
      <path d="M-80 60 h160 l-20 60 h-120 z" fill="${palette.cream}"/>
      <rect x="-90" y="20" width="180" height="44" rx="14" fill="${palette.honey}"/>
      <rect x="-70" y="-16" width="140" height="40" rx="12" fill="${palette.terracottaSoft}"/>
      <g stroke="${palette.ink}" stroke-width="6" stroke-linecap="round" opacity="0.7">
        <line x1="-40" y1="-36" x2="-40" y2="-16"/><line x1="0" y1="-42" x2="0" y2="-18"/><line x1="40" y1="-36" x2="40" y2="-16"/>
      </g>
      <g fill="${palette.honey}">
        <circle cx="-40" cy="-42" r="6"/><circle cx="0" cy="-48" r="6"/><circle cx="40" cy="-42" r="6"/>
      </g>
    </g>
    <g fill="${palette.lavande}" opacity="0.85">
      <circle cx="240" cy="480" r="10"/><circle cx="920" cy="460" r="10"/><circle cx="380" cy="420" r="8"/><circle cx="820" cy="520" r="8"/>
    </g>
  `),
}

/**
 * Staff "portrait" placeholders: warm, abstract avatar cards (no people —
 * consistent with the no-identifiable-person rule for demo assets).
 * Production replaces these with real, consent-cleared portraits.
 */
const AVATAR_COLORS = [
  { bg: palette.skyTop, fg: palette.honey, accent: palette.terracotta },
  { bg: '#e7efe4', fg: palette.groundDeep, accent: palette.honey },
  { bg: palette.lavande + '33', fg: palette.lavande, accent: palette.honey },
  { bg: '#e3edf6', fg: palette.ciel, accent: palette.terracottaSoft },
  { bg: '#f6e3da', fg: palette.terracotta, accent: palette.ciel },
] as const

const AVATAR_MOTIFS = [
  // sun
  (fg: string, accent: string) => `
    <circle cx="600" cy="430" r="150" fill="${fg}"/>
    <g stroke="${fg}" stroke-width="26" stroke-linecap="round">
      <line x1="600" y1="180" x2="600" y2="120"/><line x1="600" y1="680" x2="600" y2="740"/>
      <line x1="350" y1="430" x2="290" y2="430"/><line x1="850" y1="430" x2="910" y2="430"/>
      <line x1="425" y1="255" x2="383" y2="213"/><line x1="775" y1="605" x2="817" y2="647"/>
      <line x1="425" y1="605" x2="383" y2="647"/><line x1="775" y1="255" x2="817" y2="213"/>
    </g>
    <circle cx="530" cy="390" r="18" fill="${accent}"/>`,
  // flower
  (fg: string, accent: string) => `
    <g transform="translate(600 430)">
      <g fill="${fg}">
        <ellipse cx="0" cy="-110" rx="64" ry="96"/><ellipse cx="0" cy="110" rx="64" ry="96"/>
        <ellipse cx="-110" cy="0" rx="96" ry="64"/><ellipse cx="110" cy="0" rx="96" ry="64"/>
        <ellipse cx="-80" cy="-80" rx="70" ry="52" transform="rotate(-45 -80 -80)"/>
        <ellipse cx="80" cy="80" rx="70" ry="52" transform="rotate(-45 80 80)"/>
        <ellipse cx="-80" cy="80" rx="70" ry="52" transform="rotate(45 -80 80)"/>
        <ellipse cx="80" cy="-80" rx="70" ry="52" transform="rotate(45 80 -80)"/>
      </g>
      <circle cx="0" cy="0" r="76" fill="${accent}"/>
    </g>`,
  // star
  (fg: string, accent: string) => `
    <g transform="translate(600 440)">
      <path d="M0 -190 L52 -62 L190 -52 L86 34 L120 170 L0 96 L-120 170 L-86 34 L-190 -52 L-52 -62 Z" fill="${fg}"/>
      <circle cx="0" cy="0" r="34" fill="${accent}"/>
    </g>`,
  // heart-leaf
  (fg: string, accent: string) => `
    <g transform="translate(600 460)">
      <path d="M0 120 C -170 10 -140 -140 -10 -90 C 120 -150 170 10 0 120 Z" fill="${fg}"/>
      <path d="M-10 -90 Q 0 20 0 110" stroke="${accent}" stroke-width="16" fill="none" stroke-linecap="round"/>
    </g>`,
  // moon & stars
  (fg: string, accent: string) => `
    <g transform="translate(580 430)">
      <path d="M60 -160 a160 160 0 1 0 60 300 a130 130 0 0 1 -60 -300 z" fill="${fg}"/>
      <path d="M150 -60 l10 22 24 3 -17 17 4 24 -21 -11 -21 11 4 -24 -17 -17 24 -3 z" fill="${accent}"/>
      <path d="M190 60 l7 15 17 2 -12 12 3 17 -15 -8 -15 8 3 -17 -12 -12 17 -2 z" fill="${accent}"/>
    </g>`,
  // bird
  (fg: string, accent: string) => `
    <g transform="translate(590 450)">
      <ellipse cx="0" cy="30" rx="150" ry="110" fill="${fg}"/>
      <circle cx="110" cy="-60" r="70" fill="${fg}"/>
      <circle cx="132" cy="-72" r="10" fill="#38291a"/>
      <path d="M170 -50 l52 14 -52 16 z" fill="${accent}"/>
      <path d="M-60 10 q-40 40 -10 90 q40 -20 60 -70" fill="${accent}" opacity="0.85"/>
    </g>`,
] as const

export function renderPortrait(index: number): Promise<Buffer> {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
  const motif = AVATAR_MOTIFS[index % AVATAR_MOTIFS.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
  <rect width="1200" height="900" fill="${color.bg}"/>
  <circle cx="600" cy="440" r="330" fill="${palette.cream}" opacity="0.55"/>
  ${motif(color.fg, color.accent)}
</svg>`
  return sharp(Buffer.from(svg)).resize(1200, 900).png({ quality: 90 }).toBuffer()
}

export const ILLUSTRATION_THEMES = Object.keys(MOTIFS)

export async function renderIllustration(theme: string): Promise<Buffer> {
  const svg = MOTIFS[theme]
  if (!svg) throw new Error(`Unknown illustration theme: ${theme}`)
  return sharp(Buffer.from(svg)).resize(1200, 900).png({ quality: 90 }).toBuffer()
}
