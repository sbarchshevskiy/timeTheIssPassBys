const { nextISSTimesForMyLocation } = require('./iss');

const issFlyByTimes = function(flyBys) {
  for (let pass of flyBys) {
    const currentTime = new Date(0);
    currentTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${currentTime} for ${duration} seconds`);
  }
};

nextISSTimesForMyLocation((error, flyBys) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  issFlyByTimes(flyBys);
});

