const express = require('express');

const app = express();
const pool = require('./config/database');
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta inicial de prueba
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Servidor MCH Aria funcionando correctamente'
    });
});
// Consultar servicios
app.get('/api/servicios', async (req, res) => {
    try {
        const [servicios] = await pool.query(
            'SELECT * FROM servicios WHERE activo = TRUE'
        );

        res.json(servicios);

    } catch (error) {
        console.error('Error al consultar servicios:', error.message);

        res.status(500).json({
            message: 'Error al obtener los servicios'
        });
    }
});
module.exports = app;