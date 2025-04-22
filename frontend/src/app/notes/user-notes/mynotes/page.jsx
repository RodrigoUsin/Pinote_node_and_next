"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes/mynotes", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Error al cargar notas");

        const data = await res.json();
        const sortedNotes = data.sort((a, b) => b.id - a.id);
        setNotes(sortedNotes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Cargando notas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Mis Notas</h1>

      {/* Lista de notas */}
      <ul className="space-y-4 mb-8">
        {notes.map((note) => (
          <li key={note.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">
              {note.title || "Sin título"}
            </h2>
            {note.createdAt && (
              <p className="text-sm text-gray-500">
                Publicado: {new Date(note.createdAt).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* Botón de volver */}
      <button
        onClick={() => router.push("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Volver a Inicio
      </button>
    </div>
  );
}
