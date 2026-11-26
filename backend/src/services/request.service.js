
const requestModel = require('../models/request.model');
const serviceModel = require('../models/service.model');

// Validar y registrar una nueva solicitud
async function createRequest(data) {

    // Validar campos obligatorios
    if (!data.nombre || !data.correo || !data.id_servicio) {
        const error = new Error('Nombre, correo e ID del servicio son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Validar nombre
    if (typeof data.nombre !== 'string') {
        const error = new Error('El nombre debe ser texto');
        error.statusCode = 400;
        throw error;
    }

    const nombre = data.nombre.trim();

    if (nombre.length < 2 || nombre.length > 100) {
        const error = new Error('El nombre debe tener entre 2 y 100 caracteres');
        error.statusCode = 400;
        throw error;
    }

    // Validar correo electrónico
    if (
        typeof data.correo !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo.trim())
    ) {
        const error = new Error('El correo electrónico no es válido');
        error.statusCode = 400;
        throw error;
    }

    const correo = data.correo.trim().toLowerCase();

    if (correo.length > 150) {
        const error = new Error('El correo no debe superar los 150 caracteres');
        error.statusCode = 400;
        throw error;
    }

    // Validar ID del servicio
    const idServicio = Number(data.id_servicio);

    if (!Number.isInteger(idServicio) || idServicio <= 0) {
        const error = new Error('El ID del servicio no es válido');
        error.statusCode = 400;
        throw error;
    }

    // Verificar que el servicio exista y esté activo
    const servicio = await serviceModel.getById(idServicio);

    if (!servicio) {
        const error = new Error('El servicio seleccionado no existe o no está disponible');
        error.statusCode = 400;
        throw error;
    }

    // Validar teléfono (opcional)
    let telefono = null;

    if (data.telefono !== undefined && data.telefono !== null && data.telefono !== '') {

        if (typeof data.telefono !== 'string') {
            const error = new Error('El teléfono debe ser texto');
            error.statusCode = 400;
            throw error;
        }

        telefono = data.telefono.trim();

        const formatoTelefono = /^\+?[\d\s()-]+$/;
        const cantidadDigitos = telefono.replace(/\D/g, '').length;

        if (
            !formatoTelefono.test(telefono) ||
            cantidadDigitos < 10 ||
            cantidadDigitos > 15 ||
            telefono.length > 20
        ) {
            const error = new Error('El teléfono debe contener entre 10 y 15 dígitos');
            error.statusCode = 400;
            throw error;
        }
    }

    // Validar mensaje (opcional)
    let mensaje = null;

    if (data.mensaje !== undefined && data.mensaje !== null && data.mensaje !== '') {

        if (typeof data.mensaje !== 'string') {
            const error = new Error('El mensaje debe ser texto');
            error.statusCode = 400;
            throw error;
        }

        mensaje = data.mensaje.trim();

        if (mensaje.length > 2000) {
            const error = new Error('El mensaje no debe superar los 2000 caracteres');
            error.statusCode = 400;
            throw error;
        }
    }

    // Registrar solicitud
    return await requestModel.create({
        ...data,
        nombre,
        correo,
        telefono,
        mensaje,
        id_servicio: idServicio
    });
}

module.exports = {
    createRequest
};
