/* fetch("static/JSON/newJson.json")
  .then((response) => {
    return response.json();
  })
  .then((stops) => findLatLen(stops));

function findLatLen(stopName) {
  for (let i = 0; i < stops["features"].length; i++) {
    if (stops["features"][i]["properties"]["name"] == stop) {
      console.log(stops["features"][i]["geometry"]["coordinates"]);
      break;
    }
  }
}
 */
/* document.getElementById("search-btn").addEventListener("click", searchClicked);
function searchClicked() {
  results = findRoute();
  createElements(results); //function from createRoutes
} */
/* document.body.addEventListener("click", function (event) {
  //for (let elem = 0; elem < event.path.length; elem++) {
  if (event.target.className == "infoContainer") {
    result = event.target.firstElementChild.innerHTML;
  } else if (event.target.className == "route") {
    result = event.path[0].children[1].firstElementChild.innerHTML;
  } else if (event.target.className == "buses") {
    result = event.path[1].firstElementChild.innerHTML;
  } else if (event.target.className == "hours") {
    result = event.path[1].firstElementChild.innerHTML;
  } else if (event.target.className == "deportureTimeH1") {
    result = event.path[2].children[1].firstElementChild.innerHTML;
  } else if (event.target.className == "hoursP") {
    result = event.path[2].firstElementChild.innerHTML;
  } else if (event.target.className == "busesP") {
    result = event.path[4].children[1].children[0].innerHTML;
  } else if (event.target.className == "deportureTime") {
    result = event.path[1].children[1].children[0].innerHTML;
  }
  console.log(result);
  results = showRoute(result);
  //console.log(results);
  createRoute(results);
}); */

function showRoute(res) {
  firstStation = document.getElementById("firstStation").value;
  goalStation = document.getElementById("goalStation").value;
  const dict_values = { firstStation, goalStation, res };
  console.log(dict_values);
  const json_data = JSON.stringify(dict_values);
  let variants = $.ajax({
    url: "/showRoute",
    type: "POST",
    contentType: "application/json",
    async: false,
    data: JSON.stringify(json_data),
  });
  return variants.responseJSON;
}

function findRoute() {
  firstStation = document.getElementById("firstStation").value;
  goalStation = document.getElementById("goalStation").value;
  hour = document.getElementById("hour").value;
  const dict_values = { firstStation, goalStation, hour };
  const json_data = JSON.stringify(dict_values);
  let variants = $.ajax({
    url: "/test",
    type: "POST",
    contentType: "application/json",
    async: false,
    data: JSON.stringify(json_data),
  });
  return variants.responseJSON;
}

function findBusDetails(busName) {
  const dict_values = { busName };
  const json_data = JSON.stringify(dict_values);
  let variants = $.ajax({
    url: "/findBusDetails",
    type: "POST",
    contentType: "application/json",
    async: false,
    data: JSON.stringify(json_data),
  });
  return variants.responseJSON;
}

function getDepartureHours(busName, stopName, direction) {
  const dict_values = { busName, stopName, direction };
  const json_data = JSON.stringify(dict_values);
  let variants = $.ajax({
    url: "/getDepartureHours",
    type: "POST",
    contentType: "application/json",
    async: false,
    data: JSON.stringify(json_data),
  });
  return variants.responseJSON;
}
