const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const IP = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${IP})`);
};

const fetchISSFlyOverTimes = function(body) {
  const location = JSON.parse(body);
  console.log('location: ',location);
  const url = `https://api.open-notify.org/iss-pass.json?lat=${location.latitude}&lon=${location.longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };

