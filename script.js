(function () {
  var app = angular.module("githubViewer", []);

  var controllerCallBack = function ($scope, $interval, $log, $location, $anchorScroll, github) {
    var countdownInterval = null;
    $scope.username = "angular";
    $scope.title = "GitHub Viewer";
    $scope.sortOrder = "-stargazers_count"
    $scope.countdown = 5;

    var onReposComplete = function(data){
      $scope.error = null;
      $scope.repos = data;
      $location.hash("userDetails");
      $anchorScroll();
    };

    var onUserComplete = function (data) {
      $scope.error = null;
      $scope.user = data;
      github.getRepos(data)
        .then(onReposComplete, onError);
    };

    var onError = function (reason) {
      $scope.error = "Could not fetch data";
    };

    var reduceCountDown = function(){
      $scope.countdown--;
      if($scope.countdown==0){
        $scope.search();
      }
    }

    var startCountdown = function(){
      countdownInterval = $interval(reduceCountDown, 1000, $scope.countdown);
    }

    $scope.search = function () {
      $log.info("searching for " + $scope.username);
      $interval.cancel(countdownInterval);
      $scope.countdown = null;
      github.getUser($scope.username)
        .then(onUserComplete, onError);
    }

    startCountdown();
  };

  app.controller("MainController", controllerCallBack);
}());