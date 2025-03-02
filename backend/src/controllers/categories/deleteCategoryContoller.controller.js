import deleteCategoryService from "../../services/categories/deleteCategoryService.service.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const deleteCategoryController = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);

    if (!categoryId)
      throw generateErrorUtils("Se esperaba una categoría válida", 400);

    await deleteCategoryService(categoryId);

    res.send({
      status: "ok",
      message: "Categoría eliminada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteCategoryController;
