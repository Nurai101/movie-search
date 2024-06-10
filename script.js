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

function searchMovies(e) {
  e.preventDefault();
  single_movieEl.innerHTML = '';
  const term = search.value;
  if (term.trim()) {
    fetch(path)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Результаты поиска для '${term}':</h2>`;

        const filteredMovies = data.filter(movie =>
          movie.title.toLowerCase().includes(term.toLowerCase())
        );

        if (filteredMovies.length === 0) {
          resultHeading.innerHTML = `<p>Нет результатов. Попробуйте снова!</p>`;
        } else {
          moviesEl.innerHTML = filteredMovies
            .map(
              movie => `
            <div class="movie">
              <img src="${movie.image_url}" alt="${movie.title}" />
              <div class="movie-info" data-movieID="${movie.id}">
                <h3>${movie.title}</h3>
                <p>${movie.author}</p>
              </div>
            </div>
          `
            )
            .join('');
        }
      });
    search.value = '';
  } else {
    alert('Пожалуйста, введите запрос');
  }
}

document.getElementById('all').addEventListener('click', function() {
  displayFilteredMovies('all');
});

document.getElementById('action').addEventListener('click', function() {
  displayFilteredMovies('Экшен');
});

document.getElementById('romance').addEventListener('click', function() {
  displayFilteredMovies('Романтика');
});

document.getElementById('fantasy').addEventListener('click', function() {
  displayFilteredMovies('Фэнтези');
});

function displayFilteredMovies(genre) {
  fetch(path)
    .then(res => res.json())
    .then(data => {
      const filteredMovies = genre === 'all' ? data : data.filter(movie => movie.genre.includes(genre));
      
      if (filteredMovies.length === 0) {
        resultHeading.innerHTML = `<p>Нет результатов для жанра '${genre}'. Попробуйте снова!</p>`;
      } else {
        resultHeading.innerHTML = `<h2>${genre}:</h2>`;
        moviesEl.innerHTML = filteredMovies
          .map(
            movie => `
          <div class="movie">
            <img src="${movie.image_url}" alt="${movie.title}" />
            <div class="movie-info" data-movieID="${movie.id}">
              <h3>${movie.title}</h3>
              <p>${movie.author}</p>
            </div>
          </div>
        `
          )
          .join('');
      }
    });
}

function getMovieById(movieID) {
  fetch(path)
    .then(res => res.json())
    .then(data => {
      const movie = data.find(m => m.id === parseInt(movieID));
      addMovieToDOM(movie);
    });
}

function getRandomMovie() {
  moviesEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(path)
    .then(res => res.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const movie = data[randomIndex];

      addMovieToDOM(movie);
    });
}
