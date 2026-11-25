const express = require('express');
const router = express.Router();

const requestController = require('../controllers/request.controller');

// Registrar una nueva solicitud
router.post('/', requestController.createRequest);

module.exports = router;