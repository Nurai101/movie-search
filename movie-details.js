const singleMovieEl = document.getElementById('single-movie');
const path = "./film.json";
const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get('id');

function getMovieById(movieID) {
  fetch(path)
    .then(res => res.json())
    .then(data => {
      const movie = data.find(m => m.id === parseInt(movieID));
      if (movie) {
        displayMovieDetails(movie);
      } else {
        singleMovieEl.innerHTML = '<h2>Фильм не найден</h2>';
      }
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
      singleMovieEl.innerHTML = '<h2>Ошибка загрузки данных фильма</h2>'; 
    });
}

function displayMovieDetails(movie) {
  singleMovieEl.innerHTML = `
    <div class="single-movie">
      <h1>${movie.title}</h1>
      <img src="${movie.image_url}" alt="${movie.title}" />
      <div class="single-movie-info">
        <p>Автор: ${movie.author}</p>
        <p>Жанр: ${movie.genre}</p>
        <p>Год: ${movie.year}</p>
      </div>
      <div class="main">
        <p>${movie.description}</p>
      </div>
    </div>
  `;
}