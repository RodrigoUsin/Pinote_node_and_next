import getNotesService from "../../services/notes/getNotesService.service.js";

const getNotesController = async (req, res, next) => {
  try {
    const notes = await getNotesService();
    res.send({
      status: "ok",
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

export default getNotesController;
