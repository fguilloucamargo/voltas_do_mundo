import mapboxgl from 'mapbox-gl';

const initMapbox = () => {
  const mapElement = document.getElementById('map');
  var count = 0;
  var colors = ['#A364D9', '#ED657B', '#DB3839', '#F66320', '#F9A229', '#FECC30', '#B2C324', '#34BEB7', '#3FA5D8']

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    if (screen.width >= 768) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/fguilloucamargo/ckd75pwh20e6g1io4utxsda1f?optimize=true',
        center: [0, 15],
        zoom: 1.2
      });
      const markers = JSON.parse(mapElement.dataset.markers);
      markers.forEach((marker) => {
        const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
        new mapboxgl.Marker( {color: '#3d348b', scale: 0.5})
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(map);
      });

      fetch("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson")
      .then(reponse => reponse.json())
      .then((data) => {
        data.features.forEach (element => {
          if(mapElement.dataset.country.includes(element.properties.admin)) {
            map.on('load', function() {
              if(count < colors.length - 1) {
                count = count + 1;
              } else {
                count = 0;
              }
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
                  'fill-color': colors[count],
                  'fill-opacity': 0.9
                  }
              });
              map.moveLayer(element.properties.admin, 'country-label');
              map.moveLayer(element.properties.admin, 'state-label');
              map.moveLayer(element.properties.admin, 'settlement-major-label');
              map.moveLayer(element.properties.admin, 'settlement-minor-label');
            })
          };
        });
      })
    } else {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/fguilloucamargo/ckd75pwh20e6g1io4utxsda1f?optimize=true',
        center: [-10, 10],
        zoom: 0
      });
      const markers = JSON.parse(mapElement.dataset.markers);
      markers.forEach((marker) => {
        const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
        new mapboxgl.Marker( {color: '#3d348b', scale: 0.5})
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(map);
      });

      fetch("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson")
      .then(reponse => reponse.json())
      .then((data) => {
        data.features.forEach (element => {
          if(mapElement.dataset.country.includes(element.properties.admin)) {
            map.on('load', function() {
              if(count < colors.length - 1) {
                count = count + 1;
              } else {
                count = 0;
              }
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
                  'fill-color': colors[count],
                  'fill-opacity': 0.9
                  }
              });
              map.moveLayer(element.properties.admin, 'country-label');
              map.moveLayer(element.properties.admin, 'state-label');
              map.moveLayer(element.properties.admin, 'settlement-major-label');
              map.moveLayer(element.properties.admin, 'settlement-minor-label');
            })
          };
        });
      })
    }
  };
};

export { initMapbox };


