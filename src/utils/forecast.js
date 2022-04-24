const request = require('request')

const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=1f21e6662b82d4d491e40f6cde67f46b&query='+latitude+','+longitude+'&units=m'
request({url, json: true},(error, {body})=>{
        if(error){
            callback('unable to connect to weather service!',undefined);
        }   
        else if (body.error) {
    callback('Unable to find location!',undefined);
        }
        else {
            callback( undefined, body.current.weather_descriptions[0] +" it's currently "+ body.current.temperature+" degrees outer height. But it feels like "+ body.current.feelslike  + " ,and humidity is equal to " + body.current.humidity + "%." );
        }
     })
}
module.exports = forecast