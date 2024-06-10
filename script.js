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







