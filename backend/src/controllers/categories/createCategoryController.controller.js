import generateErrorUtils from "../../utils/generateErrorUtils.js";
import createCategoryService from "../../services/categories/createCategoriesService.service.js";

const createCategoryController = async (req, res, next) => {
  try {
    const { category } = req.body;

    if (!category)
      throw generateErrorUtils("Se esperaba una categoría nueva", 400);

    await createCategoryService(category);
    res.send({
      status: "ok",
      message: "Categoría creada correctamente.",
    });
  } catch (error) {
    next(error);
  }
};

export default createCategoryController;
