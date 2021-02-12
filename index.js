const request = require('request');
const http = require('http');
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, flyBys) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log('flybys: ',flyBys);
});

