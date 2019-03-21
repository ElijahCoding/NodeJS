const request = require('request')

const url = 'https://api.darksky.net/forecast/b2e89c649de07edcbac002d14b8812fa/37.8267,-122.4233'

request(url, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.currently);
})
