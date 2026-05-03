import type { Metadata } from "next";
import "./globals.css";
import { NavPopup } from "@/components/NavPopup";

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
      <body className="min-h-full flex flex-col relative">
        <div className="mountain-scroll pointer-events-none fixed bottom-0 left-0 right-0 h-[300px] z-0" />
        <header className="bg-cl-blue text-white px-8 py-6">
          <div className="mx-auto max-w-6xl flex items-center justify-between">
            <a href="/" className="flex items-center gap-5 hover:opacity-80">
              <img src="/logo.svg" alt="Logo" className="h-20 w-20" />
              <span className="font-ruta text-3xl font-bold">Somos el Mejor País de Chile</span>
            </a>
            <NavPopup />
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
