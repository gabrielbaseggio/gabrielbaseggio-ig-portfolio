export type Lang = "en" | "es"

export const t = {
  en: {
    // ── Nav / shared ──────────────────────────────────────────────────────────
    nav: {
      work: "Work",
      skills: "Skills",
      education: "Education",
      about: "About",
    },

    // ── Home top-bar ──────────────────────────────────────────────────────────
    home: {
      username: "axelbaseggio",
    },

    // ── Profile header ────────────────────────────────────────────────────────
    profile: {
      role: "Full Stack Developer",
      studies: "CS @ UNRC · GPA 9.63/10",
      message: "Message",
      github: "GitHub",
      stats: {
        projects: "Projects",
        technologies: "Technologies",
        yearsExp: "Years Exp",
      },
    },

    // ── Story highlights ──────────────────────────────────────────────────────
    highlights: {
      work: "Work",
      skills: "Skills",
      education: "Education",
      about: "About",
    },

    // ── Post grid categories ──────────────────────────────────────────────────
    postGrid: {
      work: "Work",
      skills: "Skills",
      education: "Education",
      less: "Less",
      showMore: (n: number) => `+${n}`,
      skillSections: {
        languages: "Languages",
        frontend: "Frontend",
        backend: "Backend",
        tools: "Tools",
      },
    },

    // ── Posts (grid card subtitles / details) ─────────────────────────────────
    posts: {
      fluid:   { subtitle: "Full Stack Dev", detail: "Jan 2025 – Now" },
      trexahr: { subtitle: "Full Stack Dev", detail: "Jul – Jan 2025" },
      crophero:{ subtitle: "Full Stack Dev", detail: "Apr – Jun 2024" },
      "skill-ts":     { subtitle: "Primary Lang" },
      "skill-rails":  { subtitle: "Backend" },
      "skill-react":  { subtitle: "Frontend" },
      "skill-python": { subtitle: "Backend" },
      "skill-docker": { subtitle: "DevOps" },
      gpa:    { subtitle: "GPA @ UNRC", detail: "Top 5 in class" },
      escort: { subtitle: "Flag Honor",  detail: "Academic Award" },
    },

    // ── Work page ─────────────────────────────────────────────────────────────
    work: {
      heading: "Work",
      viewOnGitHub: "View on GitHub",
      items: [
        {
          company: "Fluid",
          role: "Full Stack Developer",
          period: "Jan 2025 – Present",
          description:
            "Multi-tenant white-label SaaS platform serving 250k+ active users across MLM/direct sales enterprises, built across 5 services.",
          bullets: [
            "250,000+ active users across ASEA, Thermomix, Pawtree and more",
            "5 services: Rails backend, middleware, Next.js admin, checkout, React Native app",
            "28+ branded iOS & Android apps via React Native/Expo",
            "Complex PostgreSQL queries, Sidekiq jobs, and Redis caching at scale",
          ],
        },
        {
          company: "TrexaHR",
          role: "Full Stack Developer",
          period: "Jul 2024 – Jan 2025",
          description:
            "HR management platform for employee evaluation, surveying, and feedback generation, built full-stack from scratch.",
          bullets: [
            "Designed the full database schema and RESTful API",
            "Built controllers, views, and services from the ground up",
            "Behavior-driven testing with RSpec",
            "Resolved client issues and maintained production quality",
          ],
        },
        {
          company: "CropHero",
          role: "Full Stack Developer",
          period: "Apr 2024 – Jun 2024",
          description:
            "Field management application for recording agricultural data and generating reports to support decision-making.",
          bullets: [
            "Built front-end and back-end from scratch",
            "Designed database schema for agricultural field data",
            "RESTful endpoints with full database administration",
            "Behavior-driven testing with RSpec",
          ],
        },
      ],
    },

    // ── Skills page ───────────────────────────────────────────────────────────
    skills: {
      heading: "Skills",
      categories: {
        languages: "Languages",
        frontend: "Frontend",
        backend: "Backend & Databases",
        tools: "Tools",
      },
    },

    // ── Education page ────────────────────────────────────────────────────────
    education: {
      heading: "Education",
      degree: "Computer Science",
      gpaLabel: "GPA",
      gpaRank: "4th highest GPA in the cohort",
      honorsLabel: "Honors & Recognition",
      honors: ["First Escort of the Flag", "Academic Excellence Recognition"],
      description:
        "Pursuing a degree in Computer Science with a focus on software engineering and distributed systems. Consistently ranked among the top students in the cohort.",
    },

    // ── About page ────────────────────────────────────────────────────────────
    about: {
      heading: "About",
      intro: [
        "Hey! I'm Axel — a Full Stack Developer based in Córdoba, Argentina, currently building Fluid, a platform serving 250k+ users. I love working across the full stack — from crafting smooth UIs to designing scalable backend systems.",
        "I'm studying Computer Science at UNRC where I hold a 9.63/10 GPA and was recognized as First Escort of the Flag — an academic honor awarded to the top student in the cohort.",
        "When I'm not coding, I like going for long walks with my dog Simba, playing video games like Minecraft with my friends (I enjoy building Roman-style buildings), spending time with my girlfriend, going to the gym, and playing some Valorant.",
      ],
      workStyleLabel: "Work Style",
      traits: [
        {
          label: "Builder",
          desc: "I love turning ideas into real, working products. If I can ship it, I will.",
        },
        {
          label: "Problem Solver",
          desc: "Complex system design challenges? I thrive on figuring out the elegant solution.",
        },
        {
          label: "Lifelong Learner",
          desc: "Always picking up a new framework, language, or mental model. Curiosity is a feature.",
        },
        {
          label: "Team Player",
          desc: "I believe the best products are built by people who communicate well and trust each other.",
        },
      ],
      ctaHeading: "Want to build something together?",
      ctaSubtext: "I'm open to new opportunities and always happy to chat.",
      ctaButton: "Get in touch",
    },
  },

  es: {
    // ── Nav / shared ──────────────────────────────────────────────────────────
    nav: {
      work: "Trabajo",
      skills: "Skills",
      education: "Educación",
      about: "Sobre mí",
    },

    // ── Home top-bar ──────────────────────────────────────────────────────────
    home: {
      username: "axelbaseggio",
    },

    // ── Profile header ────────────────────────────────────────────────────────
    profile: {
      role: "Desarrollador Full Stack",
      studies: "CS @ UNRC · Promedio 9.63/10",
      message: "Mensaje",
      github: "GitHub",
      stats: {
        projects: "Proyectos",
        technologies: "Tecnologías",
        yearsExp: "Años Exp",
      },
    },

    // ── Story highlights ──────────────────────────────────────────────────────
    highlights: {
      work: "Trabajo",
      skills: "Skills",
      education: "Educación",
      about: "Sobre mí",
    },

    // ── Post grid categories ──────────────────────────────────────────────────
    postGrid: {
      work: "Trabajo",
      skills: "Skills",
      education: "Educación",
      less: "Menos",
      showMore: (n: number) => `+${n}`,
      skillSections: {
        languages: "Lenguajes",
        frontend: "Frontend",
        backend: "Backend",
        tools: "Herramientas",
      },
    },

    // ── Posts (grid card subtitles / details) ─────────────────────────────────
    posts: {
      fluid:   { subtitle: "Dev Full Stack", detail: "Ene 2025 – Hoy" },
      trexahr: { subtitle: "Dev Full Stack", detail: "Jul – Ene 2025" },
      crophero:{ subtitle: "Dev Full Stack", detail: "Abr – Jun 2024" },
      "skill-ts":     { subtitle: "Lang Principal" },
      "skill-rails":  { subtitle: "Backend" },
      "skill-react":  { subtitle: "Frontend" },
      "skill-python": { subtitle: "Backend" },
      "skill-docker": { subtitle: "DevOps" },
      gpa:    { subtitle: "Promedio @ UNRC", detail: "Top 5 del curso" },
      escort: { subtitle: "Escolta Bandera", detail: "Premio Académico", title: "Distinción" },
    },

    // ── Work page ─────────────────────────────────────────────────────────────
    work: {
      heading: "Trabajo",
      viewOnGitHub: "Ver en GitHub",
      items: [
        {
          company: "Fluid",
          role: "Desarrollador Full Stack",
          period: "Ene 2025 – Presente",
          description:
            "Plataforma SaaS multi-tenant white-label con 250k+ usuarios activos en empresas de MLM y ventas directas, construida en 5 servicios.",
          bullets: [
            "250.000+ usuarios activos en ASEA, Thermomix, Pawtree y más",
            "5 servicios: backend Rails, middleware, panel Next.js, checkout y app React Native",
            "28+ apps iOS y Android con marca propia vía React Native/Expo",
            "Consultas complejas en PostgreSQL, jobs Sidekiq y caché con Redis a escala",
          ],
        },
        {
          company: "TrexaHR",
          role: "Desarrollador Full Stack",
          period: "Jul 2024 – Ene 2025",
          description:
            "Plataforma de gestión de RRHH para evaluación de empleados, encuestas y generación de feedback, construida full-stack desde cero.",
          bullets: [
            "Diseñé el esquema de base de datos completo y la API RESTful",
            "Construí controladores, vistas y servicios desde cero",
            "Testing con comportamiento dirigido usando RSpec",
            "Resolución de incidencias de clientes y mantenimiento de calidad en producción",
          ],
        },
        {
          company: "CropHero",
          role: "Desarrollador Full Stack",
          period: "Abr 2024 – Jun 2024",
          description:
            "Aplicación de gestión de campos para registrar datos agrícolas y generar reportes que apoyen la toma de decisiones.",
          bullets: [
            "Construcción de frontend y backend desde cero",
            "Diseño del esquema de base de datos para datos agrícolas",
            "Endpoints RESTful con administración completa de la base de datos",
            "Testing con comportamiento dirigido usando RSpec",
          ],
        },
      ],
    },

    // ── Skills page ───────────────────────────────────────────────────────────
    skills: {
      heading: "Skills",
      categories: {
        languages: "Lenguajes",
        frontend: "Frontend",
        backend: "Backend & Bases de Datos",
        tools: "Herramientas",
      },
    },

    // ── Education page ────────────────────────────────────────────────────────
    education: {
      heading: "Educación",
      degree: "Ciencias de la Computación",
      gpaLabel: "Promedio",
      gpaRank: "4° promedio más alto de la facultad",
      honorsLabel: "Honores y Reconocimientos",
      honors: ["Primera Escolta de la Bandera", "Distinción a la Excelencia Académica"],
      description:
        "Cursando Licenciatura en Ciencias de la Computación con foco en ingeniería de software y sistemas distribuidos. Consistentemente entre los mejores estudiantes del año.",
    },

    // ── About page ────────────────────────────────────────────────────────────
    about: {
      heading: "Sobre mí",
      intro: [
        "¡Hola! Soy Axel — Desarrollador Full Stack radicado en Córdoba, Argentina, actualmente trabajando en Fluid, una plataforma con 250k+ usuarios. Me encanta trabajar en todo el stack: desde crear interfaces fluidas hasta diseñar sistemas backend escalables.",
        "Estudio Ciencias de la Computación en la UNRC donde tengo un promedio de 9.63/10 y fui reconocido como Primera Escolta de la Bandera — distinción académica otorgada al mejor estudiante de la facultad.",
        "Cuando no estoy programando, me gusta salir a caminar con mi perro Simba, jugar videojuegos como Minecraft con amigos (me divierto construyendo edificios de estilo romano), pasar tiempo con mi novia, ir al gimnasio y jugar algo de Valorant.",
      ],
      workStyleLabel: "Forma de Trabajo",
      traits: [
        {
          label: "Builder",
          desc: "Me encanta convertir ideas en productos reales que funcionen. Si puedo shipiarlo, lo hago.",
        },
        {
          label: "Problem Solver",
          desc: "¿Desafíos de diseño de sistemas complejos? Me apasiona encontrar la solución elegante.",
        },
        {
          label: "Lifelong Learner",
          desc: "Siempre aprendiendo un nuevo framework, lenguaje o modelo mental. La curiosidad es una feature.",
        },
        {
          label: "Team Player",
          desc: "Creo que los mejores productos los construyen equipos que se comunican bien y confían entre sí.",
        },
      ],
      ctaHeading: "¿Querés construir algo juntos?",
      ctaSubtext: "Estoy abierto a nuevas oportunidades y siempre con ganas de charlar.",
      ctaButton: "Escribime",
    },
  },
} as const

export type Translations = typeof t.en
