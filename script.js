(function() {


  var app = angular.module('myApp',[]);

  var mainCtrl = function($scope, $http, $interval) {
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

    $scope.search = (inputName) => {
      $http.get("https://api.github.com/users/"+inputName)
        .then(completedUser, error);
    }

    var decrementCountdown = () => {
      $scope.countdown -= 1;
      if($scope.countdown < 1) {
        $scope.search($scope.inputName);
      }
    }

    var startCountdown = () => {
      $interval(decrementCountdown, 1000, $scope.countdown);
    }

    $scope.countdown = 5;
    startCountdown();




  }

  app.controller("mainCtrl", ["$scope", "$http", "$interval", mainCtrl])


}());
