import mapboxgl from 'mapbox-gl';

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/fguilloucamargo/ckd75pwh20e6g1io4utxsda1f',
      center: [0, 15],
      zoom: 1.2
    });
    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
      new mapboxgl.Marker( {color: '#3d348b', scale: 0.7})
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(map);
    });

    fetch("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson")
    .then(reponse => reponse.json())
    .then((data) => {
      data.features.forEach (element => {
        if(mapElement.dataset.country.includes(element.properties.admin)) {
          console.log(element.properties.admin)
          var colors = ['#2F5755', '#54C6BE', '#F7B15C', '#F65C51', '#E5243F'];

          map.on('load', function() {

          map.addSource(element.properties.admin, {
            "type": "geojson",
            "data": {
              "type": "Feature",
              "geometry": element.geometry
            }
          });

          map.addLayer({
            id: element.properties.admin,
            type: 'fill',
            source: element.properties.admin,
            paint: {
              'fill-color': colors[Math.floor(Math.random() * colors.length)],
              'fill-opacity': 0.7
              }
          });

        })
        }
      });
    })
  };
};

export { initMapbox };


