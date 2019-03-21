const request = require('request')

const url = 'https://api.darksky.net/forecast/b2e89c649de07edcbac002d14b8812fa/37.8267,-122.4233'

request({url, json: true}, (error, response) => {
    console.log(response.body.daily);
})

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZWxpamFoOTYwOTA0IiwiYSI6ImNqdGluZXg0ZTAwOWM0M3FqYzFpOW8yeHYifQ.iPEBKI38blYmup7NSvGjKg'

request({ url: geocodeURL, json: true }, (error, response) => {
    const latitude = response.body.features[0].center[0]
    const longitude = response.body.features[0].center[1]
    console.log(latitude, longitude);
})
