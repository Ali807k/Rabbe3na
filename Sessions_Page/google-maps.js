function initMap() {
  // The location of an initial position
  const initialPos = { lat: 22.7554, lng: 46.2092 };
  const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: initialPos,
  });

  // The marker, positioned at the initial position
  let marker = new google.maps.Marker({
      position: initialPos,
      map: map,
      draggable: true,
  });

  const input = document.getElementById('locationInput');
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
      geocoder.geocode({ 'location': latLng }, function(results, status) {
          if (status === 'OK') {
              if (results[0]) {
                  updateInputField(results[0].formatted_address);
              } else {
                  updateInputField('No address found');
              }
          } else {
              updateInputField('Geocoder failed due to: ' + status);
          }
      });
  }

  function updateInputField(address) {
      input.value = address;
  }
}
