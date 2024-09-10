import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}", // Here!
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      gridTemplateColumns: {
        gallery: "repeat(3, minmax(200px, 1fr))",
      },
      backgroundImage: {
        "footer-texture": "url('/brush.svg')",
      },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 1.6s forwards",
        fadeOut: "fadeOut 1.6s forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addBase, theme }) {
      addBase({
        ".quill-content .ql-size-normal": {
          fontSize: theme("fontSize.2xl"),
          fontWeight: theme("fontWeight.bold"),
        },
        ".quill-content .ql-size-large": {
          fontSize: theme("fontSize.xl"),
          fontWeight: theme("fontWeight.semibold"),
        },
        ".quill-content .ql-size-huge": {
          fontSize: theme("fontSize.lg"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".quill-content a": {
          color: theme("colors.blue.500"),
          textDecoration: "underline",
        },
        ".quill-content ul": {
          listStyleType: "disc",
          paddingLeft: theme("spacing.5"),
        },
        ".quill-content ol": {
          listStyleType: "decimal",
          paddingLeft: theme("spacing.5"),
        },
        ".quill-content blockquote": {
          fontStyle: "italic",
          borderLeftWidth: theme("borderWidth.4"),
          borderLeftColor: theme("colors.gray.300"),
          paddingLeft: theme("spacing.4"),
          color: theme("colors.gray.700"),
        },
        ".quill-content img": {
          maxWidth: "100%",
          height: "auto",
        },
        ".quill-content code": {
          fontFamily: theme("fontFamily.mono"),
          backgroundColor: theme("colors.gray.100"),
          padding: theme("spacing.1"),
          borderRadius: theme("borderRadius.sm"),
        },
        ".quill-content pre": {
          fontFamily: theme("fontFamily.mono"),
          backgroundColor: theme("colors.gray.900"),
          color: theme("colors.white"),
          padding: theme("spacing.4"),
          borderRadius: theme("borderRadius.lg"),
          overflowX: "auto",
        },
        ".quill-content .ql-align-justify": {
          textAlign: "justify",
        },
        ".quill-content .ql-align-center": {
          textAlign: "center",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
