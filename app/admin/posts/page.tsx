import { readPortfolio } from "@/lib/adminData"
import PostsForm from "./PostsForm"

export default async function AdminPostsPage() {
  const { posts } = await readPortfolio()
  return <PostsForm initialData={posts} />
}
