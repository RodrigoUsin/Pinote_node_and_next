import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const getNotesService = async () => {
  const pool = await getPool();

  const [result] = await pool.query(
    `SELECT id, title,  FROM notes ORDER BY id ASC`
  );

  if (result.length === 0)
    throw generateErrorUtils("No tienes notas para listar.", 400);

  return result;
};

export default getNotesService;
