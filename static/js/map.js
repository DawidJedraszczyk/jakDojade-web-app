const key = "IxmPLKm91oEjak7Z2vBc";
let options = {
  minZoom: 13,
  maxZoom: 18,
};
let routingControlFirstBus = null;
let routingControlSecondBus = null;
const map = L.map("map", options).setView([51.6496, 17.79], 14);
L.tileLayer(
  "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=sW51Ka9SDh7VHvKJS7cR",
  {
    attribution:
      '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
  }
).addTo(map);
let removeRoutingControl = function () {
  if (routingControlFirstBus != null) {
    map.removeControl(routingControlFirstBus);
    routingControlFirstBus = null;
  }
  if (routingControlSecondBus != null) {
    map.removeControl(routingControlSecondBus);
    routingControlSecondBus = null;
  }
};
const icon = L.icon({
  iconUrl: "static/img/bus-stop-map.png",
  iconSize: [15, 15],
});

function drawRoute(array) {
  removeRoutingControl();
  routingControlFirstBus = L.Routing.control({
    waypoints: array[0],
    lineOptions: {
      styles: [{ color: "purple", opacity: 0.7, weight: 4 }],
    },
    fitSelectedRoutes: false,
    show: false,
    createMarker: function (i, wp) {
      return L.marker(wp.latLng, {
        draggable: false,
        icon,
      });
    },
  }).addTo(map);
  routingControlSecondBus = L.Routing.control({
    waypoints: array[1],
    lineOptions: {
      styles: [{ color: "green", opacity: 0.7, weight: 4 }],
    },
    fitSelectedRoutes: false,
    show: false,
    createMarker: function (i, wp) {
      return L.marker(wp.latLng, {
        draggable: false,
        icon,
      });
    },
  }).addTo(map);
}
