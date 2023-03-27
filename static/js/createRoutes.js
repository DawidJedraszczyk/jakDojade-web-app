document.getElementById("search-btn").addEventListener("click", function () {
  results = findRoute();
  createElements(results);
  document.getElementById("routeContainer").style.display = "none";
  document.getElementById("foundRoutes").style.display = "block";
  document.getElementById("back-btn").style.display = "block";
  createRouteDetails();
  let backBtn = document.getElementById("back-btn");
  backBtn.addEventListener("click", backFunctionRoutes);
});

function createElements(array) {
  $("#foundRoutes").empty();
  const container = document.getElementById("foundRoutes");
  //container.innerHTML += '<div id="back-btn">wstecz</div>';
  array.forEach(function (arrayElement) {
    //console.log(arrayElement);
    const el = document.createElement("div");
    el.classList.add("route");
    if (arrayElement["firstStationHour"][0] > 9) {
      var deportureHour = arrayElement["firstStationHour"][0];
    } else {
      var deportureHour = "0" + arrayElement["firstStationHour"][0];
    }
    if (arrayElement["firstStationHour"][1] > 9) {
      var deportureMinute = arrayElement["firstStationHour"][1];
    } else {
      var deportureMinute = "0" + arrayElement["firstStationHour"][1];
    }
    if (arrayElement["secondBus"] != null) {
      var busNr1 = arrayElement["firstBus"].split("r");
      var busNr2 = arrayElement["secondBus"].split("r");
      var buses =
        '<div class="buses"><div class="busImgAndNumber"><img id="id1" src="/static/img/bus-icon.svg" /><p class="busesP">' +
        busNr1[1] +
        '</p><img id="id1" src="/static/img/bus-icon.svg" /><p class="busesP">' +
        busNr2[1] +
        "</p></div></div>";
    } else {
      var busNr1 = arrayElement["firstBus"].split("r");
      var buses =
        '<div class="buses"><div class="busImgAndNumber"><img id="id1" src="/static/img/bus-icon.svg" /><p class="busesP">' +
        busNr1[1] +
        "</p></div></div>";
    }
    el.innerHTML =
      `<div class="deportureTime">
    Odjazd o:
    <h1 class="deportureTimeH1">` +
      deportureHour +
      ":" +
      deportureMinute +
      `</h1>
  </div>
  <div class="infoContainer">
    <div class="hiddenInfo">` +
      arrayElement +
      `</div>
    ` +
      buses +
      `
    <div class="hours">
      <p class="hoursP">` +
      deportureHour +
      ":" +
      deportureMinute +
      `</p>
      <p class="hoursP">` +
      arrayElement["lastStationArivalHour"][0] +
      ":" +
      arrayElement["lastStationArivalHour"][1] +
      `</p>
      ` +
      arrayElement["timeOnTravel"][0] +
      ":" +
      arrayElement["timeOnTravel"][1] +
      `
    </div>`;
    container.appendChild(el);
  });
  document.getElementById("foundRoutes").style.visibility = "visible";
}

function backFunctionRoutes() {
  document.getElementById("routeContainer").style.display = "block";
  document.getElementById("foundRoutes").style.display = "none";
  document.getElementById("back-btn").style.display = "none";
  document
    .getElementById("back-btn")
    .removeEventListener("click", backFunctionRoutes);
}
