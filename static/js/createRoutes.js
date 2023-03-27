document.getElementById("search-btn").addEventListener("click", function () {
  document.getElementById("back-btn").addEventListener("click", backFunction);
  document.getElementById("routeContainer").style.display = "none";
  document.getElementById("foundRoutes").style.display = "block";
  document.getElementById("back-btn").style.display = "block";

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
    if (arrayElement[6][0] > 9) {
      var deportureHour = arrayElement[6][0];
    } else {
      var deportureHour = "0" + arrayElement[6][0];
    }
    if (arrayElement[6][1] > 9) {
      var deportureMinute = arrayElement[6][1];
    } else {
      var deportureMinute = "0" + arrayElement[6][1];
    }
    if (arrayElement[1] != null) {
      var busNr1 = arrayElement[0].split("r");
      var busNr2 = arrayElement[1].split("r");
      var buses =
        '<div class="buses"><div class="busImgAndNumber"><img id="id1" src="/static/img/bus-icon.svg" /><p class="busesP">' +
        busNr1[1] +
        '</p><img id="id1" src="/static/img/bus-icon.svg" /><p class="busesP">' +
        busNr2[1] +
        "</p></div></div>";
    } else {
      var busNr1 = arrayElement[0].split("r");
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
      arrayElement[11][0] +
      ":" +
      arrayElement[11][1] +
      `</p>
      ` +
      arrayElement[5][0] +
      ":" +
      arrayElement[5][1] +
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
