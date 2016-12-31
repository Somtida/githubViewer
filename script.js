(function() {
  

  var app = angular.module('myApp',[]);
  
  var mainCtrl = function($scope, $http) {
   // $scope.message = "Hello Y'all";
    
    $scope.inputName = "somtida";
    
    var complete = (res) => {
      $scope.user = res.data;
    }
    
    var error = () => {
      $scope.error = "Counld not fetch the user";
    }
   
    $scope.search = () => {
      $http.get("https://api.github.com/users/"+$scope.inputName)
        .then(complete, error);
    }
    
      
    $scope.message = "Hello!"
   
  }
  
  app.controller("mainCtrl", ["$scope", "$http", mainCtrl]) 
  
  
}());