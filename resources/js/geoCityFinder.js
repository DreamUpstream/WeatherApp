import * as geofinder from './geolocationFinder';
import * as fcRender from './forecastRender';
import * as latin from './latiniser';

function getCity(coordinates) {
    let coordinatesv2 = ""+coordinates;
    coordinatesv2 = coordinatesv2.replaceAll(".","-");
    coordinatesv2 = coordinatesv2.replaceAll(",","_");
    return fetch(`/weather/location/find/${coordinatesv2}`).then(r => r.text()).then(town => {
        return town
	});
}

fcRender.renderer("Vilnius", "vilnius");

geofinder.getCoordintes().then(pos => {
    let crd = pos.coords;
    let lat = crd.latitude.toString();
    let lng = crd.longitude.toString();
    let coordinates = [lat, lng];
    String = latin.latinMaker();
    getCity(coordinates).then(city => {
        fcRender.renderer(city, city.latinise());
    });
});



