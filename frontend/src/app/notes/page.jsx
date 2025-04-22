"use client";

import CreateNoteButton from "@/components/buttons/CreateNoteButton";
import HomeButton from "@/components/buttons/HomeButton";

export default function Notes() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Notas</h2>
        <CreateNoteButton />
      </header>

      <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <p className="text-gray-600">Disfruta del servicio de notas ♥</p>
      </section>

      <div className="flex justify-center">
        <HomeButton />
      </div>
    </div>
  );
}
