"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EditNote() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "personal",
    isPrivate: false,
    image: null,
    imageUrl: "",
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`/api/notes/${id}`);
        const { title, content, category, isPrivate, imageUrl } = response.data;
        setFormData({ title, content, category, isPrivate, imageUrl });
      } catch (error) {
        console.error("Error al cargar la nota:", error);
      }
    };
    if (id) fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.imageUrl;
      if (formData.image) {
        const formDataImg = new FormData();
        formDataImg.append("image", formData.image);
        const response = await axios.post("/api/upload-image", formDataImg);
        imageUrl = response.data.imageUrl;
      }

      await axios.put(`/api/notes/${id}`, {
        ...formData,
        imageUrl,
      });

      router.push("/notes/user");
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
    }
  };

  return (
    <div>
      <h1>Editar Nota</h1>
      <form onSubmit={handleSubmit}></form>
    </div>
  );
}
