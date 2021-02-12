const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));


nextISSTimesForMyLocation()
  .then((passTimes) => {
    issFlyByTimes(passTimes);
  })
  .catch((error) => {
    console.log('This did not work: ', error.message);
  });


const issFlyByTimes = function(flyBys) {
  for (let pass of flyBys) {
    const currentTime = new Date(0);
    currentTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${currentTime} for ${duration} seconds`);
  }
};
  
  