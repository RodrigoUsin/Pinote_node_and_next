import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";
import getNotesService from "../../services/notes/getNotesService.service.js";

const deleteNoteController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const noteId = Number(req.params.id);

    if (!userId)
      throw generateErrorUtils("No tienes permisos de eliminación", 400);

    if (!noteId)
      throw generateErrorUtils("Se esperaba una nota para eliminar", 400);

    const note = await getNotesService(userId, Number(noteId));
    if (!note)
      throw generateErrorUtils(
        "Nota no econtrada o sin autorización para eliminar",
        403
      );

    const query = "DELETE FROM notes WHERE id = ? AND user_id = ?";
    const params = [noteId, userId];

    const pool = await getPool();
    await pool.query(query, params);

    res.send({
      status: "ok",
      message: "Nota eliminada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteNoteController;
