(function() {
	ymaps.ready(init);
	var myMap;
	function init(){     
		myMap = new ymaps.Map("map", {
			center: [56.84, 60.60],
			zoom: 11
		});
	};
window.map = {
	getCoords: function (address) {
		let myGeocoder = ymaps.geocode(address);
		myGeocoder.then(
			function (res) {
				let coords = res.geoObjects.get(0).geometry.getCoordinates()
				myMap.setCenter(coords, 18);
				let myPlacemark = new ymaps.Placemark(coords, { hintContent: 'Моя метка!', balloonContent: 'Ура' });
				myMap.geoObjects.add(myPlacemark);
			},
			function (err) {
				alert('Ошибка');
			});
	}
};
})();