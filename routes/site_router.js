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
const express = require('express');
const router = express.Router();
const setup = require('../setup.js');

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

    if (blockChain.message == 'No blocks') {
      return res.status(411).render('blockview', { blockChain });
    }
    return res.render('blockview', { "blockChain": JSON.stringify(blockChain) });
  });
  
});

router.get('/registration', function(req, res){
  const data = {
    "type": "getAllOwners"
  };

  propertiesGo.myProcessMsg(data, (err, owners) => {
    if(err) {
      console.log(err);
      return res.status(500).end("Something went wrong. Check console");
    }
    res.render('registration', { title: 'Register Property', owners });
  });
});

router.get('/sale', function(req, res){
  let data = {
    "type": "getAllOwners"
  };

  // get all owners
  propertiesGo.myProcessMsg(data, (err, owners) => {
    if(err) {
      console.log(err);
      return res.status(500).end("Something went wrong while getting owners. Check console");
    }

    data = {
      "type": "getAllSurveys"
    };

    // get all surveys
    propertiesGo.myProcessMsg(data, (err, surveys) => {
      if(err) {
        console.log(err);
        return res.status(500).end("Something went wrong while getting surveys. Check console");
      }
      res.render('sales', { title: 'Sell Property', owners, surveys });
    });
  });
});

module.exports = router;
