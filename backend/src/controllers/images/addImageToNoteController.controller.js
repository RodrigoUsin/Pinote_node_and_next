import addImageToNoteService from "../../services/images/addImageToNoteService.service.js";

const addImageToNoteController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      throw generateErrorUtils("Se requiere una URL de imagen.", 400);
    }

    const result = await addImageToNoteService(noteId, imageUrl, userId);

    res.send({
      status: "ok",
      message: "Imagen agregada correctamente a la nota.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default addImageToNoteController;
