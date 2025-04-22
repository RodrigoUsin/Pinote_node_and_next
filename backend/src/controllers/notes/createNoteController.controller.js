import createNoteService from "../../services/notes/createNoteService.service.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const createNoteController = async (req, res, next) => {
  try {
    const { title, content, category_id } = req.body;
    const author_id = req.userId;

    if (!title) throw generateErrorUtils("Se esperaba un título", 400);

    if (!content) throw generateErrorUtils("Se esperaba un contenido", 400);

    if (!category_id)
      throw generateErrorUtils("Se esperaba una categoría", 400);

    if (!author_id) throw generateErrorUtils("Se esperaba un autor", 400);

    const state_id = 2;

    await createNoteService(title, content, category_id, author_id);
    res.send({
      status: "ok",
      message: "Nota creada correctamente.",
    });
  } catch (error) {
    next(error);
  }
};

export default createNoteController;
