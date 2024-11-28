require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

const express = require('express');
const clienteRoutes = require('./routes/clienteRoutes');
const cuentaRoutes = require('./routes/cuentaRoutes');
const impositorRoutes = require('./routes/impositorRoutes');
const prestamoRoutes = require('./routes/prestamoRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const path = require('path');  // Necesario para trabajar con rutas absolutas

const app = express();

// Middleware para parsear cuerpos JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, 'frontend'))); // Sirve los archivos estáticos de 'frontend'

// Ruta para servir el archivo index.html cuando se accede a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));  // Ruta del archivo HTML
});

// Rutas API
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
