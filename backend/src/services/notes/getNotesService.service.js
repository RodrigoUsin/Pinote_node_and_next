import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const getNotesService = async (user_id = null, note_id = null) => {
  const pool = await getPool();

  let query = `SELECT id, title FROM notes`;
  let params = [];

  if (user_id) {
    query += ` WHERE user_id = ?`;
    params.push(user_id);
  }

  console.log("Servicio ejecutado, filtrando por user_id:", user_id);

  if (note_id) {
    if (params.length > 0) {
      query += ` AND id = ?`;
    } else {
      query += ` WHERE id = ?`;
    }

    params.push(note_id);
  }
  const [result] = await pool.query(query, params);

  if (result.length === 0)
    throw generateErrorUtils("No tienes notas para listar.", 400);

  return note_id ? result[0] : result;
};

export default getNotesService;
