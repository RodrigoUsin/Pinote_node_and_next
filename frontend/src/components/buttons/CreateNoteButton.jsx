"use client";

import { useRouter } from "next/navigation";

export default function CreateNoteButton({
  route = "/notes/user-notes/new-note",
  className = "bg-green-600 hover:bg-green-700",
  children = "Crear Nueva Nota",
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(route)}
      className={`px-4 py-2 text-white rounded ${className}`}
    >
      {children}
    </button>
  );
}
