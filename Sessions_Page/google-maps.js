function initMap() {
    // The location of an initial position
    const initialPos = { lat: -34.397, lng: 150.644 }; // Change these coordinates to your default location
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: initialPos,
    });
    
    // The marker, positioned at the initial position
    const marker = new google.maps.Marker({
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
  
      // If the place has a geometry, present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    });
  }