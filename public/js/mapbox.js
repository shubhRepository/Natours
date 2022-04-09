/*eslint-disable*/

export const displayMap = locations => {
  mapboxgl.accessToken = 'pk. eyJ1IjoicHJvc2hydW0iLCJhIjoiY2t2ZW9zbG4xMTZ3cDJ3bzh5cHBvazlhdSJ9.EwBcZeXyVSlMym4hpGznVg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/proshrum/ckveq78j74o1v15o8xczj3tqf',
    scrollZoom: false
  });

  // create bounds object
  const bounds = new mapboxgl.LngLatBounds();
  // set marker element and set its coordinates and add to map
  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates) // set latitude and longitude to marker
      .addTo(map);

    // add new popup for this marker location
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //extend bounds
    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds, {
    padding: {
      top: 150,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
