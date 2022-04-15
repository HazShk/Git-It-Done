var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var getUserRepos = function (user) {
  //format the github api url

  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  //make a request to the url
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(event);

  //get value from input element
  var userName = nameInputEl.value.trim();
  if (userName) {
    getUserRepos(userName);
    //clear the input value
    userName = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);
