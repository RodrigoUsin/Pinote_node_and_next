"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      router.push("/user");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        Email:{" "}
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {"   "}
        Contraseña:{" "}
        <input
          type="password"
          placeholder="Contenido"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {"    "}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
