const createNotesTable = async (pool) => {
  console.log("Creando tabla...");

  await pool.query(`CREATE TABLE IF NOT EXISTS notes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (50) NOT NULL,
    content TEXT NOT NULL,
    category_id INT,
    user_id INT,
    image_id INT,
    state_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (state_id) REFERENCES states(id),
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);
  console.log("Tabla 'notes' creada.");
};

export default createNotesTable;
