(function () {
    var app = angular.module('dgMovieApp');

    var MovieController = function ($scope, omdbapi) {
        $scope.selectedDecade = null;  //keep track of which decade the user has selected. default to null.

        $scope.setDecade = function (decade) {
            if (decade == $scope.selectedDecade) { //user clicked selected decade, reset to null.
                $scope.selectedDecade = null;
            } else { //set new decade
                $scope.selectedDecade = decade;
            }
        }

        $scope.decadeFilter = function (movie) {
            if ($scope.selectedDecade) {
                if (movie.Year.substr(0, 3) + '0' === $scope.selectedDecade) {
                    return true;
                }
                return false;
            }
            return true;
        }

        var onMovies = function (data) {
            $scope.movieList = data.movieList;
            $scope.decades = data.decades;
        }

        var onError = function (reason) {
            $scope.error = 'Error making api call to omdbapi';
            console.log(reason);
        }

        omdbapi.searchMovies('batman').then(onMovies, onError);
    };

    app.controller('MovieController', MovieController);
}());