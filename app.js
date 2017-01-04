(function() {

  var app = angular.module("myApp", ["ngRoute"]);

  app.config(($routeProvider) => {
    $routeProvider
      .when("/main", {
        templateUrl: "main.html",
        controller: "mainCtrl"
      })
      .when("/user/:username", {
        templateUrl: "user.html",
        controller: "userCtrl"
      })
      .otherwise({redirectTo: "/main"})
  })

}())
