var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function (repo) {
  //format the github api url
  var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  //make a request to the url
  fetch(apiURL).then(function (response) {
    //using the response object property = 0
    if (response.ok) {
      response.json().then(function (data) {
        //send data from getrepoissues() to displayissues()
        displayIssues(data);

        //check if api has paginated issues (more than 30)
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      window.alert("There was a problem with your request");
    }
  });
};

var displayIssues = function (issues) {
  //check if the repo has issues or not
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }
  //loop over issues
  for (var i = 0; i < issues.length; i++) {
    //create a link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.className = "list-item flex-row justify-space-between align-center";

    //retriving html_url property from issues object and setting it to an attribute"
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    //create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    //append to container
    issueEl.appendChild(titleEl);

    //create a type element
    var typeEl = document.createElement("span");

    //check if issue is an actual issue or a pull request, as per git hub API doc You can identify pull requests by the pull_request key
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    //append to container
    issueEl.appendChild(typeEl);

    //append to dom
    issueContainerEl.appendChild(issueEl);
  }
};

//display warning function
var displayWarning = function (repo) {
  // add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";

  var linkEl = document.createElement("a");
  linkEl.textContent = "see more issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  //append to warning container
  limitWarningEl.appendChild(linkEl);
};

getRepoIssues("angular/angular");
