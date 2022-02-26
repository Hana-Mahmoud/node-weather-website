const request = require('request')
const geoCode = (address, callback) => { 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiaGFuYTk4IiwiYSI6ImNremU0MmNueTJmbDgydm45bGl5c2pwNGEifQ.HwX592UWa6MtyfwlQbyl1Q'
    
    request({url, json: true},(error,{body})=>{
        if (error) {
            callback('unable to connect to location service!',undefined)
        }
        else if (body.features.length ===0 ) {
            callback('unable to find location try another search!');
        }
        else {
        callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
    }
        );
        }
    })
    }
module.exports= geoCode