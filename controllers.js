(function() {


  var app = angular.module('myApp');

  var mainCtrl = function($scope, $interval, $location) {

    var decrementCountdown = () => {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.inputName);
      }
    }

    var countdownInterval = null;


    var startCountdown = () => {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    }

    $scope.search = (inputName) => {
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
      $location.path("/user/"+inputName)
    }

    $scope.inputName = "somtida";
    $scope.countdown = 5;
    startCountdown();

  }

  var userCtrl = function($scope, $routeParams, github) {

    var completedUser = (data) => {
      $scope.user = data;
      github.getRepos($scope.user)
        .then(completedRepo, error)
    }

    var completedRepo = (data) => {
      $scope.repos = data;
    }

    var error = () => {
      $scope.error = "Counld not fetch the user";
    }

    $scope.inputName = $routeParams.username;
    $scope.dataValue = "+name";
    github.getUser($scope.inputName)
      .then(completedUser, error);

  }

  app.controller("mainCtrl", mainCtrl);
  app.controller("userCtrl", userCtrl)


}());
