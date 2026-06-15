/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        matte: {
          DEFAULT: "#14241F",
          deep:    "#0A1710",
          mid:     "#1C302A",
          light:   "#243C34",
          surface: "#1A2D27",
          border:  "rgba(255,255,255,0.06)",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light:   "#E8C96A",
          dark:    "#A07830",
          glow:    "rgba(201,168,76,0.18)",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans:    ["'Inter'", "ui-sans-serif", "system-ui"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)",
        "radial-gold":  "radial-gradient(ellipse at center,rgba(201,168,76,0.15) 0%,transparent 70%)",
        "hero-glow":    "radial-gradient(ellipse 80% 50% at 50% -10%,rgba(201,168,76,0.12) 0%,transparent 60%)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
      keyframes: {
        "float-slow": { "0%,100%": { transform: "translateY(0px) rotate(0deg)" }, "50%": { transform: "translateY(-20px) rotate(3deg)" } },
        "pulse-glow": { "0%,100%": { opacity: "0.4" }, "50%": { opacity: "1" } },
        "line-slide":  { "0%": { transform: "scaleX(0)" }, "100%": { transform: "scaleX(1)" } },
        "ticker":      { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "spin-slow":   { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        "count-up":    { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "float-slow":  "float-slow 8s ease-in-out infinite",
        "pulse-glow":  "pulse-glow 3s ease-in-out infinite",
        "line-slide":  "line-slide 1s ease forwards",
        "ticker":      "ticker 28s linear infinite",
        "spin-slow":   "spin-slow 18s linear infinite",
        "count-up":    "count-up 0.6s ease forwards",
      },
      boxShadow: {
        glow:      "0 0 60px rgba(201,168,76,0.2)",
        "glow-sm": "0 0 30px rgba(201,168,76,0.12)",
        card:      "0 8px 40px rgba(0,0,0,0.5)",
        panel:     "inset 0 1px 0 rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};
