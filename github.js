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

    return {
      getUser,
      getRepos
    }


  }

  var module = angular.module("myApp");
  module.factory("github", github);


}());
