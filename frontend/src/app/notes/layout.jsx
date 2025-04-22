import Link from "next/link";

export default function NotesLayout({ children }) {
  return (
    <div className="notes-layout">
      <h1>Notas</h1>
      <nav>
        <Link href="/notes/user-notes/public-notes">Notas Públicas</Link>
        <Link href="/notes/user-notes/mynotes">Mis Notas</Link>
        <Link href="/notes/user-notes/new-note">Nueva Nota</Link>
      </nav>
      {children}
    </div>
  );
}

//E:\proyectosWeb\pinotenext\frontend\src\app\\page.jsx
