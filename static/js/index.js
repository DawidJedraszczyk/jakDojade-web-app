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
    document.getElementById("searchContainer").className =
      "searchContainer__hidden";
    document.getElementById("departureHours").style.display = "none";
  } else {
    document.getElementById("optionNav").className = "optionNav";
    document.getElementById("routeContainer").className = "routeContainer";
    document.getElementById("scheduleContainer").className =
      "scheduleContainer";
    document.getElementById("arrow-icon").className = "arrow-icon";
    document.getElementById("searchContainer").className = "searchContainer";
  }
}
function changeCurrentlyClicked(clicked) {
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

window.onload = function () {
  document.querySelector(".arrow-icon").addEventListener("click", function () {
    if (hiddenStatus) {
      hiddenStatus = false;
    } else {
      hiddenStatus = true;
    }
    changeHiddenClass();
  });
  document
    .querySelector(".optionNav")
    .addEventListener("click", function (event) {
      clicked = event.target.className;
      changeCurrentlyClicked(clicked);
      changeVisibilityInSearchContainer(clicked);
    });
};
