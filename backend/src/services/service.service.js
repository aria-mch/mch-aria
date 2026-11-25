const serviceModel = require('../models/service.model');

// Obtener todos los servicios activos
async function getAllServices() {
    return await serviceModel.getAllActive();
}

module.exports = {
    getAllServices
};