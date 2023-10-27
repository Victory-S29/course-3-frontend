document.addEventListener('DOMContentLoaded', function () {
    const films = [
        {
            id: 1,
            title: "Oppenheimer",
            year: 2022,
            duration: "180m",
            genres: ["Action"],
            countries: ["USA", "UK"],
            posterUrl: "../imgs/film.png"
        },
        {
            id: 2,
            title: "Film 2",
            year: 2021,
            duration: "150m",
            genres: ["Comedy", "Romance"],
            countries: ["France", "Germany"],
            posterUrl: "../imgs/film.png"
        },
        {
            id: 3,
            title: "Film 3",
            year: 2022,
            duration: "140m",
            genres: ["Science fiction", "Romance"],
            countries: ["Ukraine", "Netherlands"],
            posterUrl: "../imgs/film.png"
        }
    ];

    const filmContainer = document.querySelector('.content-section');

    // Функція для створення HTML-елемента фільму на основі отриманих даних
    function createFilmElement(film) {
        const filmElement = document.createElement('a');
        filmElement.className = 'content-section--film-element';
        filmElement.href = `./filmPage.html?id=${film.id}`;

        filmElement.setAttribute('data-genres', film.genres.join(','));
        filmElement.setAttribute('data-year', film.year);
        filmElement.setAttribute('data-countries', film.countries.join(','));

        filmElement.innerHTML = `
            <img class="film-element--img" src="${film.posterUrl}" alt="Film poster">
            <div class="film-element--name">${film.title}</div>
            <div class="film-element--characteristics">
                <p class="film-characteristics--year">${film.year}</p>
                <p class="film-characteristics--time">${film.duration}</p>
            </div>
        `;

        return filmElement;
    }

    function displayFilms(films) {
        filmContainer.innerHTML = '';
        films.forEach(film => {
            const filmElement = createFilmElement(film);
            filmContainer.appendChild(filmElement); // Додаємо елемент на сторінку
        });
    }

    displayFilms(films);

    //==============================================================

    function showFilteredFilms() {
        const selectedGenres = Array.from(document.querySelectorAll('input[name="genre-section"]:checked'))
            .map(input => {
                const genreWithoutPrefix = input.value.replace('genre-', '');
                return genreWithoutPrefix.charAt(0).toUpperCase() + genreWithoutPrefix.slice(1);
            });

        const selectedYear = document.querySelector('input[name="year-section"]:checked')
            ? document.querySelector('input[name="year-section"]:checked').value.replace('year-', '') : null;

        const selectedCountries = Array.from(document.querySelectorAll('input[name="country-section"]:checked'))
            .map(input => {
                const countryWithoutPrefix = input.value.replace('country-', '');
                return countryWithoutPrefix.charAt(0).toUpperCase() + countryWithoutPrefix.slice(1);
            });

        console.log("selectedGenres", selectedGenres);
        console.log("selectedYear", selectedYear);
        console.log("selectedCountries", selectedCountries);

        const filteredFilms = films.filter(film => {
            const hasSelectedGenres = selectedGenres.every(genre => film.genres.includes(genre));
            const hasSelectedYear = !selectedYear || film.year.toString() === selectedYear;
            const hasSelectedCountries = selectedCountries.every(country => film.countries.includes(country));
            return hasSelectedGenres && hasSelectedYear && hasSelectedCountries;
        });

        filmContainer.innerHTML = '';

        filteredFilms.forEach(film => {
            const filmElement = createFilmElement(film);
            filmContainer.appendChild(filmElement);
        });
    }

    const checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', showFilteredFilms);
    });

    showFilteredFilms();

    //==============================================================
    
    const searchInput = document.getElementById('film-search-input');
    const searchButton = document.querySelector('.film-search-btn');

    searchButton.addEventListener('click', function () {
        const searchValue = searchInput.value.toLowerCase();
        console.log("searchValue", searchValue);
        const filteredFilms = films.filter(film => film.title.toLowerCase().includes(searchValue));
        displayFilms(filteredFilms);
    });
});