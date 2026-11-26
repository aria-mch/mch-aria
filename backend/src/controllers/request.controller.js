
const requestService = require('../services/request.service');

// Registrar una nueva solicitud
async function createRequest(req, res) {
    try {
        const result = await requestService.createRequest(req.body);

        res.status(201).json({
            message: 'Solicitud registrada correctamente',
            data: result
        });

    } catch (error) {
        console.error('Error al registrar solicitud:', error.message);

        res.status(error.statusCode || 500).json({
            message: error.statusCode === 400
                ? error.message
                : 'Error al registrar la solicitud'
        });
    }
}

module.exports = {
    createRequest
};
