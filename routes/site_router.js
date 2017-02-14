'use strict';
/* global process */
/*******************************************************************************
 * Copyright (c) 2015 IBM Corp.
 *
 * All rights reserved. 
 *
 * Contributors:
 *   David Huffman - Initial implementation
 *******************************************************************************/
var express = require('express');
var router = express.Router();
var setup = require('../setup.js');

const config = require('../config/');
const owners = config.getOwners();
const surveys = config.getSurveys();

router.route('/').get(function(req, res){
  res.render('home', {title: 'Home'});
});

router.route('/registration').get(function(req, res){
  res.render('registration', {title: 'Register Property', owners });
});

router.route('/sale').get(function(req, res){
  res.render('sales', {title: 'Sell Property', owners, surveys });
});

module.exports = router;
