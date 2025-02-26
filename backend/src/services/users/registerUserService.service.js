import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";
import bcrypt from "bcrypt";

const registerUserioService = async (email, password) => {
  const pool = await getPool();

  const [[user]] = await pool.query(`SELECT id FROM users WHERE email = ?`, [
    email,
  ]);
  if (user)
    throw generateErrorUtils("El email ya se encuentra registrado.", 409);

  const passwordHashed = await bcrypt.hash(password, 10);

  const [{ insertId }] = await pool.query(
    `INSERT INTO users (email, password) VALUES (?, ?)`,
    [email, passwordHashed]
  );

  return insertId;
};

export default registerUserioService;
