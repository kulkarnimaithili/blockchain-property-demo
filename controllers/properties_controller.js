'use strict';

const propertiesGo = require('../utils/ws_part1');

// POST /properties
module.exports.createProperty = (req, res) => {

  const property = {
    "owner": req.body.owner.toString().trim(),
    "survey": req.body.survey.toString().trim(),
    "aadhar": req.body.aadhar.toString().trim(),
    "area": req.body.area.toString().trim(),
    "location": req.body.location.toString().trim()
  };

  const data = {
    "type": "create",
    property
  };

  propertiesGo.myProcessMsg(data, (err, response) => {
    if (err) {
      console.log(err);
      return res.status(500).end("Something went wrong. Check console");
    }
    return res.status(201).json(response);
  });
};

module.exports.transferProperty = (req, res) => {

  const transferData = {
    "seller": req.body.seller.toString().trim(),
    "buyer": req.body.buyer.toString().trim(),
    "surveyNo": req.body.surveyNo.toString().trim()
  }

  const data = {
    "type": "transfer",
    transferData
  };

  propertiesGo.myProcessMsg(data, (err, response) => {
    if (err) {
      console.log(err);
      return res.status(500).end("Something went wrong. Check console");
    }
    return res.status(201).json(response);
  });
};