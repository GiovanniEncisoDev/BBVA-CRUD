// backend/db.js
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const { Pool } = require('pg');

// Configura los datos de conexión utilizando las variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,  // Usar el puerto definido en las variables de entorno o 5432 por defecto
});

// Exporta la instancia del pool para usar en otros archivos
module.exports = {
  query: (text, params) => pool.query(text, params),
};
