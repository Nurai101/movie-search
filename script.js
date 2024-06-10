const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  moviesEl = document.getElementById('movies'),
  resultHeading = document.getElementById('result-heading'),
  single_movieEl = document.getElementById('single-movie');

const path = "./film.json";

fetch(path)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });









