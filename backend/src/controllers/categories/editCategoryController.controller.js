import editCategoryService from "../../services/categories/editCategoryService.service.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const editCategoryController = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const { newCategory } = req.body;

    if (!categoryId)
      throw generateErrorUtils("Se esperaba una categoría válida", 400);
    if (!newCategory)
      throw generateErrorUtils(
        "El nuevo nombre de la categoría es obligatorio",
        400
      );

    const updatedCategory = await editCategoryService(categoryId, newCategory);

    res.send({
      status: "ok",
      message: "Categoría editada correctamente",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export default editCategoryController;
