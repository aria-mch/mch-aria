const express = require('express');

const serviceRoutes = require('./routes/service.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Servidor MCH Aria funcionando correctamente'
    });
});

// Rutas de servicios
app.use('/api/servicios', serviceRoutes);

module.exports = app;