import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import generateErrorUtils from "../../utils/generateErrorUtils.js";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadImageService = async (file) => {
  try {
    if (!file)
      throw generateErrorUtils("No se ha enviado ninguna imagen.", 400);

    // 1. Sanear el nombre del archivo (eliminar caracteres especiales)
    const sanitizedFileName = file.originalname
      .replace(/[^a-zA-Z0-9.]/g, "_") // Reemplaza caracteres no alfanuméricos
      .toLowerCase();

    // 2. Generar ruta absoluta
    const uploadsDir = path.join(__dirname, "../../uploads");
    await fs.mkdir(uploadsDir, { recursive: true }); // Crea la carpeta si no existe

    // 3. Nombre único con nombre original saneado
    const fileName = `image-${Date.now()}-${sanitizedFileName}`;
    const uploadPath = path.join(uploadsDir, fileName);

    // 4. Procesar imagen
    await sharp(file.buffer)
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true }) // Mantiene el aspect ratio y no aumenta el tamaño de las imágenes pequeñas, evitando distorsiones
      .webp({ quality: 80 }) // Convierte a WebP, un formato para webs
      .toFile(uploadPath); // Guarda en disco

    return `/uploads/${fileName}`; // Ruta pública en la barra de dirección
  } catch (error) {
    console.error("[ERROR] Fallo en Sharp:", error); // Log detallado para señalar errores con SHARP
    throw generateErrorUtils(
      `Error al procesar la imagen: ${error.message}`,
      500
    );
  }
};

export default uploadImageService;
