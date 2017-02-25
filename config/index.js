'use strict';

const env = process.env.NODE_ENV || 'development';

//const owners = require('./owners');
//const surveys = require('./surveys');
var seedData = null;

const owners =    [ {
        "name": "Pune",
        "aadhar": "000000000001",
        "surveyNumbers": [
            "18"
        ]
    },
    {
        "name": "Nagpur",
        "aadhar": "000000100002",
        "surveyNumbers": [
            "10"
        ]
    }];
const surveys = [
    {
        "surveyNo": "18",
        "location": "Panjim",
        "area": "3135",
        "owners": [
            "Pune"
        ]
    },
    {
        "surveyNo": "10",
        "location": "Siolim",
        "area": "3132",
        "owners": [
            "Nagpur"
        ]
    }
];
var seedData = [
  {
    "survey": "18",
    "location": "Panjim",
    "area": "3135",
    "owner": "Pune",
    "aadhar": "000000000001"
  },
  {
    "survey": "10",
    "location": "Siolim",
    "area": "3132",
    "owner": "Nagpur",
    "aadhar": "000000100002"
  }
  ];
if (env === 'development') {
  //seedData = require('./seedData');
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