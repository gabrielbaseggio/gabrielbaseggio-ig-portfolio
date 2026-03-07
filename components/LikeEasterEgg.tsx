"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

const EMAIL = "baseggioaxel@gmail.com"
const SUBJECT = "I liked your profile, Axel!"
const BODY =
  "Hi Axel,\n\nI came across your portfolio and would love to connect.\n\nBest,"

export default function LikeEasterEgg() {
  const [visible, setVisible] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0 && scrolled / total > 0.55) {
        setVisible(true)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLike = () => {
    if (liked) return
    setLiked(true)
    setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`
    }, 900)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-[64px] left-0 right-0 flex justify-center z-40 px-4 pointer-events-none"
        >
          <div className="max-w-[480px] w-full pointer-events-auto">
            <div className="bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 flex items-center justify-between shadow-xl shadow-black/60">
              <p className="text-neutral-300 text-sm leading-snug">
                Liked my profile?{" "}
                <span className="text-neutral-500">Hit like! →</span>
              </p>
              <motion.button
                onClick={handleLike}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 transition-colors px-3 py-1.5 rounded-lg text-sm font-medium ml-3 shrink-0"
                aria-label="Like profile"
              >
                <motion.div
                  animate={liked ? { scale: [1, 1.6, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Heart
                    size={16}
                    className={`transition-all duration-300 ${
                      liked ? "fill-red-500 text-red-500" : "text-white"
                    }`}
                  />
                </motion.div>
                <span className="text-white">Like</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
