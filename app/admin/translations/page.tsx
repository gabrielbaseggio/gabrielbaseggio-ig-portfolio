import { readTranslations } from "@/lib/adminData"
import TranslationsForm from "./TranslationsForm"

export default async function AdminTranslationsPage() {
  const translations = await readTranslations()
  return <TranslationsForm initialData={translations} />
}
