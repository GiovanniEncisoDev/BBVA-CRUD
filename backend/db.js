// backend/db.js
const { Pool } = require('pg');

// Configura los datos de conexión
const pool = new Pool({
  user: 'bbva_user',
  host: 'dpg-ct47om3tq21c7391p1ag-a.oregon-postgres.render.com',
  database: 'bbva',
  password: 'WMceO7mTUVRHHKjzSPKqEvYjj2ff1dfb',
  port: 5432,
});

// Exporta la instancia del pool para usar en otros archivos
module.exports = {
  query: (text, params) => pool.query(text, params),
};
