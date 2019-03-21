const request = require('request')

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZWxpamFoOTYwOTA0IiwiYSI6ImNqdGluZXg0ZTAwOWM0M3FqYzFpOW8yeHYifQ.iPEBKI38blYmup7NSvGjKg'

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect map server.')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location')
    } else {
        const latitude = response.body.features[0].center[0]
        const longitude = response.body.features[0].center[1]
        console.log(latitude, longitude)

        const url = 'https://api.darksky.net/forecast/b2e89c649de07edcbac002d14b8812fa/37.8267,-122.4233'

        request({url, json: true}, (error, response) => {
            if (error) {
                console.log('Unable to connect weather server.')
            } else if (response.body.error) {
                console.log('Unable to find location')
            } else {
                console.log(response.body.daily)
            }
        })
    }
})
