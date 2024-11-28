// backend/server.js
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

const express = require('express');
const clienteRoutes = require('./routes/clienteRoutes');
const cuentaRoutes = require('./routes/cuentaRoutes');
const impositorRoutes = require('./routes/impositorRoutes');
const prestamoRoutes = require('./routes/prestamoRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');

const app = express();

// Middleware para parsear cuerpos JSON
app.use(express.json());

// Rutas
app.use('/api/clientes', clienteRoutes);  // Usar rutas específicas en lugar de '/api'
app.use('/api/cuentas', cuentaRoutes);
app.use('/api/impositores', impositorRoutes);
app.use('/api/prestamos', prestamoRoutes);
app.use('/api/sucursales', sucursalRoutes);

// Configuración del servidor con variables de entorno
const PORT = process.env.PORT || 3000;  // Usar el puerto de las variables de entorno o 3000 por defecto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
