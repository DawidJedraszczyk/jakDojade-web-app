/* function createRoute(route) {
  $("#selectedRoute").empty();
  document.getElementById("foundRoutes").style.visibility = "hidden";
  let container = document.getElementById("selectedRoute");
  let el = document.createElement("div");
  if (route[1].length > 0) {
    var busNr1 = route[0][0].split("r");
    var busNr2 = route[1][0].split("r");
  } else {
    var busNr1 = route[0][0].split("r");
  }
  console.log(route);
  //for (let i = 0; i < route[0][1].length; i++) {
  //  console.log(route[0][1][i]);
  //}
  el.innerHTML =
    `<div class="busInformations"><img src="../img/arrow-icon.svg" /><div class="busName">` +
    busNr1[1] +
    `</div>` +
    route[0][1][route[0][1].length - 1][1] +
    `</div>`;
  var items = [];
  for (let i = 0; i < route[0][1].length; i++) {
    elem = createElement(
      route[0][1][i][0][0] + ":" + route[0][1][i][0][1] + route[0][1][i][1]
    );
    items.push(elem);
  }
  appendChildren(el, items);
  container.appendChild(el);
  if (busNr2) {
    let el = document.createElement("div");
    el.innerHTML =
      `<div class="busInformations"><img src="../img/arrow-icon.svg" /><div class="busName">` +
      busNr2[1] +
      `</div>` +
      route[1][1][route[1][1].length - 1][1] +
      `</div>`;
    var items = [];
    for (let i = 0; i < route[1][1].length; i++) {
      elem = createElement(
        route[1][1][i][0][0] + ":" + route[1][1][i][0][1] + route[1][1][i][1]
      );
      items.push(elem);
    }
    appendChildren(el, items);
    container.appendChild(el);
  }
  //container.appendChild(el);
  document.getElementById("selectedRoute").style.visibility = "visible";
}

function createElement(text) {
  var p = document.createElement("p");
  p.textContent = text;
  return p;
}

function appendChildren(parent, children) {
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
 */
function createRouteDetails() {
  document.querySelectorAll(".route").forEach((element) => {
    element.addEventListener("click", function (event) {
      let result = element.lastChild.childNodes[1].textContent;
      result = result.split(",");
      console.log(result);
      results = showRoute(result);
      showDetails(results, result[0], result[5]);
      let coordinates = [[], []];
      for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[i].length; j++) {
          coordinates[i].push(results[i][j][2]);
        }
      }
      drawRoute(coordinates);
    });
  });
}

function showDetails(stopsData, firstBus, secondBus) {
  firstBus = firstBus.split("r")[1];
  secondBus = secondBus.split("r")[1];
  console.log(stopsData, firstBus, secondBus);
  let detailsContainer = document.getElementById("departureHours");
  let firstBusModal =
    '<div class="busModal" id="firstBusModal"><div class="headerModal"><img src="static/img/bus-icon.png" style="width: 20px; height: 20px;"/>' +
    firstBus +
    "</div><div id='dataFirstBus'></div></div>";
  let secondBusModal =
    '<div class="busModal" id="secondBusModal"><div class="headerModal"><img src="static/img/bus-icon.png" style="width: 20px; height: 20px;"/>' +
    secondBus +
    "</div><div id='dataSecondBus'></div></div>";
  detailsContainer.innerHTML = "";
  if (secondBus) {
    detailsContainer.innerHTML +=
      firstBusModal +
      secondBusModal +
      '<img id="arrow-icon-hours" class="arrow-icon" src="static/img/arrow-icon.svg"/>';
  } else {
    detailsContainer.innerHTML +=
      firstBusModal +
      '<img id="arrow-icon-hours" class="arrow-icon" src="static/img/arrow-icon.svg"/>';
  }
  for (let i = 0; i < stopsData[0].length; i++) {
    document.getElementById("dataFirstBus").innerHTML +=
      "<p>" +
      stopsData[0][i][1][0] +
      ":" +
      stopsData[0][i][1][1] +
      " " +
      stopsData[0][i][0] +
      "</p>";
  }
  if (secondBus) {
    for (let i = 0; i < stopsData[1].length; i++) {
      document.getElementById("dataSecondBus").innerHTML +=
        "<p>" +
        stopsData[1][i][1][0] +
        ":" +
        stopsData[1][i][1][1] +
        " " +
        stopsData[1][i][0] +
        "</p>";
    }
  }
  detailsContainer.style.display = "flex";
  document
    .getElementById("arrow-icon-hours")
    .addEventListener("click", function () {
      detailsContainer.style.display = "none";
    });
}
