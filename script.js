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

    var decrementCountdown = () => {
      $scope.countdown -= 1;
      if($scope.countdown < 1) {
        $scope.search($scope.inputName);
      }
    }

    var countdownInterval = null;


    var startCountdown = () => {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    }

    $scope.search = (inputName) => {
      $http.get("https://api.github.com/users/"+inputName)
        .then(completedUser, error);
      if(countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    }


    $scope.countdown = 5;
    startCountdown();


  }

  app.controller("mainCtrl", ["$scope", "$http", "$interval", mainCtrl])


}());
