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

const propertiesGo = require('../utils/ws_part1');

router.route('/').get(function(req, res){
  res.render('home', {title: 'Home'});
});

router.route('/blockview').get(function(req, res){
	const data = {
    "type": "chainstats"
  };

  propertiesGo.myProcessMsg(data, (err, blockChain) => {
    if (err) {
      console.log(err);
      return res.status(500).end("Something went wrong. Check console");
    }
    // res.json(blockChain);
    return res.render('blockview', { "blockChain": JSON.stringify(blockChain) });
  });
  
});

router.route('/registration').get(function(req, res){
  res.render('registration', {title: 'Register Property', owners });
});

router.route('/sale').get(function(req, res){
  res.render('sales', {title: 'Sell Property', owners, surveys });
});

module.exports = router;
