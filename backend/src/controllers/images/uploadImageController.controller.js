import uploadImageService from "../../services/images/uploadImageService.service.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const uploadImageController = async (req, res, next) => {
  try {
    console.log(">>>>>>>>>>", req.file);
    if (!req.file) {
      throw generateErrorUtils("No se ha subido ninguna imagen", 400);
    }

    const imageUrl = await uploadImageService(req.file.filename);

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
