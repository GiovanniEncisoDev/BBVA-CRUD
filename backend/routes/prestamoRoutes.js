const express = require('express');
const db = require('../db'); // Importa la conexión a la base de datos
const router = express.Router();

// Ruta para obtener todos los préstamos
router.get('/prestamos', async (req, res) => {
  const searchTerm = req.query.search || ''; // Obtener el parámetro de búsqueda
  const query = `
    SELECT * FROM PRESTAMO 
    WHERE Numero_prestamo ILIKE $1 OR Importe::TEXT ILIKE $1 
    OR Nombre_sucursal ILIKE $1
  `;
  
  try {
    const result = await db.query(query, [`%${searchTerm}%`]); // Filtra por cualquier parámetro
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los préstamos' });
  }
});

// Ruta para agregar un préstamo
router.post('/prestamos', async (req, res) => {
  const { numero_prestamo, importe, nombre_sucursal } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO PRESTAMO (Numero_prestamo, Importe, Nombre_sucursal) VALUES ($1, $2, $3) RETURNING *',
      [numero_prestamo, importe, nombre_sucursal]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar el préstamo' });
  }
});

module.exports = router;
