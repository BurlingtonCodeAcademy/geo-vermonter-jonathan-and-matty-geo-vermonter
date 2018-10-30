let lat = 0;
let long = 0;
const counties = ["Addison County", "Bennington County", "Caledonia County", "Chittenden County", "Essex County", "Franklin County", "Grand Isle County", "Lamoille County", "Orange County", "Orleans County", "Rutland County", "Washington County", "Windham County", "Windsor County"];

function start() {
  document.getElementById('start').disabled = true;
  document.getElementById('guess').disabled = false;
  document.getElementById('quit').disabled = false;
  lat = 44.47613;
  long = -73.2119;
}

function guess() {
  document.getElementById('guessguess').innerHTML = "<button id='guessbutton'>Guess</button>";
  document.getElementById('cancelguess').innerHTML = "<button id='cancelbutton'>Cancel</button>";
  document.getElementById('guesslist').innerHTML = "What county are we in?<form>";
  for (county of counties) {
    document.getElementById('guesslist').innerHTML += `<div><input type="radio" name="type" id="${county}">${county}</input></div>`;
  }
  document.getElementById('guesslist').innerHTML += "</form>";
}

function quit() {
  document.getElementById('start').disabled = false;
  document.getElementById('guess').disabled = true;
  document.getElementById('quit').disabled = true;
  if (lat != 0 && long != 0) {
    document.getElementById('longitude').innerHTML = long;
    document.getElementById('latitude').innerHTML = lat;
  }
}

function drawMap(lat, long, zoomL, mLat, mLong) {
  document.getElementById("map").innerHTML = '';
  let myMap = L.map('map', { zoomControl: false }).setView([lat, long], zoomL);
  mapLink =
      '<a href="http://www.esri.com/">Esri</a>';
  wholink =
      'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
  L.tileLayer(
      'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; ' + mapLink + ', ' + wholink,
          maxZoom: 18,
          minZoom: 1,
      }).addTo(myMap);
  L.geoJSON(county_data, { color: 'black', fillOpacity: '.6', weight: 2 }).addTo(myMap);
  myMap.dragging.disable();
  myMap.touchZoom.disable();
  myMap.doubleClickZoom.disable();
  myMap.scrollWheelZoom.disable();
  myMap.boxZoom.disable();
  myMap.keyboard.disable();
  myMarker = L.marker([mLat, mLong]).addTo(map);
}
