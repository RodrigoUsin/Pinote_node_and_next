"use client";

import { useRouter } from "next/navigation";

export default function HomeButton({
  className = "bg-blue-600 hover:bg-blue-700",
  children = "Volver a Inicio",
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className={`px-4 py-2 text-white rounded ${className}`}
    >
      {children}
    </button>
  );
}
