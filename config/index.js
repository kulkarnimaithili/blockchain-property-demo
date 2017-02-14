'use strict';

const owners = require('./owners');
const surveys = require('./surveys');


module.exports = {
	getOwners: () => {
		return owners;
	},
	getSurveys: () => {
		return surveys;
	}
}