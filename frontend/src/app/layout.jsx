import Link from "next/link";

export default function PinoteLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-amber-100 p-4 border-b-2 border-amber-200">
            <h1 className="text-3xl font-bold text-amber-800">Pinote🥜📝</h1>
            <nav>
              <ul
                className="flex gap-4 mt-2"
                style={{
                  display: "flex",
                  listStyle: "none",
                  gap: "1rem",
                  padding: 0,
                  margin: "1rem 0",
                }}
              >
                <li>
                  <Link href="/" className="text-amber-600 hover:underline">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/user" className="text-amber-600 hover:underline">
                    Usuario
                  </Link>
                </li>
                <li>
                  <Link
                    href="/notes"
                    className="text-amber-600 hover:underline"
                  >
                    Notas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-amber-600 hover:underline"
                  >
                    Sobre Pinote
                  </Link>
                </li>
              </ul>
            </nav>
          </header>

          <main className="flex-1 p-4 bg-amber-50">{children}</main>

          <footer className="bg-amber-900 text-amber-50 p-4 text-center">
            <h4>© 2025 Pinote🥜📝by RoUsin Dev</h4>
          </footer>
        </div>
      </body>
    </html>
  );
}
