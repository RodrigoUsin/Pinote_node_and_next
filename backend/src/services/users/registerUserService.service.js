import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";
import bcrypt from "bcrypt";

const registerUserService = async (email, password) => {
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

  const token = jwt.sign({ id: insertId, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { insertId, token };
};

export default registerUserService;
