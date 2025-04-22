"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function NewNote() {
  const router = useRouter();

  // Estados
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
    isPrivate: true,
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [tokenValid, setTokenValid] = useState(false);

  // Función para verificar y decodificar el token
  const verifyToken = (token) => {
    try {
      if (!token) return null;

      const decoded = jwtDecode(token);
      // Verificar expiración
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        throw new Error("Token expirado");
      }

      return decoded;
    } catch (error) {
      console.error("Error verificando token:", error);
      localStorage.removeItem("token");
      return null;
    }
  };

  // Cargar categorías y usuario al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const decoded = verifyToken(token);

      if (!decoded) {
        router.push("/auth/login");
        return;
      }

      try {
        // Obtener username del token
        if (decoded.email) {
          setUsername(decoded.email.split("@")[0]);
        }

        // Verificar token con el backend
        const validationResponse = await axios.get(
          "http://localhost:3001/auth/validate",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (validationResponse.data.valid) {
          setTokenValid(true);
        } else {
          throw new Error("Token inválido");
        }

        // Obtener categorías
        const response = await axios.get("http://localhost:3001/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data.data);

        // Establecer primera categoría como valor inicial
        if (response.data.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category_id: response.data.data[0].id.toString(),
          }));
        }
      } catch (error) {
        console.error("Error inicializando:", error);
        setError(error.response?.data?.message || "Error de autenticación");
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    };

    fetchData();
  }, [router]);

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const decoded = verifyToken(token);

      if (!decoded || !username || !tokenValid) {
        throw new Error("Sesión inválida");
      }

      // Subir imagen si existe
      let imageUrl = "";
      if (formData.image) {
        const formDataToUpload = new FormData();
        formDataToUpload.append("image", formData.image);

        const uploadResponse = await axios.post(
          "http://localhost:3001/api/upload-image",
          formDataToUpload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = uploadResponse.data.imageUrl;
      }

      // Crear nota
      const response = await axios.post(
        "http://localhost:3001/notes",
        {
          title: formData.title,
          content: formData.content,
          category_id: formData.category_id,
          state_id: formData.isPrivate ? 1 : 2,
          image_url: imageUrl || null,
          author: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          validateStatus: (status) => status < 500, // Validar solo errores de servidor
        }
      );

      if (response.status === 201) {
        router.push("/notes/user");
      } else {
        throw new Error(response.data.message || "Error al crear nota");
      }
    } catch (error) {
      console.error("Error completo:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al crear la nota";
      setError(errorMessage);

      if (
        error.response?.status === 401 ||
        error.message.includes("Sesión inválida")
      ) {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Nota</h1>

      {/* Muestra el autor */}
      {username && (
        <div className="mb-4">
          <p className="font-medium">
            Autor: <span className="text-blue-600">{username}</span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label className="block mb-1 font-medium">Título:</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        {/* Contenido */}
        <div>
          <label className="block mb-1 font-medium">Contenido:</label>
          <textarea
            required
            className="w-full p-2 border rounded h-32"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
        </div>

        {/* Selector de categorías */}
        <div>
          <label className="block mb-1 font-medium">Categoría:</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.category_id}
            onChange={(e) =>
              setFormData({ ...formData, category_id: e.target.value })
            }
            disabled={categories.length === 0}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de imagen */}
        <div>
          <label className="block mb-1 font-medium">Imagen (opcional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {/* Switch de privacidad */}
        <div className="flex items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isPrivate}
              onChange={(e) =>
                setFormData({ ...formData, isPrivate: e.target.checked })
              }
              className="h-4 w-4"
            />
            <span>Nota privada</span>
          </label>
        </div>

        {/* Botón de submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Creando..." : "Crear Nota"}
          </button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
