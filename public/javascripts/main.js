'use strict';

var app = angular.module('musicMashup', []);

app.controller('searchArtistCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.searchArtist = function() {
    $http
      .get('/api/search/' + encodeURIComponent($scope.searchQuery), {
        cache: true
      })
      .then(function success(res) {
        $scope.results = res.data.matches;
      }, function error(err) {
        $scope.error = 'An error has occurred, please try again later.';
        console.error(err);
      });
  };
}]);
