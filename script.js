(function() {


  var app = angular.module('myApp',[]);

  var mainCtrl = function($scope, github, $interval, $anchorScroll, $location) {
   // $scope.message = "Hello Y'all";

    $scope.inputName = "somtida";

    var completedUser = (data) => {
      $scope.user = data;
      github.getRepos($scope.user)
        .then(completedRepo, error)
    }

    var completedRepo = (data) => {
      $scope.repos = data;
      $location.hash("userDetail");
      $anchorScroll();
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
      github.getUser(inputName)
        .then(completedUser, error);
      if(countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    }

    $scope.dataValue = "+name";
    $scope.countdown = 5;
    startCountdown();




  }

  app.controller("mainCtrl", mainCtrl)


}());
