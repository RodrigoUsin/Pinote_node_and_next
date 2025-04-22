"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Bienvenid@ a Pinote, tu aplicación de notas</h2>
      <section>
        Regístrate{" "}
        <Link href="/register" className="text-amber-600 hover:underline">
          aquí
        </Link>{" "}
        para poder empezar a crear tus notas
      </section>
      <section>
        O si ya tienes usuario, inicia sesión{" "}
        <Link href="/login" className="text-amber-600 hover:underline">
          aquí en su lugar
        </Link>
        .
      </section>
    </div>
  );
}
