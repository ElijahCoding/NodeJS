const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `
        https://api.darksky.net/forecast/b2e89c649de07edcbac002d14b8812fa/${latitude},${longitude}
    `
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect weather server.', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily)
        }
    })
}

module.exports = forecast
