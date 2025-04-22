"use client";

import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://tu-backend.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar");
      }

      alert("¡Usuario registrado correctamente!");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Ocurrió un error durante el registro");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h3 className="text-2xl font-bold text-amber-800 mb-6 text-center">
          Regístrate para empezar a crear notas 📝
        </h3>

        {/* Campo de Email */}
        <div className="mb-4">
          <label className="block text-amber-700 mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Campo de Contraseña */}
        <div className="mb-6">
          <label className="block text-amber-700 mb-2">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Mensajes de Error */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 disabled:bg-amber-400"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
