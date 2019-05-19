require('dotenv').config();

const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const stylesService = mbxStyles({ accessToken: process.env.MAPBOX_TOKEN });

async function geocoder(location) {
	try {
		let response = await geocodingClient
		  .forwardGeocode({
		    query: location,
		    limit: 1
		  })
		  .send();

		console.log(response.body.features[0].geometry.coordinates);
	} catch(err) {
		console.log(err.message);
	}
}

geocoder('Alaska, US');
