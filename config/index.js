'use strict';

const env = process.env.NODE_ENV || 'development';

const owners = require('./owners');
const surveys = require('./surveys');
var seedData = null;

if (env === 'development') {
  seedData = require('./seedData');
}


module.exports = {
  getEnv: () => {
    return env;
  },
	getOwners: () => {
		return owners;
	},
  getSeedData: () => {
    return seedData;
  },
	getSurveys: () => {
		return surveys;
	}
}