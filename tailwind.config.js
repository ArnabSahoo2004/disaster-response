/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'safe-route': '#2563eb',
        'first-aid': '#dc2626',
        'resources': '#16a34a',
        'community': '#9333ea',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulse-slow": {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        },
        "pulse-border": {
          '0%, 100%': { borderColor: 'rgb(239 68 68 / 0.5)' },
          '50%': { borderColor: 'rgb(239 68 68 / 0.9)' },
        },
        "alert-bounce": {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        "glow": {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.6,
            transform: 'scale(1.05)',
          },
        },
        "icon-bounce": {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
          },
          '50%': {
            transform: 'translateY(-5px) scale(1.05)',
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
        "pulse-border": "pulse-border 2s ease-in-out infinite",
        "alert-bounce": "alert-bounce 2s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
        "icon-bounce": "icon-bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
} 