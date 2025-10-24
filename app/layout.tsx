// app/layout.tsx
import "./globals.css";
import type { PropsWithChildren } from "react";

export const metadata = {
  title: "CpE Fair 2024: The Grand Prix",
  description: "Event registration & dashboard — CpE Fair 2024",
};

export default function RootLayout({ children }: PropsWithChildren) {
  // ----- Paste-ready SVG (your "A & Gear - White" logo) -----
  // This SVG was minified/cleaned and embedded directly so browsers will load it instantly.
  const svgIcon = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="3300" height="3300" viewBox="0 0 3300 3300" preserveAspectRatio="xMidYMid meet"><g transform="translate(0,3300) scale(0.1,-0.1)" fill="#ffffff" stroke="none"><path d="M16515 32791 c-40 -5 -135 -25 -210 -45 -75 -19 -216 -55 -315 -79 -100 -25 -231 -60 -292 -78 -61 -19 -201 -55 -311 -81 -110 -26 -232 -57 -270 -70 -38 -13 -95 -32 -128 -42 -33 -10 -90 -28 -128 -40 -38 -12 -93 -29 -123 -36 -30 -7 -82 -20 -115 -28 -33 -8 -92 -22 -130 -31 -38 -9 -110 -27 -160 -40 -50 -13 -120 -30 -156 -37 -36 -8 -103 -23 -150 -33 -47 -10 -119 -28 -160 -40 -41 -12 -122 -36 -180 -54 -58 -18 -150 -44 -205 -58 -55 -14 -153 -39 -218 -56 -65 -17 -153 -40 -195 -51 -42 -11 -120 -32 -173 -46 -53 -14 -141 -38 -195 -54 -54 -16 -135 -40 -180 -54 -45 -14 -126 -39 -180 -56 -54 -17 -127 -40 -162 -52 -35 -12 -106 -35 -158 -51 -52 -16 -141 -43 -198 -61 -57 -18 -149 -46 -204 -61 -55 -16 -148 -43 -205 -60 -57 -17 -145 -44 -195 -60 -50 -16 -137 -44 -193 -61 -56 -17 -132 -41 -170 -53 -38 -12 -105 -35 -150 -50 -45 -15 -122 -39 -170 -53 -48 -14 -131 -38 -185 -53 -54 -15 -140 -40 -192 -55 -52 -15 -138 -40 -192 -55 -54 -15 -137 -39 -185 -52 -48 -13 -121 -34 -162 -47 -41 -13 -111 -36 -155 -51 -44 -15 -116 -38 -160 -52 -44 -14 -112 -36 -150 -50 -38 -14 -104 -36 -146 -50 -42 -14 -119 -38 -170 -54 -51 -16 -137 -43 -192 -60 -55 -17 -140 -43 -190 -58 -50 -15 -125 -39 -167 -54 -42 -15 -112 -38 -155 -51 -43 -13 -110 -35 -150 -50 -40 -15 -106 -36 -148 -51 -42 -15 -114 -36 -160 -49 -46 -13 -121 -34 -167 -46 -46 -12 -122 -31 -170 -42 -48 -11 -117 -30 -153 -42 -36 -12 -105 -31 -154 -42 -49 -11 -122 -31 -162 -45 -40 -14 -107 -34 -150 -45 -43 -11 -113 -31 -155 -44 -42 -13 -110 -33 -150 -45 -40 -12 -118 -33 -173 -50 -55 -17 -134 -41 -175 -53 -41 -12 -113 -34 -160 -48 -47 -14 -116 -36 -153 -50 -37 -14 -106 -36 -152 -50 -46 -14 -114 -34 -152 -45 -38 -11 -114 -31 -170 -48 -56 -17 -129 -38 -162 -47 -33 -9 -101 -27 -150 -40 -49 -13 -121 -34 -160 -46 -39 -12 -114 -33 -168 -50 -54 -17 -126 -39 -160 -50 -34 -11 -103 -31 -153 -45 -50 -14 -123 -36 -162 -50 -39 -14 -114 -36 -167 -50 -53 -14 -156 -42 -227 -62 -71 -20 -153 -44 -182 -53 -29 -9 -93 -27 -141 -40 -48 -13 -129 -34 -180 -47 -51 -13 -127 -34 -170 -46 -43 -12 -123 -33 -178 -47 -55 -14 -134 -36 -178 -50 -44 -14 -117 -36 -162 -50 -45 -14 -116 -34 -158 -45 -42 -11 -121 -33 -175 -49 -54 -16 -130 -38 -170 -50 -40 -12 -115 -33 -170 -49 -55 -16 -141 -41 -190 -57 -49 -16 -131 -39 -182 -52 -51 -13 -128 -34 -170 -45 -42 -11 -115 -31 -162 -44 -47 -13 -127 -35 -178 -48 -51 -13 -127 -34 -170 -47 -43 -13 -119 -34 -170 -47 -51 -13 -139 -35 -195 -49 -56 -14 -140 -35 -185 -47 -45 -12 -126 -32 -180 -46 -54 -14 -146 -38 -205 -57 -59 -19 -147 -43 -195 -58 -48 -15 -124 -34 -170 -46 -46 -12 -117 -34 -158 -47 -41 -13 -110 -33 -150 -44 -40 -11 -111 -31 -158 -45 -47 -14 -122 -34 -170 -48 -48 -14 -129 -34 -190 -50"/></g></svg>`;

  return (
    <html lang="en">
      <head>
        {/* Inline SVG favicon (data URI) - forces immediate use by browser */}
        <link rel="icon" href={"data:image/svg+xml;utf8," + encodeURIComponent(svgIcon)} />
        <meta name="theme-color" content="#0b0b0b" />
      </head>

      <body className="antialiased">
        {/* Top racing stripe */}
        <div style={{ height: 6, background: "linear-gradient(90deg,#d90429,#ff6b00)" }} />

        <header className="py-4">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cpeRed to-cpeOrange flex items-center justify-center font-bold text-black">
                GP
              </div>
              <div>
                <div className="text-sm font-semibold">CpE Fair 2024</div>
                <div className="text-xs text-white/60">The Grand Prix</div>
              </div>
            </div>

            <nav className="hidden md:flex gap-4 items-center">
              <a className="text-sm text-white/80">Events</a>
              <a className="text-sm text-white/80">Register</a>
              <a href="/dashboard" className="text-sm px-3 py-2 rounded-md bg-white/6">
                Dashboard
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="py-8 mt-12 border-t border-white/6">
          <div className="container text-center text-white/70">© CpE Fair 2024 — The Grand Prix · Built with passion</div>
        </footer>
      </body>
    </html>
  );
}
