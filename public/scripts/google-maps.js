function initMap() {
  // The location of an initial position 
  const initialPos = { lat: 24.7135517, lng: 46.6752957 };
  const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: initialPos,
  });

  // The marker, positioned at the initial position
  let marker = new google.maps.Marker({
      position: initialPos,
      map: map,
      draggable: true,
  });

  const input = document.getElementById('locationInput');
  const shortInput = document.getElementById('shortAddress')
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

  autocomplete.addListener('place_changed', function() {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
          window.alert("No details available for input: '" + place.name + "'");
          return;
      }

      if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
      } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      updateInputField(place.formatted_address || `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`);
  });

  map.addListener('click', function(e) {
      const latLng = e.latLng;
      marker.setPosition(latLng);
      reverseGeocode(latLng);
  });

  	function reverseGeocode(latLng) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latLng },
	function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				var address = "", city = "", street = "", country = "", formattedAddress = "";
                for (var i = 0; i < results[0].address_components.length; i++) {
            	    var addr = results[0].address_components[i];
                    if (addr.types[0] == 'country')
                        country = addr.long_name;
                    else if (addr.types[0] == 'street_address')
						street = street + addr.long_name;
					else if (addr.types[0] == 'establishment')
						street = street + addr.long_name;
					else if (addr.types[0] == 'route')
						street = street + addr.long_name;
					else if (addr.types[0] == ['locality'])
						city = addr.long_name;
				}
				if (street != "") {
					address = street +", ";
				}
				address += city;
				
                if (results[0].formatted_address != null) {
					formattedAddress = results[0].formatted_address;
				}
				updateInputField(formattedAddress, address);
			}
		}
    });
  	}

  function updateInputField(address, shortAddress) {
      input.value = address;
	  shortInput.value = shortAddress;
  }
}
