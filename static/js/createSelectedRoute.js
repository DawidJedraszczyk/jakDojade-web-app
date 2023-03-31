function createRouteDetails() {
  document.querySelectorAll(".route").forEach((element) => {
    element.addEventListener("click", function (event) {
      let result = element.lastChild.childNodes[1].textContent;
      result = result.split(",");
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
  let detailsContainer = document.getElementById("departureHours");
  let firstBusModal =
    '<div class="busModalsContainer"><div class="busModal" id="firstBusModal"><div class="headerModal"><img src="static/img/bus-icon.png" style="width: 20px; height: 20px;"/>' +
    firstBus +
    "</div><div id='dataFirstBus'></div></div>";
  let secondBusModal =
    '<div class="busModal" id="secondBusModal"><div class="headerModal"><img src="static/img/bus-icon.png" style="width: 20px; height: 20px;"/>' +
    secondBus +
    "</div><div id='dataSecondBus'></div></div></div>";
  detailsContainer.innerHTML = "";
  if (secondBus != undefined) {
    detailsContainer.innerHTML += firstBusModal + secondBusModal;
  } else {
    detailsContainer.innerHTML += firstBusModal;
  }
  detailsContainer.innerHTML +=
    '<img id="arrow-icon-hours" class="arrow-icon" src="static/img/arrow-icon.svg"/>';
  for (let i = 0; i < stopsData[0].length; i++) {
    if (stopsData[0][i][1][0] > 9 && stopsData[0][i][1][1] > 9) {
      document.getElementById("dataFirstBus").innerHTML +=
        "<p>" +
        stopsData[0][i][1][0] +
        ":" +
        stopsData[0][i][1][1] +
        " " +
        stopsData[0][i][0] +
        "</p>";
    } else if (stopsData[0][i][1][0] <= 9 && stopsData[0][i][1][1] > 9) {
      document.getElementById("dataFirstBus").innerHTML +=
        "<p>0" +
        stopsData[0][i][1][0] +
        ":" +
        stopsData[0][i][1][1] +
        " " +
        stopsData[0][i][0] +
        "</p>";
    } else if (stopsData[0][i][1][0] > 9 && stopsData[0][i][1][1] <= 9) {
      document.getElementById("dataFirstBus").innerHTML +=
        "<p>" +
        stopsData[0][i][1][0] +
        ":0" +
        stopsData[0][i][1][1] +
        " " +
        stopsData[0][i][0] +
        "</p>";
    } else {
      document.getElementById("dataFirstBus").innerHTML +=
        "<p>0" +
        stopsData[0][i][1][0] +
        ":0" +
        stopsData[0][i][1][1] +
        " " +
        stopsData[0][i][0] +
        "</p>";
    }
  }
  if (secondBus) {
    for (let i = 0; i < stopsData[1].length; i++) {
      if (stopsData[1][i][1][0] > 9 && stopsData[1][i][1][1] > 9) {
        document.getElementById("dataSecondBus").innerHTML +=
          "<p>" +
          stopsData[1][i][1][0] +
          ":" +
          stopsData[1][i][1][1] +
          " " +
          stopsData[1][i][0] +
          "</p>";
      } else if (stopsData[1][i][1][0] <= 9 && stopsData[1][i][1][1] > 9) {
        document.getElementById("dataSecondBus").innerHTML +=
          "<p>0" +
          stopsData[1][i][1][0] +
          ":" +
          stopsData[1][i][1][1] +
          " " +
          stopsData[1][i][0] +
          "</p>";
      } else if (stopsData[1][i][1][0] > 9 && stopsData[1][i][1][1] <= 9) {
        document.getElementById("dataSecondBus").innerHTML +=
          "<p>" +
          stopsData[1][i][1][0] +
          ":0" +
          stopsData[1][i][1][1] +
          " " +
          stopsData[1][i][0] +
          "</p>";
      } else {
        document.getElementById("dataSecondBus").innerHTML +=
          "<p>0" +
          stopsData[1][i][1][0] +
          ":0" +
          stopsData[1][i][1][1] +
          " " +
          stopsData[1][i][0] +
          "</p>";
      }
    }
    detailsContainer.style.width = "420px";
    document
      .getElementById("arrow-icon-hours")
      .addEventListener("click", function () {
        detailsContainer.style.width = "0px";
      });
  }
}
