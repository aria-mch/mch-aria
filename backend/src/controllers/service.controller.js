const serviceService = require('../services/service.service');

// Obtener todos los servicios
async function getAllServices(req, res) {
    try {
        const services = await serviceService.getAllServices();

        res.json(services);

    } catch (error) {
        console.error('Error en el controlador:', error.message);

        res.status(500).json({
            message: 'Error al obtener los servicios'
        });
    }
}

module.exports = {
    getAllServices
};