import createNoteService from "../../services/notes/createNoteService.service.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const createNoteController = async (req, res, next) => {
  try {
    const { title, content, category_id, user_id, state_id } = req.body;

    if (!title) throw generateErrorUtils("Se esperaba un título", 400);

    if (!content) throw generateErrorUtils("Se esperaba un contenido", 400);

    if (!category_id)
      throw generateErrorUtils("Se esperaba una categoría", 400);

    if (!user_id) throw generateErrorUtils("Se esperaba un autor", 400);

    await createNoteService(title, content, category_id, user_id, state_id);
    res.send({
      status: "ok",
      message: "Nota creada correctamente.",
    });
  } catch (error) {
    next(error);
  }
};

export default createNoteController;
