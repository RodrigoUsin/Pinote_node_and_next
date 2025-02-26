const createCategoriesTable = async (pool) => {
  console.log("Creando tabla...");
  await pool.query(`
        CREATE TABLE IF NOT EXISTS categories (
	id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR (50) NOT NULL UNIQUE
)
        `);
  console.log("Tabla 'categories' creada.");
};

export default createCategoriesTable;
