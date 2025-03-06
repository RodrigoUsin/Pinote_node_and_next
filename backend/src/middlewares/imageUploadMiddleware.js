import multer from "multer";

const storage = multer.memoryStorage(); // Almacena el archivo en memoria como Buffer, ideal para procesar con Sharp antes de guardar.

//filtrar el tipo de archivo para informar por si estoy intentando subir algo que no sea una imagen
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    // Valida por tipo MIME porque es más seguro que validar por extensión del archivo.

    cb(null, true); //cd = callback y acepta el archivo
  } else {
    cb(
      new Error(
        "Formato de archivo no permitido. Solo imágenes (JPEG, PNG, WEBP)."
      ),
      false
    );
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB aproximadamente como máximo para evitar problemas y ataques
});

export default upload; //campo del formulario "image"
