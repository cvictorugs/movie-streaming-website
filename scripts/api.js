const movieApiKey = "bb62839"; // Your OMDb API key
const movieTitle = "The Mandalorian"; // Change this to any movie you want

async function fetchMoviePoster() {
  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${movieApiKey}`);
    const data = await response.json();
    console.log(data)
    
    if (data.Poster) {
      // const highResPoster = data.Poster.rep0lace("SX300", "SX1080");
      const movieSlideshow = document.getElementById("movie-slideshow");
      // const movieSlideshow = document.getElementById("container");
      
      movieSlideshow.style.backgroundImage = `url(${data.Poster})`;
      //movieSlideshow.style.backgroundSize = "cover"; // Adjust styling as needed
    } else {
      console.error("No poster found for this movie.");
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}
fetchMoviePoster();
// api key from TMDB movies
const apiKey = "954e12387f34cb6be91a892fc28498d8";

// handles the company logos
const companyIds = [213, 2, 3268, 1, 3, 7521, 420, 25, 20580, 4, 34, 33, 174]; // Add more IDs as needed

companyIds.forEach(companyId => {
  fetch(`https://api.themoviedb.org/3/company/${companyId}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.logo_path) {
        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/original${data.logo_path}`;
        img.alt = data.name;
        img.style.width = "100px"; // Adjust size
        img.style.margin = "10px"; // Add spacing
        document.getElementById("logos").appendChild(img);
      }
    })
    .catch(error => console.error("Error fetching company logo:", error));
});

// handles the continue watching section
const continueWatchingMovieTitles = ["Guardians of the Galaxy", "The Last of Us", "Godzilla","Batman",
  "Men in Black","Stranger Things","Fear Street"/*,"Deadpool","Wednesday"*/]; // Add more movies here

continueWatchingMovieTitles.forEach(title => {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const movie = data.results[0]; // Get the first result
        const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

        // Create an image element and append it to the div
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = movie.title;
        img.style.width = "200px"; // Adjust size
        img.style.margin = "10px";

        document.getElementById("continue-watching").appendChild(img);
      } else {
        console.log(`Movie not found: ${title}`);
      }
    })
    .catch(error => console.error("Error fetching movie:", error));
});

// handles the popular movies for the week
// const popularMovies = "954e12387f34cb6be91a892fc28498d8";
// const popularMoviesIds = [213, 2, 3268, 1, 3, 7521, 420, 25, 20580, 4, 34, 33, 174]; // Add more IDs as needed

// popularMoviesIds.forEach(popularMoviesId => {
//   fetch(`https://api.themoviedb.org/3/company/${popularMoviesId}?api_key=${popularMovies}`)
//     .then(response => response.json())
//     .then(data => {
//       if (data.Poster) {
//         console.log(data)
//         const img = document.createElement("img");
//         img.src = `https://image.tmdb.org/t/p/original${data.Poster}`;
//         img.alt = data.name;
//         img.style.width = "100px"; // Adjust size
//         img.style.margin = "10px"; // Add spacing
//         document.getElementById("popular-movies").appendChild(img);
//       }
//     })
//     .catch(error => console.error("Error fetching company logo:", error));
// });
// const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
const popularMoviesIds = [118340, 100088, 315162]; // Example movie IDs (Guardians, Last of Us, Godzilla)

popularMoviesIds.forEach(movieId => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.poster_path) {
        console.log(data); // Check response in console

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/original${data.poster_path}`;
        img.alt = data.title;
        img.style.width = "80px"; // Adjust size
        img.style.margin = "10px";

        document.getElementById("popular-movies").appendChild(img);
      }
    })
    .catch(error => console.error("Error fetching movie poster:", error));
});

// recent releases
const recentReleases = []

fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
  .then(response => response.json())
  .then(data => {
    const moviesContainer = document.getElementById("recent-releases");

    data.results.forEach(movie => {
      if (movie.poster_path) {
        const movieCard = document.createElement("div");
        movieCard.style.border = "1px solid #ccc";
        // movieCard.style.padding = "10px";
        movieCard.style.margin = "10px";
        // movieCard.style.width = "200px";
        // movieCard.style.width = "100%";
        movieCard.style.borderRadius = "8px";
        movieCard.style.backgroundColor = "#f9f9f9";
        // movieCard.style.textAlign = "center";

        // Movie Poster
        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;
        img.style.width = "100%";
        img.style.borderRadius = "5px";

        // Movie Title
        const title = document.createElement("h4");
        title.innerText = movie.title;

        // Movie Rating
        const rating = document.createElement("p");
        rating.innerText = `⭐ Rating: ${movie.vote_average.toFixed(1)}`;

        // Movie Release Date
        const releaseDate = document.createElement("p");
        releaseDate.innerText = `📅 Release: ${movie.release_date}`;

        // Append elements to card
        movieCard.appendChild(img);
        movieCard.appendChild(title);
        movieCard.appendChild(rating);
        movieCard.appendChild(releaseDate);

        // Append movie card to container
        moviesContainer.appendChild(movieCard);
      }
    });
  })
  .catch(error => console.error("Error fetching recent movies:", error));


// fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
//   .then(response => response.json())
//   .then(data => {
//     const moviesContainer = document.getElementById("recent-releases");

//     data.results.forEach(movie => {
//       if (movie.poster_path) {
//         const img = document.createElement("img");
//         img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Use w500 for optimized loading
//         img.alt = movie.title;
//         img.style.width = "150px";
//         img.style.margin = "10px";

//         moviesContainer.appendChild(img);
//       }
//     });
//   })
//   .catch(error => console.error("Error fetching recent movies:", error));
// ;



// const apiKey = "bb62839"; // Your OMDb API key
// const movieTitle = "The Mandalorian"; // Change this to any movie you want

// fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`)
//   .then(response => response.json())
//   .then(data => {
//     if (data.Poster) {
//         document.getElementById("movie-slideshow").style.backgroundImage = `url(${data.Poster})`;
//         document.getElementById("movie-slideshow").style.backgroundSize = "cover"; // Adjust styling as needed
//     //   document.body.style.backgroundImage = `url(${data.Poster})`;
//     //   document.body.style.backgroundSize = "cover"; // Adjust styling as needed
//     //   document.body.style.backgroundPosition = "center";
//     } else {
//       console.error("No poster found for this movie.");
//     }
//   })
//   .catch(error => console.error("Error fetching movie data:", error));
