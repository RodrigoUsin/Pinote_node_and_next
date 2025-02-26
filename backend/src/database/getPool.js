import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;

const getPool = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: "Z",
      });
    }
    console.log("Conexión con base de datos pinotenext, ok");

    return pool;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error conectando a MySQL o no se encuentra la base de datos"
    );
  }
};

export default getPool;
