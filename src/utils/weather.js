const request = require('postman-request');

const weather = ({ longitude, latitude }, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f6c46d99fc4e10bfb0eae9a14530aafb&query=' + longitude + ',' + latitude;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' But it feels like ' + response.body.current.feelslike);
        }
    });
};

module.exports = weather;
