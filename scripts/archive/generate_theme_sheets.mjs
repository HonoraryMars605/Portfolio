import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/assets/canva_sprites');

// 5 Master Theme Vector Sheets (Grid layout 500x120, transparent background, sharp vector shapes)
const sheets = {
  'master_theme_minimal.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 100" width="500" height="100" fill="none">
    <!-- 1. Crosshair -->
    <g transform="translate(10, 2)">
      <line x1="20" y1="48" x2="76" y2="48" stroke="#9B1C2E" stroke-width="3" stroke-linecap="round"/>
      <line x1="48" y1="20" x2="48" y2="76" stroke="#9B1C2E" stroke-width="3" stroke-linecap="round"/>
    </g>
    <!-- 2. Dotgrid -->
    <g transform="translate(110, 2)" fill="#111111">
      <rect x="26" y="26" width="6" height="6" rx="1"/>
      <rect x="45" y="26" width="6" height="6" rx="1"/>
      <rect x="64" y="26" width="6" height="6" rx="1"/>
      <rect x="26" y="45" width="6" height="6" rx="1"/>
      <rect x="45" y="45" width="6" height="6" rx="1" fill="#9B1C2E"/>
      <rect x="64" y="45" width="6" height="6" rx="1"/>
      <rect x="26" y="64" width="6" height="6" rx="1"/>
      <rect x="45" y="64" width="6" height="6" rx="1"/>
      <rect x="64" y="64" width="6" height="6" rx="1"/>
    </g>
    <!-- 3. Target -->
    <g transform="translate(210, 2)">
      <circle cx="48" cy="48" r="26" stroke="#111111" stroke-width="2.5"/>
      <circle cx="48" cy="48" r="6" fill="#9B1C2E"/>
      <line x1="48" y1="14" x2="48" y2="22" stroke="#111111" stroke-width="2"/>
      <line x1="48" y1="74" x2="48" y2="82" stroke="#111111" stroke-width="2"/>
      <line x1="14" y1="48" x2="22" y2="48" stroke="#111111" stroke-width="2"/>
      <line x1="74" y1="48" x2="82" y2="48" stroke="#111111" stroke-width="2"/>
    </g>
    <!-- 4. Box -->
    <g transform="translate(310, 2)">
      <rect x="24" y="24" width="48" height="48" stroke="#111111" stroke-width="2.5" rx="2"/>
      <rect x="44" y="44" width="8" height="8" fill="#9B1C2E"/>
    </g>
    <!-- 5. Telemetry Anchor -->
    <g transform="translate(410, 2)">
      <line x1="28" y1="48" x2="68" y2="48" stroke="#9B1C2E" stroke-width="2.5"/>
      <line x1="48" y1="28" x2="48" y2="68" stroke="#9B1C2E" stroke-width="2.5"/>
      <path d="M22 34 V22 H34 M62 22 H74 V34 M74 62 V74 H62 M34 74 H22 V62" stroke="#111111" stroke-width="2" fill="none"/>
    </g>
  </svg>`,

  'master_theme_code.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 100" width="500" height="100" fill="none">
    <g transform="translate(10, 2)">
      <text x="48" y="58" font-family="'Fira Code', monospace" font-size="44" font-weight="bold" fill="#059669" text-anchor="middle">{}</text>
    </g>
    <g transform="translate(110, 2)">
      <text x="48" y="56" font-family="'Fira Code', monospace" font-size="34" font-weight="bold" fill="#0284C7" text-anchor="middle">&lt;/&gt;</text>
    </g>
    <g transform="translate(210, 2)">
      <text x="48" y="56" font-family="'Fira Code', monospace" font-size="40" font-weight="bold" fill="#7C3AED" text-anchor="middle">&gt;_</text>
    </g>
    <g transform="translate(310, 2)">
      <text x="48" y="64" font-family="'Fira Code', monospace" font-size="52" font-weight="bold" fill="#9B1C2E" text-anchor="middle">;</text>
    </g>
    <g transform="translate(410, 2)">
      <text x="48" y="56" font-family="'Fira Code', monospace" font-size="32" font-weight="bold" fill="#1E293B" text-anchor="middle">01</text>
    </g>
  </svg>`,

  'master_theme_gamedev.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 100" width="500" height="100" fill="none">
    <g transform="translate(10, 2)">
      <path d="M48 76 L22 48 C14 40 14 26 24 18 C34 10 44 18 48 24 C52 18 62 10 72 18 C82 26 82 40 74 48 Z" fill="#E11D48"/>
      <rect x="30" y="24" width="8" height="8" fill="#FFF" opacity="0.6"/>
    </g>
    <g transform="translate(110, 2)">
      <rect x="36" y="16" width="24" height="64" rx="4" fill="#111111"/>
      <rect x="16" y="36" width="64" height="24" rx="4" fill="#111111"/>
      <circle cx="48" cy="48" r="6" fill="#0891B2"/>
    </g>
    <g transform="translate(210, 2)">
      <polygon points="48,18 78,34 48,50 18,34" fill="#F59E0B"/>
      <polygon points="18,34 48,50 48,80 18,64" fill="#D97706"/>
      <polygon points="48,50 78,34 78,64 48,80" fill="#B45309"/>
    </g>
    <g transform="translate(310, 2)">
      <polygon points="48,16 57,36 78,36 61,50 67,72 48,58 29,72 35,50 18,36 39,36" fill="#FACC15" stroke="#EAB308" stroke-width="2"/>
    </g>
    <g transform="translate(410, 2)">
      <circle cx="48" cy="48" r="28" fill="#F59E0B" stroke="#D97706" stroke-width="3"/>
      <circle cx="48" cy="48" r="18" fill="none" stroke="#D97706" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="48" y="55" font-family="sans-serif" font-size="20" font-weight="bold" fill="#78350F" text-anchor="middle">★</text>
    </g>
  </svg>`,

  'master_theme_space.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 100" width="500" height="100" fill="none">
    <g transform="translate(10, 2)">
      <path d="M48 14 Q48 48 14 48 Q48 48 48 82 Q48 48 82 48 Q48 48 48 14 Z" fill="#6366F1"/>
      <circle cx="48" cy="48" r="4" fill="#FFF"/>
    </g>
    <g transform="translate(110, 2)">
      <circle cx="48" cy="48" r="20" fill="#0284C7"/>
      <ellipse cx="48" cy="48" rx="36" ry="12" stroke="#38BDF8" stroke-width="3" transform="rotate(-20 48 48)" fill="none"/>
    </g>
    <g transform="translate(210, 2)">
      <ellipse cx="48" cy="48" rx="32" ry="32" stroke="#94A3B8" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
      <circle cx="48" cy="16" r="6" fill="#9B1C2E"/>
      <circle cx="48" cy="48" r="10" fill="#334155"/>
    </g>
    <g transform="translate(310, 2)">
      <path d="M60 22 C42 26 30 42 34 60 C38 78 54 86 68 80 C50 82 36 68 36 50 C36 36 46 25 60 22 Z" fill="#FACC15"/>
    </g>
    <g transform="translate(410, 2)">
      <polygon points="48,20 72,28 78,56 60,76 34,74 20,52 26,30" fill="#475569" stroke="#334155" stroke-width="2"/>
      <circle cx="42" cy="40" r="4" fill="#334155"/>
      <circle cx="58" cy="54" r="3" fill="#334155"/>
    </g>
  </svg>`,

  'master_theme_abstract.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 100" width="500" height="100" fill="none">
    <g transform="translate(10, 2)">
      <path d="M18 48 C 26 24, 38 72, 50 48 C 62 24, 72 68, 80 48" stroke="#FF5722" stroke-width="5" stroke-linecap="round" fill="none"/>
    </g>
    <g transform="translate(110, 2)">
      <circle cx="48" cy="48" r="28" stroke="#3F51B5" stroke-width="6"/>
      <circle cx="48" cy="48" r="12" fill="#FAF9F5"/>
    </g>
    <g transform="translate(210, 2)">
      <path d="M 48 20 A 28 28 0 1 1 20 48" stroke="#009688" stroke-width="6" stroke-linecap="round" fill="none"/>
      <circle cx="20" cy="48" r="4" fill="#009688"/>
    </g>
    <g transform="translate(310, 2)">
      <polygon points="48,16 80,48 48,80 16,48" stroke="#FFC107" stroke-width="5" fill="none"/>
      <circle cx="48" cy="48" r="8" fill="#E91E63"/>
    </g>
    <g transform="translate(410, 2)">
      <rect x="20" y="34" width="56" height="28" rx="14" fill="#9B1C2E"/>
      <circle cx="34" cy="48" r="6" fill="#FAF9F5"/>
    </g>
  </svg>`
};

for (const [file, content] of Object.entries(sheets)) {
  fs.writeFileSync(path.join(outDir, file), content.trim());
}

console.log('Created 5 master vector sheets');
