(function () {
  var app = angular.module("githubViewer", []);

  var controllerCallBack = function ($scope, $http) {
    $scope.sortOrder = "-stargazers_count"
    $scope.username = "angular";
    $scope.title = "GitHub Viewer";

    var onReposComplete = function(response){
      $scope.error = null;
      $scope.repos = response.data;
    };

    var onUserComplete = function (response) {
      $scope.error = null;
      $scope.user = response.data;
      $http.get(response.data.repos_url)
        .then(onReposComplete, onError);
    };

    var onError = function (reason) {
      $scope.error = "Could not fetch data";
    };

    $scope.search = function (username) {
      $http.get("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
    }
  };

  app.controller("MainController", ["$scope", "$http", controllerCallBack]);
}());