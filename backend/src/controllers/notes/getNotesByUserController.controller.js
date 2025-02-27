import getNotesService from "../../services/notes/getNotesService.service.js";

const getNotesByUserController = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Usuario no autenticado",
      });
    }
    console.log("Controlador ejecutado, userId recibido:", req.userId);
    const notes = await getNotesService(req.userId);

    res.send({
      status: "ok",
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

export default getNotesByUserController;
