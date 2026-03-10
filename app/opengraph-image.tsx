import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Axel Baseggio — Full Stack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f0f0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px 100px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top-right decorative dots */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 100,
            display: "flex",
            gap: 10,
          }}
        >
          {["#FFDC80", "#444", "#444"].map((color, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: color,
              }}
            />
          ))}
        </div>

        {/* Gold accent bar */}
        <div
          style={{
            width: 56,
            height: 4,
            background: "#FFDC80",
            borderRadius: 2,
            marginBottom: 48,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#F0F0F0",
            lineHeight: 1.05,
            letterSpacing: "-1px",
            marginBottom: 20,
          }}
        >
          Axel Baseggio
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 38,
            color: "#FFDC80",
            marginBottom: 28,
            letterSpacing: "0.5px",
          }}
        >
          Full Stack Developer
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#666",
            letterSpacing: "0.2px",
          }}
        >
          CS @ UNRC · Building scalable products that matter.
        </div>

        {/* Bottom-right tag */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 100,
            fontSize: 18,
            color: "#333",
            letterSpacing: "1px",
          }}
        >
          axelbaseggio.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
