import { readPortfolio } from "@/lib/adminData"
import SkillsForm from "./SkillsForm"

export default async function AdminSkillsPage() {
  const { skills, skillCards } = await readPortfolio()
  return <SkillsForm initialSkills={skills} initialCards={skillCards} />
}
