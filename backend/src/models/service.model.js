const pool = require('../config/database');

// Consultar servicios activos en MySQL
async function getAllActive() {
    const [rows] = await pool.query(
        'SELECT * FROM servicios WHERE activo = TRUE'
    );

    return rows;
}

module.exports = {
    getAllActive
};