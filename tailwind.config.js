/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        void: {
          950: "#05020D",
          900: "#0B0618",
          800: "#1A0B2E",
          700: "#241238",
          600: "#33194D",
        },
        neon: {
          magenta: "#FF0099",
          cyan: "#00E5FF",
        },
        border: "hsl(263 45% 22%)",
        background: "hsl(258 65% 4%)",
        foreground: "hsl(264 30% 95%)",
        primary: { DEFAULT: "#FF0099", foreground: "#ffffff" },
        secondary: { DEFAULT: "#00E5FF", foreground: "#05020D" },
        muted: { DEFAULT: "hsl(263 30% 12%)", foreground: "hsl(260 15% 65%)" },
        accent: { DEFAULT: "hsl(263 40% 18%)", foreground: "hsl(264 30% 95%)" },
        card: { DEFAULT: "hsl(260 45% 7%)", foreground: "hsl(264 30% 95%)" },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "celestial-gradient":
          "linear-gradient(135deg, #1A0B2E 0%, #2b0f45 45%, #FF0099 130%)",
        "neon-gradient": "linear-gradient(90deg, #00E5FF 0%, #FF0099 100%)",
        "text-neon": "linear-gradient(92deg, #00E5FF 10%, #ffffff 45%, #FF0099 90%)",
      },
      boxShadow: {
        glow: "0 0 24px rgba(255, 0, 153, 0.35), 0 0 64px rgba(0, 229, 255, 0.12)",
        "glow-cyan": "0 0 20px rgba(0, 229, 255, 0.35)",
        "glow-magenta": "0 0 20px rgba(255, 0, 153, 0.4)",
        "inner-glow": "inset 0 0 32px rgba(0, 229, 255, 0.06)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -3%, 0) scale(1.08)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "300% 0" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "70%": { transform: "translateY(10px)", opacity: "0.2" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.9s ease both",
        float: "float 7s ease-in-out infinite",
        drift: "drift 26s ease-in-out infinite alternate",
        "spin-slow": "spin-slow 40s linear infinite",
        "spin-slower": "spin-slow 90s linear infinite reverse",
        twinkle: "twinkle 4s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "border-flow": "border-flow 6s linear infinite",
        "scroll-hint": "scroll-hint 2.2s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
      },
      transitionTimingFunction: {
        celestial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
