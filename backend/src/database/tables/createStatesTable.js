const createStatesTable = async (pool) => {
  console.log("Creando tabla...");
  await pool.query(`CREATE TABLE IF NOT EXISTS states (
	id INT PRIMARY KEY AUTO_INCREMENT,
    state ENUM ('publica', 'privada') NOT NULL DEFAULT 'privada'
)
`);
  console.log("Tabla 'states' creada.");
};

export default createStatesTable;
