import uploadImageService from "../../services/images/uploadImageService.service.js";

const uploadImageController = async (req, res, next) => {
  try {
    console.log("[DEBUG] req.file:", req.file); //Log para señalar posibles errores en la req. del archivo

    const imageUrl = await uploadImageService(req.file); // Multer ya validó la presencia del archivo (req.file)

    res.status(201).json({
      status: "ok",
      message: "Imagen subida correctamente",
      data: { imageUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default uploadImageController;
