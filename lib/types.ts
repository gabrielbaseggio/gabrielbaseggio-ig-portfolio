export type Lang = "en" | "es"
export type PostType = "work" | "skills" | "education"
export type SkillCategory = "languages" | "frontend" | "backend" | "tools"

export interface Profile {
  name: string
  username: string
  bio: string
  location: string
  email: string
  github: string
  stats: {
    projects: number
    technologies: string
    yearsExp: number
  }
}

export interface Highlight {
  id: string
  label: string
  href: string
  icon: string
}

export interface Post {
  id: string
  type: PostType
  title: string
  subtitle: string
  detail?: string
  href: string
}

export interface WorkItem {
  company: string
  role: string
  period: string
  description: string
  tech: string[]
  bullets: string[]
  github?: string | null
}

export interface Skills {
  languages: string[]
  frontend: string[]
  backend: string[]
  tools: string[]
}

export interface SkillCard {
  id: string
  name: string
  displayName?: string
  category: SkillCategory
  iconPath?: string
  iconColor?: string
}

export interface Education {
  institution: string
  shortName: string
  degree: string
  period: string
  gpa: string
  gpaRank: string
  honors: string[]
  description: string
}

export interface PortfolioData {
  profile: Profile
  highlights: Highlight[]
  posts: Post[]
  works: WorkItem[]
  skills: Skills
  skillCards: SkillCard[]
  education: Education
}

// ── Translation types ─────────────────────────────────────────────────────────

export interface PostTranslation {
  subtitle: string
  detail?: string
  title?: string
}

export interface WorkTranslationItem {
  company: string
  role: string
  period: string
  description: string
  bullets: string[]
}

export interface TranslationShape {
  nav: {
    work: string
    skills: string
    education: string
    about: string
  }
  home: {
    username: string
  }
  profile: {
    role: string
    studies: string
    message: string
    github: string
    stats: {
      projects: string
      technologies: string
      yearsExp: string
    }
  }
  highlights: {
    work: string
    skills: string
    education: string
    about: string
  }
  postGrid: {
    work: string
    skills: string
    education: string
    less: string
    skillSections: {
      languages: string
      frontend: string
      backend: string
      tools: string
    }
  }
  posts: Record<string, PostTranslation>
  work: {
    heading: string
    viewOnGitHub: string
    items: WorkTranslationItem[]
  }
  skills: {
    heading: string
    categories: {
      languages: string
      frontend: string
      backend: string
      tools: string
    }
  }
  education: {
    heading: string
    degree: string
    gpaLabel: string
    gpaRank: string
    honorsLabel: string
    honors: string[]
    description: string
  }
  about: {
    heading: string
    intro: string[]
    workStyleLabel: string
    traits: Array<{ label: string; desc: string }>
    ctaHeading: string
    ctaSubtext: string
    ctaButton: string
  }
}

export interface TranslationsData {
  en: TranslationShape
  es: TranslationShape
}
