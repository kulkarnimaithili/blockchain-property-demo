'use strict';

const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/properties_controller');

/*
	All these routes begin with /api
*/

router.post('/properties', propertyController.createProperty);
router.post('/properties/transfer', propertyController.transferProperty);

module.exports = router;
