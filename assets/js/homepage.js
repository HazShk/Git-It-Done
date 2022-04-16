var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function (user) {
  //format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  //make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      //using the response object property = ok
      if (response.ok) {
        response.json().then(function (data) {
          /*console.log(data);
              data being sent from getuserrepos() to displayrepos()*/
          displayRepos(data, user);
        });
      } else {
        window.alert("Error: GitHub User Not Found");
      }
    })
    .catch(function (error) {
      //catching network errors
      window.alert("Unable to connect to Github");
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

//function to display repos

var displayRepos = function (repos, searchTerm) {
  //check if api returned any repo or is any empty array
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found";
    return;
  }
  console.log(repos);
  //console.log(searchTerm);
  //clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  //loop over repos
  for (var i = 0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.className = "list-item flex-row justify-space-between align-center";

    //create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append to container
    repoEl.appendChild(titleEl);

    //append container to dom
    repoContainerEl.appendChild(repoEl);

    //create a status element ti display github issues
    var statusEl = document.createElement("span");
    statusEl.className = "flex-row align-center";

    //check if current repo has github issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      ("<i class='fas fa-check-square status-icon icon-success'></i>");
    }

    //append to container
    repoEl.appendChild(statusEl);
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);
