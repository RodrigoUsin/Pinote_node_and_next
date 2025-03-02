import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const createCategoriesService = async (category) => {
  if (!category) {
    throw generateErrorUtils(
      "Es obligatorio introducir un nombre para la categoría",
      400
    );
  }
  const pool = await getPool();

  const [[existingCategory]] = await pool.query(
    `SELECT id FROM categories WHERE category = ?`,
    [category]
  );

  if (existingCategory) {
    throw generateErrorUtils("Esta categoría ya existe", 409);
  }
  const [{ insertId }] = await pool.query(
    `INSERT INTO categories (category) VALUES (?)`,
    [category]
  );

  return insertId;
};

export default createCategoriesService;
