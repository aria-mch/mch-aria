const requestModel = require('../models/request.model');

// Validar y registrar una nueva solicitud
async function createRequest(data) {

    if (!data.nombre || !data.correo || !data.id_servicio) {
        const error = new Error('Nombre, correo e ID del servicio son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
        const error = new Error('El correo electrónico no es válido');
        error.statusCode = 400;
        throw error;
    }

    const idServicio = Number(data.id_servicio);

    if (!Number.isInteger(idServicio) || idServicio <= 0) {
        const error = new Error('El ID del servicio no es válido');
        error.statusCode = 400;
        throw error;
    }

    return await requestModel.create({
        ...data,
        id_servicio: idServicio
    });
}

module.exports = {
    createRequest
};