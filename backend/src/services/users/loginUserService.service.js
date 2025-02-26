import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginUserService = async (email, password) => {
  if (!email || !password) {
    throw generateErrorUtils(
      "Los campos email y password son obligatorios para acceder a tu perfil de usuario, por favor ingresa ambos",
      400
    );
  }

  const pool = await getPool();

  const [[user]] = await pool.query(
    `SELECT id, password FROM users WHERE email=?`,
    [email]
  );

  if (!user || !user.password) {
    throw generateErrorUtils("Email o password incorrectos", 401);
  }

  if (!user.id) {
    console.log("Error: No se encontró la columna 'id' en la respuesta");
    throw generateErrorUtils(
      "Error en la base de datos: ID no encontrado.",
      500
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw generateErrorUtils("Email o password incorrectos", 401);
  }

  const token = jwt.sign({ userId: user.id, email }, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN || "2d",
  });

  return { userId: user.id, token };
};

export default loginUserService;
