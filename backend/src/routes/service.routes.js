const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.controller');

// Obtener todos los servicios activos
router.get('/', serviceController.getAllServices);

module.exports = router;