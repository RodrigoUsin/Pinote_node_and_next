import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";
import getCategoryService from "./getCategoryService.service.js";

const editCategoryService = async (categoryId, newCategory) => {
  const pool = await getPool();
  const categories = await getCategoryService();

  const categoryToEdit = categories.find((cat) => cat.id === categoryId);

  if (!categoryToEdit) {
    throw generateErrorUtils("La categoría no existe.", 404);
  }

  if (categoryToEdit.category === newCategory) {
    throw generateErrorUtils("El nombre de la categoría ya es el mismo.", 400);
  }

  await pool.query(`UPDATE categories SET category = ? WHERE id = ?`, [
    newCategory,
    categoryId,
  ]);

  return { id: categoryId, category: newCategory };
};

export default editCategoryService;
