const API_KEY = "pk.eyJ1Ijoia2hhbGVkY29kZXMiLCJhIjoiY2s1eDNybTRiMHQzaTNsczRwZmp3OHoydSJ9.aEVy9LRN1GRhVr2w6hKRMQ"

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url, function(data) {
  console.log(data.features)
  createFeatures(data.features);
});

var legend = L.control({position: 'bottomleft'});

// legend.onAdd = function (map) {

//   var div = L.DomUtil.create('div', 'info legend'),
//       grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//       labels = [];

//   // loop through our density intervals and generate a label with a colored square for each interval
//   for (var i = 0; i < grades.length; i++) {
//       div.innerHTML +=
//           '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//           grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//   }

//   return div;
// };

// legend.addTo(map);

function getColor(c)
{
  x = Math.ceil(c);
  switch (Math.ceil(x)) {
    case 1:
      return "#ffffcc";
    case 2:
      return "#c7e9b4";
    case 3:
      return "#7fcdbb";
    case 4:
      return "#41b6c4";
    case 5:
      return "#2c7fb8";
    default:
      return "#253494";
  }
}

function createFeatures(earthquakeData) {
  var earthquakes = L.geoJson(earthquakeData,{
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: feature.properties.mag*5,
        fillColor: getColor(feature.properties.mag),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9})
        .bindPopup("<h3>" + "Location: " + feature.properties.place +
          "</h3><hr><p>" + "Date/Time: " + new Date (feature.properties.time) + "<br>" +
          "Magnitude: " + feature.properties.mag + "</p>");
  }
})
createMap(earthquakes)}

function createMap(earthquakes) {

  

  var myMap = L.map("map", {
    center: [40.52, -108.67],
    zoom: 4,
    layers: [earthquakes]
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
}