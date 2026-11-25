const pool = require('../config/database');

// Registrar cliente y solicitud
async function create(data) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();
        // Verificar que el servicio exista y esté activo
        const [servicios] = await connection.query(
            'SELECT id_servicio FROM servicios WHERE id_servicio = ? AND activo = TRUE',
            [data.id_servicio]
        );

        if (servicios.length === 0) {
            const error = new Error('El servicio no existe o está inactivo');
            error.statusCode = 400;
            throw error;
        }

        // Buscar cliente por correo
        const [clientes] = await connection.query(
            'SELECT id_cliente FROM clientes WHERE correo = ?',
            [data.correo]
        );

        let idCliente;

        if (clientes.length > 0) {
            idCliente = clientes[0].id_cliente;
        } else {
            // Registrar nuevo cliente
            const [nuevoCliente] = await connection.query(
                `INSERT INTO clientes (nombre, correo, telefono)
                 VALUES (?, ?, ?)`,
                [data.nombre, data.correo, data.telefono || null]
            );

            idCliente = nuevoCliente.insertId;
        }

        // Registrar solicitud
        const [nuevaSolicitud] = await connection.query(
            `INSERT INTO solicitudes (id_cliente, id_servicio, mensaje)
             VALUES (?, ?, ?)`,
            [idCliente, data.id_servicio, data.mensaje || null]
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