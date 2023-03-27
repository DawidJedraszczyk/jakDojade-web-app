let busClass = document.getElementsByClassName("bus");
let currentlyClickedDirection = 0;

for (let i = 0; i < busClass.length; i++) {
  busClass[i].addEventListener("click", function () {
    document
      .getElementById("back-btn")
      .removeEventListener("click", backFunctionRoutes);
    let busNumber = busClass[i].textContent;
    let clickedBus = busClass[i].id;

    let backBtn = document.getElementById("back-btn");
    backBtn.style.display = "block";
    backBtn.style.marginLeft = "25px";
    results = findBusDetails(clickedBus);
    createBusDetails(clickedBus, busNumber, results);
    backBtn.addEventListener("click", backFunction);
  });
}
function backFunction() {
  let backBtn = document.getElementById("back-btn");
  backBtn.style.display = "none";
  document.getElementById("busDetails").style.display = "none";
  document.getElementById("scheduleContainer").style.display = "flex";
  backBtn.removeEventListener("click", backFunction);
}

function createBusDetails(clickedBusDivId, busName, stopsLists) {
  document.getElementById("scheduleContainer").style.display = "none";
  document.getElementById("routeContainer").style.display = "none";
  stopsLists[0] = stopsLists[0].substr(stopsLists[0].indexOf(" ") + 1);
  stopsLists[1] = stopsLists[1].substr(stopsLists[1].indexOf(" ") + 1);
  let busDetailsContainer = document.getElementById("busDetails");
  let firstDirectionModal =
    '<div class="selectRoute" id="firstDirection">' +
    stopsLists[0] +
    '<img src="/static/img/arrow-icon.svg" id="directionArrow1"/></div>';
  let secondDirectionModal =
    '<div class="selectRoute" id="secondDirection">' +
    stopsLists[1] +
    '<img src="/static/img/arrow-icon.svg" id="directionArrow2"/></div>';
  let routes =
    '<div id="routes">' + firstDirectionModal + secondDirectionModal + "</div>";
  busDetailsContainer.innerHTML = "";
  busDetailsContainer.innerHTML +=
    '<div id="detailsContainer"><div class="busName"><img src="/static/img/bus-icon.svg" style="width: 20px; height: 20px;"/><p>' +
    busName +
    "</p></div>" +
    routes;
  busDetailsContainer.style.display = "flex";
  let firstDirectionDiv = document
    .getElementById("firstDirection")
    .addEventListener("click", function () {
      createStops(1, stopsLists, busName);
    });
  let secondDirectionDiv = document
    .getElementById("secondDirection")
    .addEventListener("click", function () {
      createStops(2, stopsLists, busName);
    });
}

function createStops(direction, stopsLists, busName) {
  let firstDirectionModal =
    '<div class="selectRoute" id="firstDirection">' +
    stopsLists[0] +
    '<img src="/static/img/arrow-icon.svg" id="directionArrow1"/></div>';
  let secondDirectionModal =
    '<div class="selectRoute" id="secondDirection">' +
    stopsLists[1] +
    '<img src="/static/img/arrow-icon.svg" id="directionArrow2"/></div>';
  if (direction == 1) {
    let routesContainer = document.getElementById("routes");
    if (currentlyClickedDirection != 1) {
      routesContainer.innerHTML = "";
      routesContainer.innerHTML = firstDirectionModal;
      for (let i = 0; i < stopsLists[2].length; i++) {
        routesContainer.innerHTML +=
          '<div class="stopName"id="' +
          stopsLists[2][i] +
          '">' +
          (i + 1) +
          ". " +
          stopsLists[2][i] +
          "</div>";
      }
      routesContainer.innerHTML += secondDirectionModal;
      document.getElementById("directionArrow1").style.transform =
        "rotate(180deg)";
      currentlyClickedDirection = 1;
    } else {
      routesContainer.innerHTML = firstDirectionModal + secondDirectionModal;
      currentlyClickedDirection = 0;
    }
  } else {
    let routesContainer = document.getElementById("routes");
    if (currentlyClickedDirection != 2) {
      routesContainer.innerHTML = "";
      routesContainer.innerHTML = firstDirectionModal + secondDirectionModal;
      for (let i = stopsLists[2].length - 1; i >= 0; i--) {
        routesContainer.innerHTML +=
          '<div class="stopName" id="' +
          stopsLists[2][i] +
          '">' +
          (stopsLists[2].length - i) +
          ". " +
          stopsLists[2][i] +
          "</div>";
      }
      document.getElementById("directionArrow2").style.transform =
        "rotate(180deg)";
      currentlyClickedDirection = 2;
    } else {
      routesContainer.innerHTML = firstDirectionModal + secondDirectionModal;
      currentlyClickedDirection = 0;
    }
  }
  document
    .getElementById("firstDirection")
    .addEventListener("click", function () {
      createStops(1, stopsLists, busName);
    });
  document
    .getElementById("secondDirection")
    .addEventListener("click", function () {
      createStops(2, stopsLists, busName);
    });
  document.querySelectorAll(".stopName").forEach(function (element) {
    element.addEventListener("click", function (event) {
      let bus = "busNr" + busName;
      let stopName = event.target.id;
      let departureHours = getDepartureHours(
        bus,
        stopName,
        currentlyClickedDirection
      );
      createDepartureHours(
        busName,
        stopName,
        stopsLists[currentlyClickedDirection - 1],
        departureHours
      );
    });
  });
}

function createDepartureHours(busName, stopName, dir, listOfHours) {
  let hoursContainer = document.getElementById("departureHours");
  direction = dir.substr(dir.indexOf(":") + 1);
  hoursContainer.innerHTML =
    '<div class="busNameModal"><img src="/static/img/bus-icon.png" style="width: 20px; height: 20px;"/>' +
    busName +
    "</div>" +
    '<div class="directionModal"><img src="/static/img/direction.png" style="width: 20px; height: 20px;"/>' +
    direction +
    "</div>" +
    '<div class="stopNameModal"><img src="/static/img/bus-stop.png" style="width: 20px; height: 20px;"/>' +
    stopName +
    '</div><img id="arrow-icon-hours" class="arrow-icon" src="/static/img/arrow-icon.svg"/>';
  for (let i = 0; i < listOfHours.length; i++) {
    if (listOfHours[i][1] > 9 && listOfHours[i][0] > 9) {
      hoursContainer.innerHTML +=
        '<div class="hours">' +
        listOfHours[i][0] +
        " : " +
        listOfHours[i][1] +
        "</div>";
    } else if (listOfHours[i][1] <= 9 && listOfHours[i][0] > 9) {
      hoursContainer.innerHTML +=
        '<div class="hours">' +
        listOfHours[i][0] +
        " : 0" +
        listOfHours[i][1] +
        "</div>";
    } else if (listOfHours[i][1] > 9 && listOfHours[i][0] <= 9) {
      hoursContainer.innerHTML +=
        '<div class="hours">0' +
        listOfHours[i][0] +
        " : " +
        listOfHours[i][1] +
        "</div>";
    } else {
      hoursContainer.innerHTML +=
        '<div class="hours">0' +
        listOfHours[i][0] +
        " : 0" +
        listOfHours[i][1] +
        "</div>";
    }
  }
  hoursContainer.style.display = "flex";
  document
    .getElementById("arrow-icon-hours")
    .addEventListener("click", function () {
      hoursContainer.style.display = "none";
    });
}
