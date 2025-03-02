import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const getCategoryService = async (category) => {
  const pool = await getPool();

  const [categories] = await pool.query(`SELECT id, category FROM categories`);

  if (categories.length === 0)
    throw generateErrorUtils("No hay ninguna categoría coincidente.", 400);

  return categories;
};

export default getCategoryService;
