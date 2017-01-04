(function(){

  var github = ($http) => {

    var getUser = (username) => {
      return $http.get("https://api.github.com/users/"+username)
        .then((res) => {
          return res.data;
        })
    }

    var getRepos = (user) => {
      return $http.get(user.repos_url)
        .then((res) => {
          return res.data;
        })
    }

    var getRepoDetails = (username, reponame) => {
      var repo;
      var repoUrl = `https://api.github.com/repos/${username}/${reponame}`
      return $http.get(repoUrl)
        .then((res) => {
          repo = res.data;
          return $http.get(`${repoUrl}/collaborators`)
        })
        .then((res) => {
          repo.collaborators = res.data;
          return repo;
        })
    }

    return {
      getUser,
      getRepos,
      getRepoDetails
    }


  }

  var app = angular.module("myApp");
  app.factory("github", github);


}());
