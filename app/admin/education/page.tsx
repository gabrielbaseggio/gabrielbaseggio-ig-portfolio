import { readPortfolio } from "@/lib/adminData"
import EducationForm from "./EducationForm"

export default async function AdminEducationPage() {
  const { education } = await readPortfolio()
  return <EducationForm initialData={education} />
}
