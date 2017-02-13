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

router.route('/').get(function(req, res){
  res.render('home', {title: 'Home'});
});

router.route('/registration').get(function(req, res){
  res.render('registration', {title: 'Register Property'});
});

module.exports = router;
