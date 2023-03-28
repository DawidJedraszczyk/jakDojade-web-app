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
      detailsContainer = document.getElementById("departureHours");
      detailsContainer.style.display = "flex";
      let result = element.lastChild.childNodes[1].textContent;
      result = result.split(",");
      results = showRoute(result);
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
