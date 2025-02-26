const createImagesTable = async (pool) => {
  console.log("Creando tabla...");
  await pool.query(`
            CREATE TABLE IF NOT EXISTS images (
	id INT PRIMARY KEY AUTO_INCREMENT,
    url TEXT NOT NULL,
    description VARCHAR (250) NULL,
    uploaded_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
        `);
  console.log("Tabla 'images' creada.");
};

export default createImagesTable;
