document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieID = urlParams.get("id"); // Get movie ID from URL

    if (!movieID) {
        document.getElementById("movie-details").innerHTML = "<p>Movie not found.</p>";
        return;
    }

    const apiKey = '5657bf65';
    const movieUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}&plot=full`;

    axios.get(movieUrl)
        .then(function (response) {
            if (response.data.Response === "False") {
                document.getElementById("movie-details").innerHTML = `<p>${response.data.Error}</p>`;
                return;
            }

            const movie = response.data;
            document.getElementById("movie-details").innerHTML = `
                <h1>${movie.Title} (${movie.Year})</h1>
                <img src="${movie.Poster}" alt="Movie Poster" />
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <p><strong>IMDB Rating:</strong> ⭐⭐⭐ ${movie.imdbRating}/10</p>
                <h2>Cast</h2>
                <div id="cast-list">Loading...</div>
                <h2><button><a href"#">Watch Now</a></button></h2>
                <div id="trailer"></div>
            `;

            fetchTrailer(movie.Title);
        })
        .catch(function (error) {
            console.error("Error fetching movie details:", error);
            document.getElementById("movie-details").innerHTML = `<p>Error loading details.</p>`;
        });
});

// Fetch movie trailer from YouTube
function fetchTrailer(movieTitle) {
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieTitle + " trailer")}&type=video&key=YOUR_YOUTUBE_API_KEY`;

    axios.get(youtubeUrl)
        .then(function (response) {
            if (response.data.items.length > 0) {
                const videoId = response.data.items[0].id.videoId;
                document.getElementById("trailer").innerHTML = `
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                `;
            } else {
                document.getElementById("trailer").innerHTML = "<p>Trailer not available.</p>";
            }
        })
        .catch(function (error) {
            console.error("Error fetching trailer:", error);
        });
}
