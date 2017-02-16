'use strict';

var ibc = {};
var chaincode = {};

module.exports.setup = function(sdk, cc) {
  ibc = sdk;
  chaincode = cc;
};


module.exports.myProcessMsg = function(data, callback) {
  if (data.type == 'create') { // create a new marble
    console.log('its a create!');

    const property = data.property;

    if (property.owner && property.aadhar && property.area && property.location && property.survey) {
      chaincode.invoke.initProperty([property.owner, property.aadhar, property.survey, property.location, property.area], callback);
    }
  } else if (data.type == 'transfer') {
    console.log('transfering msg');

    const transferData = data.transferData;
    
    if (transferData.seller && transferData.surveyNo && transferData.buyer) {
      chaincode.invoke.transfer([transferData.seller, transferData.surveyNo, transferData.buyer], callback);
    } else {
      return callback("Arguments don't exist", null)
    }

  } else if (data.type == 'chainstats') {
    console.log('chainstats msg');
    ibc.chain_stats(cbStats);

  } else if (data.type == 'getAllOwners') {
    console.log('getAllOwners');
    chaincode.query.readOwnerIndex([], callback);

  } else if (data.type == 'getAllSurveys') {
    console.log('getAllSurveys');
    chaincode.query.readSurveyIndex([], callback);

  }


  function cbStats(err, chainStats) {
    if (err) {
      return callback(err, null);
    }

    let chainHeight = chainStats.height - 1;
    let blockChainArr = [];  // array of blocks to return
    const returnBlockCount = 10;  // no of blocks to return

    for (let index = chainHeight; index > (chainHeight - returnBlockCount); index--) { 
     
      // fetch block stats by index
      ibc.block_stats(index, (e, stats) => {
        if (e) {
          return callback(e, null);
        }

        blockChainArr.push(stats);

        if (blockChainArr.length >= returnBlockCount) {
          blockChainArr.reverse();  // since it started adding from the last block. we need the last block to be last
          return callback(null, blockChainArr);
        }
      });
    }
  }
};
