//hide search container
let hiddenStatus = false;

function changeHiddenClass() {
  if (hiddenStatus) {
    document.getElementById("optionNav").className = "optionNav__hidden";
    document.getElementById("routeContainer").className =
      "routeContainer__hidden";
    document.getElementById("scheduleContainer").className =
      "scheduleContainer__hidden";
    document.getElementById("arrow-icon").className = "arrow-icon__hidden";
    document.getElementById("arrow-icon").style.zIndex = 2;
    document.getElementById("searchContainer").className =
      "searchContainer__hidden";
    document.getElementById("departureHours").style.left = "0px";
  } else {
    document.getElementById("optionNav").className = "optionNav";
    document.getElementById("routeContainer").className = "routeContainer";
    document.getElementById("scheduleContainer").className =
      "scheduleContainer";
    document.getElementById("searchContainer").className = "searchContainer";
    document.getElementById("departureHours").style.left = "520px";
    document.getElementById("arrow-icon").className = "arrow-icon";
  }
}
function changeCurrentlyClicked(clicked) {
  document.getElementById("back-btn").style.display = "none";
  if (clicked === "schedule-btn") {
    document.getElementById("schedule-btn").style.color = "white";
    document.getElementById("route-btn").style.color = "#9b9b9b";
  } else {
    document.getElementById("schedule-btn").style.color = "#9b9b9b";
    document.getElementById("route-btn").style.color = "white";
  }
}
function changeVisibilityInSearchContainer(clicked) {
  if (clicked === "schedule-btn") {
    document.getElementById("foundRoutes").style.display = "none";
    document.getElementById("routeContainer").style.display = "none";
    document.getElementById("scheduleContainer").style.display = "flex";
    document.getElementById("scheduleContainer").style.visibility = "visible";
    document.getElementById("busDetails").style.display = "none";
  } else {
    document.getElementById("foundRoutes").style.display = "none";
    document.getElementById("busDetails").style.display = "none";
    document.getElementById("scheduleContainer").style.display = "flex";
    document.getElementById("scheduleContainer").style.visibility = "hidden";
    document.getElementById("routeContainer").style.display = "block";
  }
}
document.addEventListener("DOMContentLoaded", init, false);
function init() {
  document.getElementById("arrow-icon").addEventListener("click", function () {
    if (hiddenStatus) {
      hiddenStatus = false;
    } else {
      hiddenStatus = true;
    }
    changeHiddenClass();
  });
  document
    .getElementById("optionNav")
    .addEventListener("click", function (event) {
      clicked = event.target.className;
      changeCurrentlyClicked(clicked);
      changeVisibilityInSearchContainer(clicked);
    });
}
