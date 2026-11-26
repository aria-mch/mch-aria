const pool = require('../config/database');

// Consultar servicios activos en MySQL
async function getAllActive() {
    const [rows] = await pool.query(
        'SELECT * FROM servicios WHERE activo = TRUE'
    );

    return rows;
}

// Consultar un servicio por su ID
async function getById(idServicio) {
    const [rows] = await pool.query(
        'SELECT id_servicio FROM servicios WHERE id_servicio = ? AND activo = TRUE',
        [idServicio]
    );

    return rows[0] || null;
}

module.exports = {
    getAllActive,
    getById
};