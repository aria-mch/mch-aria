const express = require('express');
const cors = require('cors');

const serviceRoutes = require('./routes/service.routes');
const requestRoutes = require('./routes/request.routes');

const app = express();

// Permitir comunicación con el frontend
app.use(cors());

// Procesar datos JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Verificar funcionamiento del servidor
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Servidor MCH Aria funcionando correctamente'
    });
});

// Rutas de la API
app.use('/api/servicios', serviceRoutes);
app.use('/api/solicitudes', requestRoutes);

module.exports = app;