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

router.get('/', function(req, res){
  res.render('home', {title: 'Home'});
});

router.get('/blockview', function(req, res){
	const data = {
    "type": "chainstats"
  };

  propertiesGo.myProcessMsg(data, (err, blockChain) => {
    if (err) {
      console.log(err);
      return res.status(500).end("Something went wrong. Check console");
    }
    return res.render('blockview', { "blockChain": JSON.stringify(blockChain) });
  });
  
});

router.get('/registration', function(req, res){
  const data = {
    "type": "getAllOwners"
  };

  /*propertiesGo.myProcessMsg(data, (err, allOwners) => {
    if(err) {
      console.log(err);
      return res.status(500).end("Something went wrong. Check console");
    }
    res.render('registration', { title: 'Register Property', allOwners });
  });*/
  res.render('registration', { title: 'Register Property', owners });
  
});

router.get('/sale', function(req, res){
  const data = {
    "type": "getAllSurveys"
  };
  res.render('sales', {title: 'Sell Property', owners, surveys });
});

module.exports = router;
