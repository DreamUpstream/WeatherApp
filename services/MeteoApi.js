const request = require('request');

module.exports.getPlaces = function() {
	return new Promise(function(resolve) {
		request.get('https://api.meteo.lt/v1/places').then(response => {
			let places = JSON.parse(response.body);
			resolve(places);
		});
	});
}

module.exports.getPlaceForecasts = function(placeCode) {
	return new Promise(function(resolve) {
		request.get(`https://api.meteo.lt/v1/places/${placeCode}/forecasts/long-term`).then(response => {
			let places = JSON.parse(response.body);
			resolve(places);
		});
	});
}


module.exports.getTown = function(Coordinates) {
	let coordinatesv2 = Coordinates.replaceAll("-",".");
	coordinatesv2 = coordinatesv2.split(("_"));
	let lat = coordinatesv2[0];
	let lng = coordinatesv2[1];
	let gettext = "https://us1.locationiq.com/v1/reverse.php?key=pk.7e9ff657e0ebf4587f8e9d0072b456cb&lat=" + lat + "&lon=" + lng + "&format=json";
	return new Promise(function(resolve) {
		request.get(gettext).then(response => {
			let locationInfos = JSON.parse(response.body);
			if (locationInfos.address.town)
			resolve(locationInfos.address.town);
			else
			resolve(locationInfos.address.city);
		});
	});
}