"use client";

import CreateNoteButton from "@/components/buttons/CreateNoteButton";
import HomeButton from "@/components/buttons/HomeButton";

export default function User() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* Header con título y botones */}
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mi usuario</h2>
        <div className="flex space-x-3">
          <CreateNoteButton />
        </div>
      </header>

      {/* Contenido del perfil */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Este es mi perfil:</h3>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          aut aliquid quisquam soluta dicta consequuntur, expedita excepturi
          unde fugiat tempora hic ad, accusantium fugit alias quis dolorem non.
          Aut, harum. Ipsa eaque earum iure iste magni eum sed mollitia qui,
          perspiciatis, quia debitis? Adipisci, rerum! Doloremque id dolorum nam
          eveniet ipsa suscipit ab tempora harum qui esse! Ex, velit
          reprehenderit? Aspernatur, dolorum at. Non minus consectetur
          repudiandae rem ipsum deserunt, aliquid ullam officia eius animi et
          similique ex ipsa dolores quibusdam nostrum eligendi quae enim
          corporis provident tempore iste iusto!
        </p>
      </section>
      <div className="flex space-x-3 mt-6">
        <HomeButton />
      </div>
    </div>
  );
}
