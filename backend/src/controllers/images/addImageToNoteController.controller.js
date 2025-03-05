import addImageToNoteService from "../../services/images/addImageToNoteService.service.js";
import uploadImageService from "../../services/images/uploadImageService.service.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const addImageToNoteController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;

    if (!imageId) {
      throw generateErrorUtils("Se requiere una id de imagen.", 400);
    }

    const imageUrl = await uploadImageService(req.file);

    const imageId = await addImageToNoteService(noteId, imageUrl, userId);

    res.send({
      status: "ok",
      message: "Imagen agregada correctamente a la nota.",
      data: { noteId, imageId, imageUrl },
    });
  } catch (error) {
    next(error);
  }
};

export default addImageToNoteController;
