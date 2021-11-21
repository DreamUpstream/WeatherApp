const MeteoApi = require('../services/MeteoApi');

const express = require('express');
const router = express.Router();

router.get('/places/find/:name', function(req, res, next) {
	MeteoApi.getPlaces().then(places => {
		places = places.filter(p => p.code.toLowerCase().startsWith(req.params.name.toLowerCase()));

		places = places.slice(0, 10);

		res.json(places);
	});
});


router.get(`/forecast/find/:search`, function(req, res, next) {
	MeteoApi.getPlaceForecasts(req.params.search).then(forecast => {
		res.json(forecast);
	});
});

router.get(`/location/find/:coordinates`, function(req, res, next) {
	MeteoApi.getTown(req.params.coordinates).then(town => {
		res.send(town);
	});
});

module.exports = router;
