'use strict';

const express = require('express');
const router = express.Router();

const propertiesGo = require('../utils/ws_part1');

// seed data to initialize application
const config = require('../config');
const seedData = config.getSeedData();


// permit seeding data only in `development` 
router.use(function(req, res, next) {
  if (config.getEnv() === 'development') {
    next();
  } else {
    return res.status(403).send({"error": "Unauthorized"});
  }
});


// routes start with `/seed`
router.post('/', (err, res) => {

  const action = {
    "type": "create"
  };

  // add each property to the blockchain
  seedData.forEach((property) => {
    action.property = property;

    propertiesGo.myProcessMsg(action, (err, success) => {
      if (err) {
        console.log(err);
        return res.status(500).end("Something went wrong. Check console");
      }
    });
  });

  res.status(202).send("Seeding successful!")
});

module.exports = router;
