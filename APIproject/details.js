function fetchMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    if (!movieId) {
        document.getElementById("movie-details").innerHTML = "<h2>Movie not found.</h2>";
        return;
    }

    const apiKey = '5657bf65'; 
    const detailUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`;

    axios.get(detailUrl)
        .then(response => {
            const movie = response.data;
            document.getElementById("movie-details").innerHTML = `
                <h1>${movie.Title} (${movie.Year})</h1>
                <img src="${movie.Poster}" alt="Poster of ${movie.Title}" />
                <p><strong>IMDb Rating:</strong> ${movie.imdbRating}/10</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Cast:</strong> ${movie.Actors}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
            document.getElementById("movie-details").innerHTML = "<p>Error fetching movie details. Please try again.</p>";
        });
}

function goBack() {
    window.history.back();
}

// Fetch details on page load
fetchMovieDetails();
