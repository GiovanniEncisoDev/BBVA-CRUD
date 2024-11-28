const express = require('express');
const db = require('../db'); // Importa la conexión a la base de datos
const router = express.Router();

// Ruta para obtener todas las sucursales
router.get('/sucursales', async (req, res) => {
  const searchTerm = req.query.search || ''; // Obtener el parámetro de búsqueda

  const query = `
    SELECT * FROM SUCURSAL 
    WHERE Nombre_sucursal ILIKE $1 OR Ciudad_sucursal ILIKE $1 
    OR Activos::TEXT ILIKE $1
  `;
  
  try {
    const result = await db.query(query, [`%${searchTerm}%`]); // Filtra por cualquier parámetro
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las sucursales' });
  }
});

// Ruta para agregar una sucursal
router.post('/sucursales', async (req, res) => {
  const { nombre_sucursal, ciudad_sucursal, activos } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO SUCURSAL (Nombre_sucursal, Ciudad_sucursal, Activos) VALUES ($1, $2, $3) RETURNING *',
      [nombre_sucursal, ciudad_sucursal, activos]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar la sucursal' });
  }
});

module.exports = router;
