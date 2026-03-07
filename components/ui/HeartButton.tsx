"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface HeartButtonProps {
  onClick?: () => void
  liked?: boolean
  label?: string
  className?: string
}

export default function HeartButton({
  onClick,
  liked = false,
  label,
  className = "",
}: HeartButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      className={`flex items-center justify-center gap-2 py-1.5 px-4 rounded-lg bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 transition-colors ${className}`}
    >
      <motion.div
        animate={liked ? { scale: [1, 1.5, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Heart
          size={16}
          className={`transition-all duration-300 ${
            liked ? "fill-red-500 text-red-500" : "text-white"
          }`}
        />
      </motion.div>
      {label && <span>{label}</span>}
    </motion.button>
  )
}
