'use strict';

const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/properties_controller');

// middleware to allow CORS
router.use(function(req, res, next) {
  var allowedOrigins = ['http://localhost:3000'];
  var origin = req.headers.origin;

  if(allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/:id', propertyController.getPropertyByID);

router.post('/', propertyController.createProperty);

module.exports = router;
