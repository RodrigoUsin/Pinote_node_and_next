const createUsersTable = async (pool) => {
  console.log("Creando tabla...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(300) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`);
  console.log("Tabla 'users' creada.");
};

export default createUsersTable;
