/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      // Map Figma CSS tokens to Tailwind theme values using CSS variables.
      colors: {
        /* Figma token surface / semantic colors (refer to your globals.css) */
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--color-primary, var(--primary))", // fallback if color- names not set
        "primary-foreground": "var(--color-primary-foreground, var(--primary-foreground))",
        secondary: "var(--color-secondary)",
        "secondary-foreground": "var(--color-secondary-foreground)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",
        accent: "var(--color-accent)",
        "accent-foreground": "var(--color-accent-foreground)",
        destructive: "var(--color-destructive)",
        "destructive-foreground": "var(--color-destructive-foreground)",
        border: "var(--color-border)",
        input: "var(--color-input)",
        "input-background": "var(--color-input-background)",
        ring: "var(--color-ring)",

        /* Chart / accent palette from tokens */
        "chart-1": "var(--color-chart-1)",
        "chart-2": "var(--color-chart-2)",
        "chart-3": "var(--color-chart-3)",
        "chart-4": "var(--color-chart-4)",
        "chart-5": "var(--color-chart-5)",

        /* Sidebar tokens */
        sidebar: "var(--color-sidebar)",
        "sidebar-foreground": "var(--color-sidebar-foreground)",
        "sidebar-primary": "var(--color-sidebar-primary)",
        "sidebar-accent": "var(--color-sidebar-accent)",
        "sidebar-border": "var(--color-sidebar-border)",

        /* Keep your existing named brand colors for convenience */
        cpeBlack: "#0b0b0b",
        cpeRed: "#d90429",
        cpeOrange: "#ff6b00",
        cpeWhite: "#ffffff",
      },

      // Provide intuitive aliases for the primary brand colors that your components already use.
      backgroundColor: (theme) => ({
        ...theme("colors"),
        cpeRed: "var(--primary)",
        cpeOrange: "var(--secondary)",
      }),

      // Border color default uses the token
      borderColor: {
        DEFAULT: "var(--color-border)",
      },

      // Font sizes can be driven by CSS variables if you set them in globals.css (optional).
      fontSize: {
        // Fallbacks to sensible rem values if CSS vars not present
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["var(--text-base, 1rem)", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
      },

      // Font families preserved from your config; keep Display + Body
      fontFamily: {
        display: ["Oswald", "Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },

      // Border radius mapped to token variables (from Figma)
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },

      // Ring color (focus) from token
      ringColor: {
        DEFAULT: "var(--color-ring)",
      },

      // boxShadow: keep your existing glows and add token-driven shadow helpers
      boxShadow: {
        "glow-red": "0 8px 40px rgba(217,4,41,0.18)",
        "glow-orange": "0 8px 40px rgba(255,107,0,0.12)",
        "token-card": "0 6px 24px rgba(0,0,0,0.45)",
      },

      // Keep your existing keyframes + animation
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
