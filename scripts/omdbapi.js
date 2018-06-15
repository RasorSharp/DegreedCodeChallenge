(function () {
    var omdbapi = function ($http, $q) {
        function Movie() {
            this.Title = '';
            this.Rated = '';
            this.Poster = '';
            this.ID = '';
            this.Year = '';
            this.Runtime = '';
            this.Released = '';
            this.Plot = '';
        }

        var searchMovies = function (movieName) {
            return $http.get("http://www.omdbapi.com/?apikey=b64b7a7e&s=" + movieName)
                .then(function (response) {
                    var decades = [];
                    var movieList = response.data.Search.map(function (obj) {
                        var movie = new Movie();
                        movie.ID = obj.imdbID;
                        movie.Poster = obj.Poster.split('/')[5];
                        movie.Title = obj.Title;
                        movie.ImdbURL = 'https://www.imdb.com/title/' + movie.ID;

                        var decade = obj.Year.substr(0, 3) + '0';
                        if($.inArray(decade, decades) === -1) decades.push(decade);

                        return movie;
                    });
                    getDetailsForMovies(movieList);
                    return { movieList: movieList, decades: decades.sort() };
                })
        }

        var getDetailsForMovies = function (movies) {
            for (var i = 0; i < movies.length; i++) {
                (function (m) {
                    $http.get('http://www.omdbapi.com/?apikey=b64b7a7e&i=' + movies[i].ID)
                        .then(function (response) {
                            m.Rated = response.data.Rated;
                            m.Year = response.data.Year;
                            m.Runtime = response.data.Runtime;
                            m.Released = response.data.Released;
                            m.Plot = response.data.Plot;
                        });
                })(movies[i]);
            }
        }

        return {
            searchMovies: searchMovies
        }
    };

    var module = angular.module("dgMovieApp");
    module.factory('omdbapi', omdbapi);
}());