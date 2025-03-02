import uploadImageService from "../../services/images/uploadImageService.service.js";

const uploadImageController = async (req, res, next) => {
  try {
    const imageUrl = await uploadImageService(req.file);

    res.send({
      status: "ok",
      message: "Imagen subida correctamente",
      data: { imageUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default uploadImageController;
