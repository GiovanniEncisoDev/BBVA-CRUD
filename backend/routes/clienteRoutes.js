const express = require('express');
const db = require('../db'); // Importa la conexión a la base de datos
const router = express.Router();

// Ruta para obtener todos los clientes
router.get('/clientes', async (req, res) => {
  const searchTerm = req.query.search || ''; // Obtener el parámetro de búsqueda
  const query = `
    SELECT * FROM CLIENTE 
    WHERE ID_cliente ILIKE $1 OR Nombre_cliente ILIKE $1 
    OR Calle_cliente ILIKE $1 OR Ciudad_cliente ILIKE $1
  `;
  
  try {
    const result = await db.query(query, [`%${searchTerm}%`]); // Filtra por cualquier parámetro
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

module.exports = router;
