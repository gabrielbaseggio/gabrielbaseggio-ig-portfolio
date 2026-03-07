import {
  siTypescript,
  siJavascript,
  siPython,
  siRuby,
  siHaskell,
  siReact,
  siNextdotjs,
  siHtml5,
  siCss,
  siRubyonrails,
  siNodedotjs,
  siSidekiq,
  siPostgresql,
  siRedis,
  siGit,
  siGithub,
  siDocker,
  siGooglecloud,
} from "simple-icons"
import { Code2, Database, Zap, Layers, type LucideIcon } from "lucide-react"

export type TechIcon =
  | { type: "si"; path: string; color: string }
  | { type: "lucide"; icon: LucideIcon; color: string }

export const techIconMap: Record<string, TechIcon> = {
  TypeScript:       { type: "si", path: siTypescript.path,   color: "#3178C6" },
  JavaScript:       { type: "si", path: siJavascript.path,   color: "#F7DF1E" },
  Python:           { type: "si", path: siPython.path,        color: "#3776AB" },
  Ruby:             { type: "si", path: siRuby.path,          color: "#CC342D" },
  Java:             { type: "lucide", icon: Code2,            color: "#ED8B00" },
  "C/C++":          { type: "lucide", icon: Code2,            color: "#A8B9CC" },
  Haskell:          { type: "si", path: siHaskell.path,       color: "#5D4F85" },
  React:            { type: "si", path: siReact.path,         color: "#61DAFB" },
  "Next.js":        { type: "si", path: siNextdotjs.path,     color: "#FFFFFF" },
  "React Native":   { type: "si", path: siReact.path,         color: "#61DAFB" },
  Stimulus:         { type: "lucide", icon: Zap,              color: "#FFDC80" },
  "Turbo Frames":   { type: "lucide", icon: Layers,           color: "#FFDC80" },
  HTML:             { type: "si", path: siHtml5.path,         color: "#E34F26" },
  CSS:              { type: "si", path: siCss.path,           color: "#1572B6" },
  "Ruby on Rails":  { type: "si", path: siRubyonrails.path,  color: "#CC0000" },
  "Node.js":        { type: "si", path: siNodedotjs.path,     color: "#5FA04E" },
  Sidekiq:          { type: "si", path: siSidekiq.path,       color: "#B1003E" },
  PostgreSQL:       { type: "si", path: siPostgresql.path,    color: "#4169E1" },
  Redis:            { type: "si", path: siRedis.path,         color: "#FF4438" },
  SQL:              { type: "lucide", icon: Database,         color: "#8A9BB0" },
  Git:              { type: "si", path: siGit.path,           color: "#F05032" },
  GitHub:           { type: "si", path: siGithub.path,        color: "#FFFFFF" },
  Docker:           { type: "si", path: siDocker.path,        color: "#2496ED" },
  GCP:              { type: "si", path: siGooglecloud.path,   color: "#4285F4" },
}
