'use strict';

var ibc = {};
var chaincode = {};
var async = require('async');

module.exports.setup = function(sdk, cc){
  ibc = sdk;
  chaincode = cc;
};


module.exports.myProcessMsg = function(data, callback){
  if(data.type == 'create'){  // create a new marble
    console.log('its a create!');

    const property = data.property;
    
    if(property.owner && property.aadhar && property.area && property.location && property.survey){
      chaincode.invoke.initProperty([property.owner, property.aadhar, property.survey, property.location, property.area], (err, response) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, response);
        }
      }); 
    }
  }
  else if(data.type == 'transfer'){
    console.log('transfering msg');
    if(data.name && data.user){
      chaincode.invoke.set_owner([data.name, data.user]);
    }
  }
  else if(data.type == 'chainstats'){
    console.log('chainstats msg');
    ibc.chain_stats(myCbStats);
  }


  function myCbStats(err, chainStats) {
    if (err) {
      return callback(err, null);
    }

    let blockCount = chainStats.height - 1;
    let blockChain = {};

    /*for (let i = blockCount; i > 0; i--) {  // skip genesis block
      let block = {};

      // take only last 10 blocks
      if (blockChain.length > 9) {
        break;
      }

      ibc.block_stats(i, (e, stats) => {
        if (e) {
          return callback(e, null);
        }
        // block = stats.transactions[0];
        blockChain.push(stats);
        console.log("\n\n\n\n----------------------------------------------------------------------------------------------------\n");
        console.log(blockChain.length);
        console.log("\n-------------------------------------------------------------------------------------------------------------\n\n\n\n");
      });
    }


    console.log("\n\n\n\n ---------");
    console.log(blockChain);
    console.log("\n\n\n\n ---------");
    // blockChain.reverse();
    return callback(null, {"Size": blockChain.length});*/



    // let count = 0;


    // async.eachLimit(blockChain, 1, (blockCount, cb) => {           //iter through each one, and send it
    //   if (count++ < 10) {
    //     ibc.block_stats(blockCount, (e, stats) => {
    //       if(e == null){
    //         blockChain.push(stats);
    //       }
    //       cb(null);
    //     });
    //   }
    // }, () => {
    //   setTimeout(() => {
    //     return callback(null, {"blockChain": blockChain.length });
    //   }, 1000);
    // });


  }

  
  //call back for getting the blockchain stats, lets get the block stats now
  function cb_chainstats(e, chain_stats){
    if(chain_stats && chain_stats.height){
      chain_stats.height = chain_stats.height - 1;                //its 1 higher than actual height
      var list = [];
      for(var i = chain_stats.height; i >= 1; i--){               //create a list of heights we need
        list.push(i);
        if(list.length >= 8) break;
      }
      list.reverse();                               //flip it so order is correct in UI
      async.eachLimit(list, 1, function(block_height, cb) {           //iter through each one, and send it
        ibc.block_stats(block_height, function(e, stats){
          if(e == null){
            stats.height = block_height;
            sendMsg({msg: 'chainstats', e: e, chainstats: chain_stats, blockstats: stats});
          }
          cb(null);
        });
      }, function() {
      });
    }
  }
  
  //send a message, socket might be closed...
  function sendMsg(json){
    if(ws){
      try{
        ws.send(JSON.stringify(json));
      }
      catch(e){
        console.log('[ws error] could not send msg', e);
      }
    }
  }
};