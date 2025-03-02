import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const addImageToNoteService = async (noteId, imageUrl, userId) => {
  const pool = await getPool();

  const [[note]] = await pool.query(
    `SELECT id FROM notes WHERE id = ? AND user_id = ?`,
    [noteId, userId]
  );

  if (!note) {
    throw generateErrorUtils("Nota no encontrada o no tienes permiso.", 403);
  }

  await pool.query(`UPDATE notes SET image_id = ? WHERE id = ?`, [
    imageUrl,
    noteId,
  ]);

  return { noteId, imageUrl };
};

export default addImageToNoteService;
