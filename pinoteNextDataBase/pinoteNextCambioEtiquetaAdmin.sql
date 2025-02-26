SELECT * FROM pinotenext.usuarios;

USE pinotenext;

UPDATE usuarios
SET etiqueta = 'admin'  
WHERE id = 0; /*usar el id que corresponda*/
