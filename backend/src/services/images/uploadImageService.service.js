import path from "path";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const uploadImageService = async (file) => {
  if (!file) {
    throw generateErrorUtils("No se ha enviado ninguna imagen.", 400);
  }

  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    throw generateErrorUtils("Formato de imagen no permitido.", 400);
  }

  const fileName = `${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}${extension}`;

  const uploadPath = path.join("uploads", fileName);

  return `/uploads/${fileName}`;
};

export default uploadImageService;
