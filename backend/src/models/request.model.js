
const pool = require('../config/database');

// Registrar una nueva solicitud y su cliente
async function create(data) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Buscar si el cliente ya existe por su correo
        const [clientes] = await connection.query(
            'SELECT id_cliente FROM clientes WHERE correo = ?',
            [data.correo]
        );

        let idCliente;

        if (clientes.length > 0) {
            // Reutilizar el cliente existente
            idCliente = clientes[0].id_cliente;

            // Actualizar sus datos
            await connection.query(
                `UPDATE clientes
                 SET nombre = ?, telefono = ?
                 WHERE id_cliente = ?`,
                [data.nombre, data.telefono, idCliente]
            );

        } else {
            // Registrar un cliente nuevo
            const [nuevoCliente] = await connection.query(
                `INSERT INTO clientes (nombre, correo, telefono)
                 VALUES (?, ?, ?)`,
                [data.nombre, data.correo, data.telefono]
            );

            idCliente = nuevoCliente.insertId;
        }

        // Registrar la solicitud
        const [nuevaSolicitud] = await connection.query(
            `INSERT INTO solicitudes
             (id_cliente, id_servicio, mensaje)
             VALUES (?, ?, ?)`,
            [idCliente, data.id_servicio, data.mensaje]
        );

        await connection.commit();

        return {
            id_cliente: idCliente,
            id_solicitud: nuevaSolicitud.insertId
        };

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }
}

module.exports = {
    create
};
