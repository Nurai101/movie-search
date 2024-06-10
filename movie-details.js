const singleMovieEl = document.getElementById('single-movie');
const path = "./film.json";
const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get('id');


