import getPool from "./getPool.js";
import createCategoriesTable from "./tables/createCategoriesTable.js";
import createUsersTable from "./tables/createUsersTable.js";
import createImagesTable from "./tables/createImagesTable.js";
import createStatesTable from "./tables/createStatesTable.js";
import createNotesTable from "./tables/createNotesTable.js";

const initDB = async () => {
  try {
    const pool = await getPool();
    console.log("Eliminando base de datos....");

    await pool.query("DROP DATABASE IF EXISTS pinotenext");

    console.log("Creando base de datos pinotenext....");

    await pool.query("CREATE DATABASE pinotenext");

    await pool.query("USE pinotenext");
    console.log("Usando base de datos pinotenext...");

    console.log("Base de datos creada correctamente!!");

    await createUsersTable(pool);
    await createImagesTable(pool);
    await createCategoriesTable(pool);
    await createStatesTable(pool);
    await createNotesTable(pool);

    console.log("Todas las tablas creadas correctamente!!");

    process.exit(0);
  } catch (error) {
    console.error("Error al iniciar la base de datos", error);
    process.exit(1);
  }
};

initDB();
