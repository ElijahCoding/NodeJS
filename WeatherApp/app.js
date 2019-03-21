const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


forecast(-73.9808, 40.7648, (error, data) => {
    console.log('ERROR:', error)
    console.log('DATA:', data)
})

// geocode('New York', (error, data) => {
//     console.log('ERROR: ', error);
//     console.log('DATA: ', data);
// })
