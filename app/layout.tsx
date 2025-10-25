// app/layout.tsx
import "./globals.css";
import type { PropsWithChildren } from "react";

export const metadata = {
  title: "CpE Fair 2024: The Grand Prix",
  description: "Event registration & dashboard — CpE Fair 2024",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", rel: "apple-touch-icon" }],
  },
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground">
        {/* Top racing stripe */}
        <div
          aria-hidden
          style={{ height: 6, background: "linear-gradient(90deg,#d90429,#ff6b00)" }}
        />

        <header className="py-4">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cpeRed to-cpeOrange flex items-center justify-center font-bold text-black">
                GP
              </div>

              <div>
                <div className="text-sm font-semibold">CpE Fair 2024</div>
                <div className="text-xs text-[color:var(--muted-foreground)]">The Grand Prix</div>
              </div>
            </div>

            <nav className="hidden md:flex gap-4 items-center" aria-label="Primary">
              <a href="#events" className="text-sm text-[color:var(--foreground)]/80">
                Events
              </a>
              <a href="#register" className="text-sm text-[color:var(--foreground)]/80">
                Register
              </a>
              <a
                href="/dashboard"
                className="text-sm px-3 py-2 rounded-md bg-[rgba(255,255,255,0.06)]"
              >
                Dashboard
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="py-8 mt-12 border-t border-[rgba(255,255,255,0.06)]">
          <div className="container mx-auto px-6 text-center text-[color:var(--muted-foreground)]">
            © CpE Fair 2024 — The Grand Prix · Built with passion
          </div>
        </footer>
      </body>
    </html>
  );
}
