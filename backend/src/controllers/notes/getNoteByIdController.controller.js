import getNotesService from "../../services/notes/getNotesService.service.js";

const getNoteByIdController = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Usuario no autenticado",
      });
    }
    const noteId = req.params.id;
    if (!noteId) {
      return res.status(400).json({
        status: "error",
        message: "Nota no especificada",
      });
    }
    console.log(
      "Controlador ejecutado, userId recibido:",
      userId,
      "Note id:",
      noteId
    );
    const note = await getNotesService(userId, noteId);

    res.send({
      status: "ok",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export default getNoteByIdController;
