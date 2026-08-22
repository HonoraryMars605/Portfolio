# Panoramica Progetto Portfolio - Valerio Comella

Documento di sintesi architetturale, configurazione e stato attuale del portfolio professionale sviluppato con **Astro v4**, **TypeScript** e **Tailwind CSS**.

---

## 1. Struttura del File System (Albero)

```text
valeriocomella.github.io/
├── public/
│   ├── CV_ComellaValerio.pdf
│   ├── _headers
│   ├── apple-touch-icon.png
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── site.webmanifest
│   ├── fonts/
│   │   ├── DMSans-latin-ext[wght].woff2
│   │   ├── DMSans-latin[wght].woff2
│   │   ├── Lilex[wght].woff2
│   │   ├── NotoSansSC.woff2
│   │   └── STIXTwoMath-Regular.woff2
│   ├── img/
│   │   └── social-preview.png
│   └── styles/
│       └── zoom.css
├── src/
│   ├── assets/
│   │   ├── avatar.png
│   │   ├── icons/
│   │   │   ├── anki.svg
│   │   │   ├── claude.svg
│   │   │   ├── cmux.svg
│   │   │   ├── cursor.svg
│   │   │   ├── ghostty.svg
│   │   │   ├── intellij.svg
│   │   │   ├── itchio.svg
│   │   │   ├── latex.svg
│   │   │   ├── linkedin.svg
│   │   │   ├── logitech.svg
│   │   │   ├── logseq.svg
│   │   │   ├── obsidian.svg
│   │   │   ├── raycast.svg
│   │   │   ├── reclaim.svg
│   │   │   ├── substack.svg
│   │   │   ├── todoist.svg
│   │   │   ├── typst.svg
│   │   │   ├── ubuntu.svg
│   │   │   ├── visualstudio.svg
│   │   │   ├── vscode.svg
│   │   │   ├── zed.svg
│   │   │   ├── zen.svg
│   │   │   └── callouts/
│   │   └── og/
│   ├── components/
│   │   ├── base/
│   │   │   ├── Avatar.astro
│   │   │   ├── BackToTop.astro
│   │   │   ├── Badge.astro
│   │   │   ├── Button.astro
│   │   │   ├── Chip.astro
│   │   │   ├── Collapse.astro
│   │   │   ├── CopyButton.astro
│   │   │   ├── CopyMarkdown.astro
│   │   │   ├── Dropdown.astro
│   │   │   ├── FormattedDate.astro
│   │   │   ├── Icon.astro
│   │   │   ├── Link.astro
│   │   │   ├── Pagination.astro
│   │   │   ├── ReadingTime.astro
│   │   │   ├── TaxonomyChip.astro
│   │   │   ├── Tooltip.astro
│   │   │   └── card/
│   │   ├── blog/
│   │   ├── career/
│   │   ├── layout/
│   │   │   ├── Breadcrumbs.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Head.astro
│   │   │   ├── Header.astro
│   │   │   ├── MobileNav.astro
│   │   │   ├── MobileNavToggle.astro
│   │   │   ├── PageHead.astro
│   │   │   ├── Section.astro
│   │   │   ├── Sidenote.astro
│   │   │   └── ThemeToggle.astro
│   │   ├── people/
│   │   ├── profile/
│   │   │   ├── EmailLink.astro
│   │   │   ├── helper.ts
│   │   │   ├── Profile.astro
│   │   │   ├── ProfileLinks.astro
│   │   │   └── Pronunciation.astro
│   │   ├── projects/
│   │   │   ├── DateRange.astro
│   │   │   ├── ProjectNavigation.astro
│   │   │   ├── ProjectRow.astro
│   │   │   └── ProjectTypeBadge.astro
│   │   ├── publications/
│   │   ├── updates/
│   │   └── widgets/
│   │       ├── GithubLive.astro
│   │       ├── IdeStats.astro
│   │       ├── ItchEmbed.astro
│   │       ├── ItchShowcase.astro
│   │       ├── LinkedInBadge.astro
│   │       └── LinkedInCard.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── blog/
│   │   │   └── astro-scholar-release.md
│   │   ├── data/
│   │   │   ├── experience.json
│   │   │   ├── people.toml
│   │   │   ├── stages.json
│   │   │   └── tech-stack.json
│   │   ├── pages/
│   │   │   ├── about.md
│   │   │   ├── misc.md
│   │   │   ├── now.md
│   │   │   ├── services.md
│   │   │   └── tech.md
│   │   ├── projects/
│   │   │   ├── il-rito.md
│   │   │   ├── lock-fight.md
│   │   │   ├── please-open-the-door.md
│   │   │   ├── rusheep.md
│   │   │   ├── sfuryatell.md
│   │   │   └── violinum.md
│   │   ├── publications/
│   │   │   └── main.bib
│   │   └── updates/
│   │       ├── 2025-04-30-katabasi-studio.md
│   │       ├── 2025-09-30-its-lazio-digital.md
│   │       ├── 2025-11-30-protom.md
│   │       ├── 2026-04-30-abcd-edutainment.md
│   │       └── 2026-07-01-skill-factory.md
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   ├── date-utils.ts
│   │   ├── markdown-document.ts
│   │   ├── projects.ts
│   │   ├── string-manipulation.ts
│   │   └── ...
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── index.astro
│   │   ├── llms.txt.ts
│   │   ├── now.astro
│   │   ├── palette.astro
│   │   ├── publications.astro
│   │   ├── robots.txt.ts
│   │   ├── rss.xml.ts
│   │   ├── tech.astro
│   │   ├── uses.astro
│   │   ├── blog/
│   │   │   ├── [...id].astro
│   │   │   ├── [...page].astro
│   │   │   ├── stages/
│   │   │   └── tags/
│   │   ├── og/
│   │   ├── people/
│   │   └── projects/
│   │       ├── [...slug].astro
│   │       └── index.astro
│   ├── schemas/
│   │   └── index.ts
│   ├── styles/
│   │   ├── callout.css
│   │   ├── global.css
│   │   ├── itch-widget.css
│   │   ├── sidenote.css
│   │   └── ...
│   ├── icon.config.ts
│   ├── site.config.ts
│   └── types.d.ts
├── astro.config.ts
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

---

## 2. Configurazione Principale (`src/site.config.ts`)

```typescript
import type {
  FooterConfig,
  LinkConfig,
  ProfileConfig,
  PublicationConfig,
  SiteConfig,
} from "@/types"

export const SITE: SiteConfig = {
  title: "Valerio Comella",
  description:
      "Software Engineer | Unity (C#), Mixed Reality, WebGL e Full Stack Developer.",
  href: "https://valeriocomella.github.io",
  author: "Valerio Comella",
  dir: "ltr",
  defaultPageImage: "/img/social-preview.png",
  defaultPostImage: "/img/social-preview.png",

  locale: {
    lang: "it-IT",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Europe/Rome",
    },
  },

  blog: {
    featuredPostCount: 3,
    postsPerPage: 8,
    tocMaxDepth: 3,
    shareActions: ["x", "linkedin"],
  },

  home: {
    careerHighlightCount: 4,
    updateCount: 4,
    publicationCount: 0,
  },

  favicon: "/favicon.ico",
  prerender: true,
  npmCDN: "https://cdn.jsdelivr.net/npm",

  license: {
    label: "CC-BY-4.0",
    href: "https://creativecommons.org/licenses/by/4.0/",
  },
}

export const PROFILE: ProfileConfig = {
  name: "Valerio Comella",
  tagline: "Software Engineer | Unity (C#) & Full Stack",
  email: "valeriocom@hotmail.it",
  phone: "3339959271",
  location: "Napoli, Italia",
  pronouns: "he/him",
  links: {
    github: "https://github.com/valeriocomella",
    linkedin: "https://www.linkedin.com/in/valerio-comella-6a5693241/",
    itchio: "https://honorarymars605.itch.io",
    cv: "/CV_ComellaValerio.pdf",
  },
  linksPlacement: {
    header: ["email", "github", "linkedin", "itchio"],
    about: true,
    footer: true,
  },
}

export const NAV_LINKS: LinkConfig[] = [
  { href: "/projects", label: "Progetti" },
  { href: "/uses", label: "Tech Stack" },
  { href: "/now", label: "Now" },
]

export const NAVIGATION: LinkConfig[] = NAV_LINKS.map(({ href, label }) => ({
  href,
  label,
}))

export const PUB_CONFIG: PublicationConfig = {
  maxFirstAuthors: 6,
  maxLastAuthors: 1,
  highlightAuthor: {
    firstName: "Valerio",
    lastName: "Comella",
    aliases: ["V. Comella"],
  },
  equalSymbols: {
    first: "*",
    second: "†",
    third: "‡",
    last: "§",
  },
}

export const FOOTER: FooterConfig = {
  credits: true,
  sourceCode: "https://github.com/valeriocomella/valeriocomella.github.io",
  sourceContent:
      "https://github.com/valeriocomella/valeriocomella.github.io/tree/main/src/content",
  footerLinks: [],
}

if (import.meta.env.DEV && typeof window === "undefined") {
  const {
    FooterConfigSchema,
    ProfileConfigSchema,
    PublicationConfigSchema,
    SiteConfigSchema,
  } = await import("@/schemas")
  SiteConfigSchema.parse(SITE)
  ProfileConfigSchema.parse(PROFILE)
  FooterConfigSchema.parse(FOOTER)
  PublicationConfigSchema.parse(PUB_CONFIG)
}
```

---

## 3. Configurazione Schema Collezioni (`src/content/config.ts`)

```typescript
import { defineCollection, z } from "astro:content"

import { ProjectTypeSchema } from "@/schemas"
import { createLocalDate } from "@/lib/date-utils"
import {
  dedupLowerCase,
  dedupPreserveCase,
  slugify,
} from "@/lib/string-manipulation"

const yearMonthDateSchema = z
  .union([z.date(), z.string().transform(createLocalDate)])
  .describe("Should be valid YYYY-MM format.")

const dateSchema = z
  .union([z.date(), z.string().transform(createLocalDate)])
  .refine((date) => !Number.isNaN(date.getTime()), {
    message: "Invalid date format. Must be YYYY-MM-DD or ISO datetime format.",
  })

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string().max(200).optional(),
        createdAt: dateSchema,
        updatedAt: dateSchema.optional(),
        order: z.number().optional(),
        image: image().optional(),
        tags: z
          .array(z.string())
          .default([])
          .transform((arr) => dedupLowerCase(arr).map((tag) => slugify(tag))),
        authors: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        stage: z.enum(["seedling", "budding", "evergreen"]).optional(),
        audience: z.string().max(300).optional(),
      })
      .refine(
        (data) =>
          !data.createdAt || !data.updatedAt || data.updatedAt > data.createdAt,
        {
          message: "Modified date must be after published date",
        },
      ),
})

const projects = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string().max(75),
      selected: z.boolean().default(false),
      fromDate: yearMonthDateSchema.optional(),
      toDate: yearMonthDateSchema.optional(),
      code: z.string().url().optional(),
      doc: z.string().url().optional(),
      paper: z.string().url().optional(),
      url: z.string().url().optional(),
      release: z.string().url().optional(),
      types: z.array(ProjectTypeSchema).default([]),
      skills: z
        .array(z.string().trim().min(1))
        .default([])
        .transform((arr) => dedupPreserveCase(arr)),
      description: z.string().max(200).optional(),
      itchId: z.string().optional(),
      itchUrl: z.string().url().optional(),
      role: z.string().optional(),
      date: z.string().optional(),
      tags: z.array(z.string()).optional(),
    })
    .refine(
      (data) => !data.fromDate || !data.toDate || data.toDate >= data.fromDate,
      {
        message: "End date must be on or after start date",
      },
    ),
})

const updates = defineCollection({
  type: "content",
  schema: z.object({}),
})

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
})

const data = defineCollection({
  type: "data",
  schema: z.any(),
})

export const collections = {
  blog,
  projects,
  updates,
  pages,
  data,
}
```

---

## 4. Schede Progetti Attuali (`src/content/projects/*.md`)

### 1. `violinum.md`
- **Frontmatter:**
  ```yaml
  title: Violinum
  selected: true
  fromDate: 2024-10
  toDate: 2025-05
  role: Unity Developer (C#)
  date: Ottobre 2024 – Maggio 2025
  types:
    - product
  skills:
    - Unity
    - C#
    - Interactive Systems
    - Game Dev
  tags:
    - Unity
    - C#
    - Interactive Systems
    - Game Dev
  itchId: "3703097"
  itchUrl: https://violinum.itch.io/violinum-italian-game-2025
  url: https://violinum.itch.io/violinum-italian-game-2025
  release: https://violinum.itch.io/violinum-italian-game-2025
  description: Applicazione interattiva e videogioco narrativo sviluppato in Unity e C#.
  ```
- **Corpo Iniziale:**
  > `## Panoramica`  
  > `**Violinum** è un'applicazione interattiva e videogioco narrativo sviluppato in **Unity** e **C#** (Ottobre 2024 – Maggio 2025).`

---

### 2. `lock-fight.md`
- **Frontmatter:**
  ```yaml
  title: Lock Fight
  selected: true
  fromDate: 2024-09
  toDate: 2024-10
  role: Unity Developer (C#)
  date: Settembre 2024 – Ottobre 2024
  types:
    - product
  skills:
    - Unity
    - C#
    - Combat System
    - Game Dev
  tags:
    - Unity
    - C#
    - Combat System
    - Game Dev
  itchId: "3086012"
  itchUrl: https://lock-fight.itch.io/lock-fight
  url: https://lock-fight.itch.io/lock-fight
  release: https://lock-fight.itch.io/lock-fight
  description: Progetto videoludico incentrato sulle logiche di combattimento e gameplay loop in C#.
  ```
- **Corpo Iniziale:**
  > `## Panoramica`  
  > `**Lock Fight** è un progetto videoludico realizzato in **Unity** (Settembre 2024 – Ottobre 2024).`

---

### 3. `rusheep.md`
- **Frontmatter:**
  ```yaml
  title: Rusheep
  selected: true
  fromDate: 2024-08
  toDate: 2024-10
  role: Unity Developer (C#)
  date: Agosto 2024 – Ottobre 2024
  types:
    - product
  skills:
    - Unity
    - C#
    - Gameplay Mechanics
    - Platformer
  tags:
    - Unity
    - C#
    - Gameplay Mechanics
    - Platformer
  itchId: "2879774"
  itchUrl: https://piuttostobene.itch.io/rusheep
  url: https://piuttostobene.itch.io/rusheep
  release: https://piuttostobene.itch.io/rusheep
  description: Sviluppo di meccaniche di gioco dinamiche e gestione del player controller in Unity (C#).
  ```
- **Corpo Iniziale:**
  > `## Panoramica`  
  > `**Rusheep** è un videogioco dinamico sviluppato in **Unity** (Agosto 2024 – Ottobre 2024).`

---

### 4. `please-open-the-door.md`
- **Frontmatter:**
  ```yaml
  title: Please Open the Door!
  selected: true
  fromDate: 2025-01
  toDate: 2025-01
  role: Unity Developer (C#)
  date: "2025-01-01"
  types:
    - product
  skills:
    - Unity
    - C#
    - Narrative
    - Puzzle
    - Global Game Jam
  tags:
    - Unity
    - C#
    - Narrative
    - Puzzle
    - Global Game Jam
  itchId: "3970512"
  itchUrl: https://piuttostobene.itch.io/please-open-the-door
  url: https://piuttostobene.itch.io/please-open-the-door
  release: https://piuttostobene.itch.io/please-open-the-door
  description: Esperienza narrativa e puzzle interattivo sviluppata per la Global Game Jam.
  ```
- **Corpo Iniziale:**
  > `## Panoramica`  
  > `**Please Open the Door!** è un'avventura atmosferica e puzzle game interattivo sviluppato in occasione della **Global Game Jam 2025**.`

---

### 5. `il-rito.md`
- **Frontmatter:**
  ```yaml
  title: "Il Rito"
  selected: true
  fromDate: 2026-01
  toDate: 2026-01
  role: "Unity Developer (C#)"
  date: "2026-01-25"
  types:
    - product
  skills:
    - Unity
    - C#
    - Global Game Jam 2026
    - Game Dev
    - Narrative
  tags:
    - Unity
    - C#
    - Global Game Jam 2026
    - Game Dev
    - Narrative
  description: "Videogioco narrativo e d'atmosfera sviluppato in Unity (C#) in occasione della Global Game Jam 2026."
  itchId: "4367122"
  itchUrl: "https://piuttostobene.itch.io/il-rito"
  url: "https://piuttostobene.itch.io/il-rito"
  release: "https://piuttostobene.itch.io/il-rito"
  ```
- **Corpo Iniziale:**
  > `## Panoramica`  
  > `**Il Rito** è un'esperienza videoludica sviluppata durante la **Global Game Jam 2026**.`

---

### 6. `sfuryatell.md`
- **Frontmatter:**
  ```yaml
  title: Sfuryatell
  selected: true
  fromDate: 2023-01
  toDate: 2023-09
  role: UI/UX Unity Developer (C#)
  date: Gennaio 2023 – Settembre 2023
  types:
    - tool
    - product
  skills:
    - Unity
    - C#
    - UI Toolkit
    - UI/UX
  tags:
    - Unity
    - C#
    - UI Toolkit
    - UI/UX
  url: https://github.com/valeriocomella
  description: Progetto con focus su implementazione e architettura UI avanzata sviluppata tramite Unity UI Toolkit e C#.
  ```
- **Corpo Iniziale:**
  > `## Panoramica`  
  > `**Sfuryatell** è un progetto sviluppato in **Unity** (Gennaio 2023 – Settembre 2023).`

---

## 5. Dipendenze e Configurazione Build (`package.json` & `astro.config.ts`)

### `package.json` (Dependencies):
```json
{
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/mdx": "^3.1.9",
    "@astrojs/rss": "^4.0.9",
    "@astrojs/sitemap": "3.2.1",
    "@astrojs/tailwind": "^5.1.4",
    "@citation-js/core": "^0.8.2",
    "@citation-js/plugin-bibtex": "^0.8.2",
    "@citation-js/plugin-csl": "^0.8.2",
    "@date-fns/tz": "^1.5.0",
    "@expressive-code/plugin-collapsible-sections": "^0.44.1",
    "@expressive-code/plugin-line-numbers": "^0.44.1",
    "@iconify-json/academicons": "^1.2.4",
    "@iconify-json/mingcute": "^1.2.8",
    "@iconify/utils": "^3.1.4",
    "astro": "^4.16.18",
    "date-fns": "^4.4.0",
    "github-slugger": "^2.0.0",
    "hast-util-select": "^6.0.4",
    "hast-util-to-html": "^9.0.5",
    "hastscript": "^9.0.1",
    "mdast-util-to-hast": "^13.2.1",
    "satori": "^0.33.3",
    "satteri": "^0.10.5",
    "satteri-expressive-code": "^0.1.24",
    "sharp": "^0.35.3",
    "tailwindcss": "^3.4.17",
    "temml": "^0.13.4",
    "typescript": "^5.7.3"
  }
}
```

### `astro.config.ts`:
```typescript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    site: 'https://valeriocomella.github.io',
    base: '/',
    integrations: [tailwind(), mdx(), sitemap()],
    vite: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@site-config': path.resolve(__dirname, './src/site.config.ts'),
                '@icon-config': path.resolve(__dirname, './src/icon.config.ts'),
            },
        },
    },
});
```

---

## 6. Pagine e Routing Statico (`src/pages/`)

Tutte le 25 pagine generate staticamente durante il comando `npm run build` (`astro check && astro build`):

- `/` (`src/pages/index.astro`) - Homepage con profilo, avatar HiDPI, carriera, widgets GitHub/LinkedIn/Itch.io e progetti in evidenza.
- `/projects` (`src/pages/projects/index.astro`) - Catalogo e lista filtrabile dei progetti.
- `/projects/[slug]` (`src/pages/projects/[...slug].astro`) - Pagine di dettaglio dinamiche con player/widget Itch.io integrato:
  - `/projects/violinum`
  - `/projects/lock-fight`
  - `/projects/rusheep`
  - `/projects/please-open-the-door`
  - `/projects/il-rito`
  - `/projects/sfuryatell`
- `/uses` (`src/pages/uses.astro`) - Tech Stack, tool e configurazione di sviluppo (Unity, C#, Spring Boot, Visual Studio, ecc.).
- `/tech` (`src/pages/tech.astro`) - Alias route per la pagina del Tech Stack.
- `/now` (`src/pages/now.astro`) - Attività correnti e focus di apprendimento/lavoro.
- `/publications` (`src/pages/publications.astro`) - Pubblicazioni scientifiche e tecniche.
- `/palette` (`src/pages/palette.astro`) - Sistema di colori e token del tema.
- `/people` & `/people/[id]` (`src/pages/people/`) - Schede autori e profili collaboratori.
- `/blog`, `/blog/[id]`, `/blog/stages/[stage]`, `/blog/tags/[id]` (`src/pages/blog/`) - Sezione blog e note tecniche.
- `/404` (`src/pages/404.astro`) - Pagina di errore personalizzata.
- `/rss.xml` (`src/pages/rss.xml.ts`) - Feed RSS.
- `/robots.txt` & `/llms.txt` (`src/pages/robots.txt.ts`, `src/pages/llms.txt.ts`) - Endpoint SEO e indicizzazione LLM.
