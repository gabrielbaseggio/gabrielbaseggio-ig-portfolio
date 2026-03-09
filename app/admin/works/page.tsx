import { readPortfolio } from "@/lib/adminData"
import WorksForm from "./WorksForm"

export default async function AdminWorksPage() {
  const { works } = await readPortfolio()
  return <WorksForm initialData={works} />
}
