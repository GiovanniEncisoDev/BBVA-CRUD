const express = require('express');
const db = require('../db'); // Importa la conexión a la base de datos
const router = express.Router();

// Ruta para obtener todas las cuentas
router.get('/cuentas', async (req, res) => {
  const searchTerm = req.query.search || ''; // Obtener el parámetro de búsqueda
  const query = `
    SELECT * FROM CUENTA 
    WHERE Numero_cuenta ILIKE $1 OR Saldo::TEXT ILIKE $1 
    OR Nombre_sucursal ILIKE $1
  `;
  
  try {
    const result = await db.query(query, [`%${searchTerm}%`]); // Filtra por cualquier parámetro
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las cuentas' });
  }
});

// Ruta para agregar una cuenta
router.post('/cuentas', async (req, res) => {
  const { numero_cuenta, saldo, nombre_sucursal } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO CUENTA (Numero_cuenta, Saldo, Nombre_sucursal) VALUES ($1, $2, $3) RETURNING *',
      [numero_cuenta, saldo, nombre_sucursal]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar la cuenta' });
  }
});

module.exports = router;
