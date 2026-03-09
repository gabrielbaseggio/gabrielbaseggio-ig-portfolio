"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import type { Post, PostType } from "@/lib/types"

const POST_TYPES: PostType[] = ["work", "skills", "education"]

const EMPTY_POST: Post = {
  id: "",
  type: "work",
  title: "",
  subtitle: "",
  detail: "",
  href: "/work",
}

function Cell({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-2 py-1.5 rounded-md text-xs text-white outline-none"
      style={{ border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }}
    />
  )
}

export default function PostsForm({ initialData }: { initialData: Post[] }) {
  const [posts, setPosts] = useState(initialData)
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  function update(i: number, field: keyof Post, value: string) {
    setPosts((prev) => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p))
  }

  function addPost() {
    setPosts((prev) => [...prev, { ...EMPTY_POST, id: `post-${Date.now()}` }])
  }

  function removePost(i: number) {
    setPosts((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function handleSave() {
    setStatus("saving")
    const res = await fetch("/api/admin/data/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    })
    setStatus(res.ok ? "saved" : "error")
    setTimeout(() => setStatus("idle"), 2000)
  }

  const statusLabel = { idle: "Save", saving: "Saving…", saved: "Saved", error: "Error" }[status]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-semibold text-base">Posts</h1>
        <div className="flex gap-2">
          <button
            onClick={addPost}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            style={{ backgroundColor: "var(--s4)", border: "1px solid var(--s6)" }}
          >
            <Plus size={13} strokeWidth={2} /> Add
          </button>
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-black transition-opacity"
            style={{
              backgroundColor: status === "error" ? "#ef4444" : "var(--gold)",
              opacity: status === "saving" ? 0.6 : 1,
            }}
          >
            {statusLabel}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <table className="w-full text-xs min-w-[600px]">
          <thead>
            <tr className="text-neutral-500 text-left">
              {["ID", "Type", "Title", "Subtitle", "Detail", "Href", ""].map((h) => (
                <th key={h} className="pb-2 pr-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="space-y-1">
            {posts.map((post, i) => (
              <tr key={post.id} className="align-top">
                <td className="pr-2 pb-2">
                  <Cell value={post.id} onChange={(v) => update(i, "id", v)} placeholder="id" />
                </td>
                <td className="pr-2 pb-2">
                  <select
                    value={post.type}
                    onChange={(e) => update(i, "type", e.target.value)}
                    className="px-2 py-1.5 rounded-md text-xs text-white outline-none"
                    style={{ border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }}
                  >
                    {POST_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </td>
                <td className="pr-2 pb-2">
                  <Cell value={post.title} onChange={(v) => update(i, "title", v)} placeholder="Title" />
                </td>
                <td className="pr-2 pb-2">
                  <Cell value={post.subtitle} onChange={(v) => update(i, "subtitle", v)} placeholder="Subtitle" />
                </td>
                <td className="pr-2 pb-2">
                  <Cell value={post.detail ?? ""} onChange={(v) => update(i, "detail", v)} placeholder="Detail" />
                </td>
                <td className="pr-2 pb-2">
                  <Cell value={post.href} onChange={(v) => update(i, "href", v)} placeholder="/work" />
                </td>
                <td className="pb-2">
                  <button
                    onClick={() => removePost(i)}
                    className="text-neutral-600 hover:text-red-400 transition-colors mt-1.5"
                  >
                    <Trash2 size={13} strokeWidth={1.75} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
