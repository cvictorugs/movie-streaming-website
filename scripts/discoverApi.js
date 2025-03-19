let userSearch = [];

document.getElementById('search-bar').addEventListener('keydown', async (event) => {
    if (event.key.length === 1 || event.key === "Backspace") {
        if (event.key === "Backspace") {
            userSearch.pop(); // Remove last character
        } else {
            userSearch.push(event.key); // Add new character
        }

        let query = userSearch.join("").trim(); // Convert array to string

        if (query.length > 2) { // Fetch movies after 3 characters
            fetchMovies(query);
        }
    }
});

// Fetch movies from OMDB API
async function fetchMovies(query) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=bb62839`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            document.getElementById('movie-list').innerHTML = "<p>No movies found.</p>";
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Display movies in the HTML
function displayMovies(movies) {
    document.querySelector('.ssb').style.display = 'none';
    const movieList = document.getElementById('movie-list');
    movieList.classList.add('movie-list');
    movieList.innerHTML = ""; // Clear previous results

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        movieList.appendChild(movieCard);
    });
}