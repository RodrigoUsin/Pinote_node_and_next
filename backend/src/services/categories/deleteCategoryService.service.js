import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";
import getCategoryService from "./getCategoryService.service.js";

const deleteCategoryService = async (categoryId) => {
  const pool = await getPool();
  const categories = await getCategoryService();

  const categoryExists = categories.some((cat) => cat.id === categoryId);

  if (!categoryExists) {
    throw generateErrorUtils("La categoría no existe.", 404);
  }

  await pool.query(`DELETE FROM categories WHERE id = ?`, [categoryId]);

  return { message: "Categoría eliminada correctamente." };
};

export default deleteCategoryService;
