import debounce from 'lodash.debounce';
import * as fcRender from './forecastRender';
import * as latin from './latiniser';

function loadPlaceForecasts(placeCode, placeName) {
	fcRender.renderer(placeName, placeCode);
}
const placeInput = document.querySelector('#place');
const placeSuggestions = document.querySelector('#place-suggestions');

placeInput.addEventListener('input', debounce(function() {
	String = latin.latinMaker();
	fetch(`/weather/places/find/${this.value.latinise()}`).then(r => r.json()).then(places => {
		placeSuggestions.innerHTML = '';
		for (let place of places) {
			let button = document.createElement('button');
			button.addEventListener('click', function() {
				button.classList.add('active');

				setTimeout(() => {
					placeSuggestions.innerHTML = '';
				}, 100);
				placeInput.value = place.name;
				loadPlaceForecasts(place.code, place.name);
			});

			button.classList.add('list-group-item', 'list-group-item-action');
			button.innerText = place.name;

			placeSuggestions.appendChild(button);
		}
	});
}, 500));