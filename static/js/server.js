function showRoute(res) {
  firstStation = document.getElementById("firstStation").value;
  goalStation = document.getElementById("goalStation").value;
  const dict_values = { firstStation, goalStation, res };
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
