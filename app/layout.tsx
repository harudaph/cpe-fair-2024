import "./globals.css";
import type { PropsWithChildren } from "react";

export const metadata = {
  title: "CpE Fair 2024: The Grand Prix",
  description: "Event registration & dashboard — CpE Fair 2024",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Top racing stripe */}
        <div style={{ height: 6, background: "linear-gradient(90deg,#d90429,#ff6b00)" }} />

        <header className="py-4">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cpeRed to-cpeOrange flex items-center justify-center font-bold text-black">GP</div>
              <div>
                <div className="text-sm font-semibold">CpE Fair 2024</div>
                <div className="text-xs text-white/60">The Grand Prix</div>
              </div>
            </div>

            <nav className="hidden md:flex gap-4 items-center">
              <a className="text-sm text-white/80">Events</a>
              <a className="text-sm text-white/80">Register</a>
              <a href="/dashboard" className="text-sm px-3 py-2 rounded-md bg-white/6">Dashboard</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="py-8 mt-12 border-t border-white/6">
          <div className="container text-center text-white/70">
            © CpE Fair 2024 — The Grand Prix · Built with passion
          </div>
        </footer>
      </body>
    </html>
  );
}
