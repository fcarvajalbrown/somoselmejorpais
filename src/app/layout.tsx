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
        <header className="bg-cl-blue text-white px-6 py-4">
          <div className="mx-auto max-w-6xl flex items-center justify-between">
            <a href="/" className="font-ruta text-xl font-bold hover:opacity-80">
              Somos el Mejor País de Chile
            </a>
            <nav className="flex gap-6 text-sm font-semibold">
              <a href="/" className="hover:opacity-80">Rankings</a>
              <a href="/feed" className="hover:opacity-80">Caos Cultural</a>
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
