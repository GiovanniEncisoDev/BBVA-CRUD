const express = require('express');
const db = require('../db'); // Importa la conexión a la base de datos
const router = express.Router();

// Ruta para obtener todos los impositores
router.get('/impositores', async (req, res) => {
  const searchTerm = req.query.search || ''; // Obtener el parámetro de búsqueda
  const query = `
    SELECT * FROM IMPOSITOR 
    WHERE ID_cliente ILIKE $1 OR Numero_cuenta ILIKE $1
  `;
  
  try {
    const result = await db.query(query, [`%${searchTerm}%`]); // Filtra por cualquier parámetro
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los impositores' });
  }
});

// Ruta para agregar un impositor
router.post('/impositores', async (req, res) => {
  const { id_cliente, numero_cuenta } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO IMPOSITOR (ID_cliente, Numero_cuenta) VALUES ($1, $2) RETURNING *',
      [id_cliente, numero_cuenta]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar el impositor' });
  }
});

module.exports = router;
