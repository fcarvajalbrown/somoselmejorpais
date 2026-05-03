import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Somos el Mejor País de Chile",
  description: "Independiente si es bueno o no, somos los primeros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header className="bg-cl-blue text-white px-8 py-6">
          <div className="mx-auto max-w-6xl flex items-center justify-between">
            <a href="/" className="flex items-center gap-5 hover:opacity-80">
              <img src="/logo.svg" alt="Logo" className="h-20 w-20" />
              <span className="font-ruta text-3xl font-bold">Somos el Mejor País de Chile</span>
            </a>
            <nav className="flex gap-6 text-sm font-semibold">
              <a href="/" className="hover:opacity-80">Rankings</a>
              <div className="relative group">
                <a href="/feed" className="hover:opacity-80">Caos Cultural</a>
                <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-lg bg-cl-red px-3 py-1.5 text-xs font-normal normal-case tracking-normal text-white opacity-0 transition-opacity group-hover:opacity-100">
                  presiona para deprimirte de Chile
                </span>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-cl-red text-white px-6 py-3 text-sm text-center">
          Felipe Carvajal Brown
        </footer>
      </body>
    </html>
  );
}
