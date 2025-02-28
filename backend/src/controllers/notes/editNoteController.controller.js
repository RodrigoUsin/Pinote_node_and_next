import getPool from "../../database/getPool.js";
import getNotesService from "../../services/notes/getNotesService.service.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const editNoteController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const noteId = Number(req.params.id);

    if (!userId) throw generateErrorUtils("Se esperaba un autor", 400);

    if (!noteId)
      throw generateErrorUtils("Se esperaba una nota para editar", 400);

    const { title, content, category_id, state_id } = req.body;

    const note = await getNotesService(userId, Number(noteId));

    if (!note)
      throw generateErrorUtils(
        "Nota no econtrada o sin autorización para editar",
        403
      );

    let query = "UPDATE notes SET";
    let params = [];

    if (title) {
      query += " title = ?,";
      params.push(title);
    }
    if (content) {
      query += " content = ?,";
      params.push(content);
    }
    if (category_id) {
      query += " category_id = ?,";
      params.push(category_id);
    }
    if (state_id) {
      query += " state_id = ?,";
      params.push(state_id);
    }

    if (params.length === 0) {
      throw generateErrorUtils("No se enviaron campos para actualizar.", 400);
    }

    query = query.slice(0, -1) + " WHERE id = ? AND user_id = ?";
    params.push(noteId, userId);

    const pool = await getPool();
    await pool.query(query, params);

    res.send({
      status: "ok",
      message: "Nota editada correctamente",
    });
  } catch (error) {
    next(error);
  }
};
export default editNoteController;
