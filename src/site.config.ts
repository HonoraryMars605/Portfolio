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
    featuredPostCount: 0,
    postsPerPage: 8,
    tocMaxDepth: 3,
    shareActions: ["x", "linkedin"],
  },

  home: {
    careerHighlightCount: 4,
    updateCount: 0,
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
    about: false,
    footer: true,
  },
}

export const NAV_LINKS: LinkConfig[] = []

export const NAVIGATION: LinkConfig[] = []

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
  sourceContent: "https://github.com/valeriocomella/valeriocomella.github.io",
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
