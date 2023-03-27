fetch("static/JSON/allStops.json")
  .then((response) => {
    return response.json();
  })
  .then((words) => waitForInput(words));

function waitForInput(words) {
  document
    .getElementById("firstStation")
    .addEventListener(
      "Click",
      showSuggestion(words, "suggestionFirstStation", "firstStation")
    );
  document
    .getElementById("goalStation")
    .addEventListener(
      "Click",
      showSuggestion(words, "suggestionSecondStation", "goalStation")
    );
}

function showSuggestion(words, suggestionId, inputId) {
  //code from codingartistweb.com/2022/01/predictive-text-on-input-fields-html-css-javascript/
  let input = document.getElementById(inputId);
  let suggestion = document.getElementById(suggestionId);
  const enterKey = 13;

  window.onload = () => {
    input.value = "";
    clearSuggestion();
  };

  const clearSuggestion = () => {
    suggestion.innerHTML = "";
  };

  const caseCheck = (word) => {
    word = word.split("");
    let inp = input.value;
    for (let i in inp) {
      if (inp[i] == word[i]) {
        continue;
      } else if (inp[i].toUpperCase() == word[i]) {
        word.splice(i, 1, word[i].toLowerCase());
      } else {
        word.splice(i, 1, word[i].toUpperCase());
      }
    }
    return word.join("");
  };

  input.addEventListener("input", (e) => {
    clearSuggestion();
    let regex = new RegExp("^" + input.value, "i");
    for (let i in words) {
      if (regex.test(words[i]["nazwa"]) && input.value != "") {
        words[i] = caseCheck(words[i]["nazwa"]);
        suggestion.innerHTML = words[i];
        break;
      }
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.keyCode == enterKey && suggestion.innerText != "") {
      e.preventDefault();
      input.value = suggestion.innerText;
      clearSuggestion();
    }
  });
}
