import { readPortfolio } from "@/lib/adminData"
import ProfileForm from "./ProfileForm"

export default async function AdminProfilePage() {
  const { profile } = await readPortfolio()
  return <ProfileForm initialData={profile} />
}
