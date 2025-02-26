import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const createNotesService = async (
  title,
  content,
  category_id,
  user_id,
  state_id = 2
) => {
  const pool = await getPool();

  const [[result]] = await pool.query(
    `SELECT
    (SELECT id FROM categories WHERE id = ?) AS category,
    (SELECT id FROM users WHERE id = ?) AS user`,
    [category_id, user_id]
  );

  const { category, user, state } = result;

  if (!category) throw generateErrorUtils("La categoría no existe.", 400);
  if (!user) throw generateErrorUtils("El usuario no existe.", 400);

  const [{ insertId }] = await pool.query(
    `INSERT INTO notes (title, content, category_id, user_id, state_id) VALUES (?, ?, ?, ?, ?)`,
    [title, content, category_id, user_id, state_id]
  );

  return insertId;
};

export default createNotesService;
