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

  // Cargar categorías y usuario al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        // Obtener username del token
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (decoded?.email) {
          setUsername(decoded.email.split("@")[0]);
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
        setError("Error al cargar datos iniciales");
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
      if (!token || !username) {
        router.push("/auth/login");
        return;
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
      await axios.post(
        "http://localhost:3001/notes",
        {
          title: formData.title,
          content: formData.content,
          category_id: formData.category_id,
          state_id: formData.isPrivate ? 1 : 2,
          image_url: imageUrl || null,
          author: username, // Usamos el username obtenido del token
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      router.push("/notes/user");
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Respuesta del error:", error.response?.data);
      setError(error.response?.data?.message || "Error al crear la nota");

      if (error.response?.status === 401) {
        router.push("/auth/login");
      }
    } finally {
      setLoading(false);
    }
  };

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
