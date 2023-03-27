const key = "IxmPLKm91oEjak7Z2vBc";
const map = L.map("map").setView([51.6496, 17.79], 14);
L.tileLayer(
  "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=sW51Ka9SDh7VHvKJS7cR",
  {
    attribution:
      '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
  }
).addTo(map);

function drawRoute(array) {
  L.Routing.control({
    waypoints: array,
    show: false,
  }).addTo(map);
}
