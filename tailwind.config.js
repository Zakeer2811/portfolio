/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/React files in src
  ],
  theme: {
    extend: {
      keyframes: {
        slideInFromBottom: {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        shimmerBorder: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        floatingParticles: {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px) scale(1)",
            opacity: "0",
          },
          "20%": { opacity: "1" },
          "50%": {
            transform: "translateY(-20px) translateX(10px) scale(1.2)",
          },
          "80%": { opacity: "1" },
        },
        morphIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.8)",
            "border-radius": "50%",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
            "border-radius": "25%",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
            "border-radius": "1rem",
          },
        },
        countUp: {
          "0%": {
            transform: "scale(0.5) rotateX(90deg)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.1) rotateX(0deg)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1) rotateX(0deg)",
            opacity: "1",
          },
        },
        slideInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        iconBreathe: {
          "0%, 100%": {
            transform: "scale(1.3) rotateY(10deg)",
          },
          "50%": {
            transform: "scale(1.4) rotateY(-5deg)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.3",
            transform: "scale(1.8)",
          },
          "50%": {
            opacity: "0.6",
            transform: "scale(2.2)",
          },
        },
        expandWidth: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "bounce-rotate": {
          "0%, 20%, 50%, 80%, 100%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "40%": {
            transform: "translateY(-6px) rotate(10deg)",
          },
          "60%": {
            transform: "translateY(-3px) rotate(-5deg)",
          },
        },
        "bubble-trail": {
          "0%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.2)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(0) translateY(-10px)",
          },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        drawCircle: {
          "0%": { "stroke-dasharray": "0 283" },
          "100%": { "stroke-dasharray": "228 283" },
        },
        textGlow: {
          "0%": {
            filter: "drop-shadow(0 0 15px currentColor) brightness(1)",
          },
          "100%": {
            filter: "drop-shadow(0 0 25px currentColor) brightness(1.2)",
          },
        },
      },
      animation: {
        slideInFromBottom: "slideInFromBottom 0.5s ease-out forwards",
        shimmerBorder: "shimmerBorder 1.5s ease-in-out infinite",
        floatingParticles: "floatingParticles 3s ease-in-out infinite",
        morphIn: "morphIn 0.5s ease-out forwards",
        countUp: "countUp 0.8s ease-out",
        slideInUp: "slideInUp 0.5s ease-out 0.3s both",
        iconBreathe: "iconBreathe 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 1.5s ease-in-out infinite",
        expandWidth: "expandWidth 0.8s ease-out",
        "bounce-rotate": "bounce-rotate 1s ease-in-out infinite",
        "bubble-trail": "bubble-trail 3s ease-in-out infinite",
        "spin-slow": "spin-slow 4s linear infinite",
        drawCircle: "drawCircle 1s ease-out forwards",
        textGlow: "textGlow 1s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
