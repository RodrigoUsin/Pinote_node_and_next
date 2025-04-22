"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function UserNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/api/notes/by-user");
        setNotes(response.data);
      } catch (error) {
        console.error("Error al cargar notas:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleDelete = async (noteId) => {
    try {
      await axios.delete(`/api/notes/${noteId}`);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  return (
    <div>
      <h1>Tus Notas</h1>
      <div>
        {notes.map((note) => (
          <div key={note.id}>
            <Link href={`/notes/user-notes/${note.id}`}>
              <h3>{note.title}</h3>
            </Link>
            <span>{note.category}</span>
            <span>{note.isPrivate ? "🔒" : "🌍"}</span>
            <button onClick={() => handleDelete(note.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}
