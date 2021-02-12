const request = require('request');

const fetchMyIP = function(callback) {
  const path = {
    method : 'GET',
    url : 'https://api.ipify.org?format=json'
  };
  
  request(path, function(error, response, body) {
    const ip = JSON.parse(body).ip;
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, ip);
  });
 
};

const fetchCoordsByIP = function(ip, callback) {
  const path = {
    method : 'GET',
    url : 'https://freegeoip.app/json/' + ip
  };

  request(path, function(error, response, body) {
    const coords = JSON.parse(body);
    const location =
  {
    "longitude" : coords.longitude,
    "latitude" :  coords.latitude
  };

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geographic location. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, location);
  });

};

const fetchISSFlyOverTimes = function(coordinates, callback) {
  const path = {
    method : 'GET',
    url : `http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`

  };

  request(path, function(error, response, body) {

    const objectBody = JSON.parse(body);
    const flyBys = objectBody.response;

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flybys. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, flyBys);

  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log('errorIP', error);
      return callback(error, null);
    } else {
      fetchCoordsByIP(ip, function(error, coordData) {
        if (error) {
          console.log('errorLocation');
          return callback(error, null);
        } else {
          fetchISSFlyOverTimes(coordData, function(error, flyByData) {
            if (error) {
              console.log('errorISS');
              return callback(error, null);
            } else {
              if (error) {
                callback(error, null);
                return callback(error, null);
              }
              callback(null, flyByData);
            }
          });
        }
      });
    }
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };