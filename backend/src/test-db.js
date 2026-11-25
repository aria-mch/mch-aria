require('dotenv').config();
const pool = require('./config/database');

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT DATABASE() AS database_name');

        console.log('Conexión exitosa con MySQL');
        console.log('Base de datos:', rows[0].database_name);

    } catch (error) {
        console.error('Error de conexión:', error.message);

    } finally {
        await pool.end();
    }
}

testConnection();