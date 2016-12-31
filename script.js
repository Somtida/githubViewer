(function() {


  var app = angular.module('myApp',[]);

  var mainCtrl = function($scope, $http) {
   // $scope.message = "Hello Y'all";

    $scope.inputName = "somtida";

    var completedUser = (res) => {
      $scope.user = res.data;
      $http.get($scope.user.repos_url)
        .then(completedRepo, error)
    }

    var completedRepo = (res) => {
      $scope.repos = res.data;
    }

    var error = () => {
      $scope.error = "Counld not fetch the user";
    }

    $scope.search = () => {
      $http.get("https://api.github.com/users/"+$scope.inputName)
        .then(completedUser, error);
    }




  }

  app.controller("mainCtrl", ["$scope", "$http", mainCtrl])


}());
