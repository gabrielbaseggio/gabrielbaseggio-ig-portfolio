import { readPortfolio } from "@/lib/adminData"
import HighlightsForm from "./HighlightsForm"

export default async function AdminHighlightsPage() {
  const { highlights } = await readPortfolio()
  return <HighlightsForm initialData={highlights} />
}
