const movieApiKey = "bb62839"; // Your OMDb API key
const movieTitle = "The Mandalorian"; // Change this to any movie you want

async function fetchMoviePoster() {
  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${movieApiKey}`);
    const data = await response.json();
    
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
const tmdbApiKey = "954e12387f34cb6be91a892fc28498d8";

// handles the company logos
const companyIds = [213, 2, 3268, 1, 3, 7521, 420, 25, 20580, 4, 34, 33, 174]; // Add more IDs as needed

companyIds.forEach(companyId => {
  fetch(`https://api.themoviedb.org/3/company/${companyId}?api_key=${tmdbApiKey}`)
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
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(title)}`)
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
// const tmdbApiKey = "YOUR_API_KEY"; // Replace with your actual API key
const popularMoviesIds = [118340, 100088, 315162]; // Example movie IDs (Guardians, Last of Us, Godzilla)

popularMoviesIds.forEach(movieId => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
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
fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}&language=en-US&page=1`)
  .then(response => response.json())
  .then(data => {
    const moviesContainer = document.getElementById("recent-movies");

    data.results.forEach(movie => {
      if (movie.poster_path) {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-card"); // Add styling class

        movieDiv.innerHTML = `
          <div class="movie-info">
            <p><strong>${movie.title}</strong></p>
            <p>⭐${movie.vote_average}</p>
            <p>${movie.genre_ids.map(getGenreName).join(", ")}</p>
          </div>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        `;

        moviesContainer.appendChild(movieDiv);
      }
    });
  })
  .catch(error => console.error("Error fetching recent movies:", error));

// converts genre IDs into genre names
function getGenreName(genreId) {
  const genres = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 18: "Drama", 14: "Fantasy", 27: "Horror",
    9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 53: "Thriller"
  };
  return genres[genreId] || "Unknown";
}


// user watch list and likes by fetching session id
// const guestSessionId = "d136fefeaa6911b8780ec034d3a6825d";//changes every 24hours, Replace with your guest session ID


// Fetch Liked (Rated) Movies



// let guestSessionId = localStorage.getItem("guestSessionId");

// // ✅ Step 1: Create a guest session (if not already created)
// async function createGuestSession() {
//   if (!guestSessionId) {
//     const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${tmdbApiKey}`);
//     const data = await response.json();
//     guestSessionId = data.guest_session_id;
//     localStorage.setItem("guestSessionId", guestSessionId);
//     console.log("New Guest Session Created:", guestSessionId);
//   } else {
//     console.log("Existing Guest Session:", guestSessionId);
//   }
// }

// // ✅ Step 2: Rate a movie (this is just an example, you can call this function manually)
// async function rateMovie(movieId, rating) {
//   const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${tmdbApiKey}&guest_session_id=${guestSessionId}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ value: rating }) // Rating should be between 0.5 and 10
//   });
//   const data = await response.json();
//   console.log(`Rated movie ${movieId} with ${rating} stars:`, data);
// }

// // ✅ Step 3: Fetch and display liked movies
// async function fetchLikedMovies() {
//   const response = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${tmdbApiKey}`);
//   const data = await response.json();

//   console.log("Liked Movies Response:", data);

//   if (data.results && data.results.length > 0) {
//     displayMovies(data.results);
//   } else {
//     document.getElementById("liked-movies").innerHTML = "<p>No liked movies found.</p>";
//   }
// }

// // ✅ Step 4: Display movies in the HTML
// function displayMovies(movies) {
//   const container = document.getElementById("liked-movies");
//   container.innerHTML = ""; // Clear previous content

//   movies.forEach(movie => {
//     const movieCard = document.createElement("div");
//     movieCard.classList.add("movie-card");

//     const title = document.createElement("h3");
//     title.innerText = movie.title;

//     const rating = document.createElement("p");
//     rating.innerText = `⭐ ${movie.vote_average}`;

//     const img = document.createElement("img");
//     img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//     img.alt = movie.title;

//     movieCard.appendChild(title);
//     movieCard.appendChild(rating);
//     movieCard.appendChild(img);

//     container.appendChild(movieCard);
//   });
// }

// // ✅ Step 5: Run everything
// (async function main() {
//   await createGuestSession(); // Step 1: Make sure we have a guest session
//   await fetchLikedMovies(); // Step 3: Fetch liked movies
// })();

// Example: To rate a movie, open the console and type:
// rateMovie(550, 8.5); // (Movie ID 550 = Fight Club, with a rating of 8.5)


// let guestSessionId = localStorage.getItem("guestSessionId");

// // ✅ Step 1: Create a guest session if it doesn’t exist
// async function createGuestSession() {
//   if (!guestSessionId) {
//     const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${tmdbApiKey}`);
//     const data = await response.json();
//     guestSessionId = data.guest_session_id;
//     localStorage.setItem("guestSessionId", guestSessionId);
//     console.log("New Guest Session ID:", guestSessionId);
//   }
// }

// // ✅ Step 2: Rate multiple movies (so we have liked movies)
// async function rateMovies() {
//   const movieIds = [550, 299534, 157336, 675]; // Replace with real movie IDs

//   for (const movieId of movieIds) {
//     await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${tmdbApiKey}&guest_session_id=${guestSessionId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ value: 8 }) // Change rating (0.5 - 10)
//     });
//     console.log(`Rated movie ${movieId}`);
//   }
// }

// // ✅ Step 3: Fetch ALL liked movies (handles pagination)
// async function fetchAllLikedMovies(page = 1) {
//   const response = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${tmdbApiKey}&language=en-US&page=${page}`);
//   const data = await response.json();

//   if (data.results && data.results.length > 0) {
//     displayMovies(data.results, "liked-movies");

//     // Fetch next page if available
//     if (data.page < data.total_pages) {
//       await fetchAllLikedMovies(page + 1);
//     }
//   } else {
//     document.getElementById("liked-movies").innerHTML = "<p>No liked movies found.</p>";
//   }
// }

// // ✅ Step 4: Display movies in HTML
// function displayMovies(movies, containerId) {
//   const container = document.getElementById(containerId);
//   container.innerHTML = ""; // Clear previous content

//   movies.forEach(movie => {
//     const movieCard = document.createElement("div");
//     movieCard.classList.add("movie-card");

//     const title = document.createElement("h3");
//     title.innerText = movie.title;

//     const rating = document.createElement("p");
//     rating.innerText = `⭐ ${movie.vote_average}`;

//     const img = document.createElement("img");
//     img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//     img.alt = movie.title;

//     movieCard.appendChild(title);
//     movieCard.appendChild(rating);
//     movieCard.appendChild(img);

//     container.appendChild(movieCard);
//   });
// }

// // ✅ Step 5: Run everything
// (async function main() {
//   await createGuestSession();  // Ensure we have a guest session
//   await rateMovies();          // Rate some movies (for testing)
//   await fetchAllLikedMovies(); // Fetch & display liked movies
// })();


// function fetchAllLikedMovies(page = 1) {
//   fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${tmdbApiKey}&language=en-US&page=${page}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(`Page ${page} Response:`, data);
//       if (data.results && data.results.length > 0) {
//         displayMovies(data.results, "liked-movies");

//         // Fetch next page if available
//         if (data.page < data.total_pages) {
//           fetchAllLikedMovies(page + 1);
//         }
//       } else {
//         document.getElementById("liked-movies").innerHTML = "<p>No liked movies found.</p>";
//       }
//     })
//     .catch(error => console.error("Error fetching liked movies:", error));
// }

// fetchAllLikedMovies(); // Start fetching from page 1


// fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${tmdbApiKey}&language=en-US&page=1`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//     console.log("Full Response:", data); // Log the entire response
//     if (data.results && data.results.length > 0) {
//       displayMovies(data.results, "liked-movies");
//     } else {
//       document.getElementById("liked-movies").innerHTML = "<p>No liked movies found.</p>";
//     }
//   })
//   .catch(error => console.error("Error fetching liked movies:", error));

// function displayMovies(movies, likedMovies) {
//     const container = document.getElementById(likedMovies);
//     container.innerHTML = ""; // Clear previous content
  
//     movies.forEach(movie => {
//       const movieCard = document.createElement("div");
//       movieCard.classList.add("movie-card");
  
//       const title = document.createElement("h3");
//       title.innerText = movie.title;
  
//       const rating = document.createElement("p");
//       rating.innerText = `⭐ ${movie.vote_average}`;
  
//       const img = document.createElement("img");
//       img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//       img.alt = movie.title;
  
//       movieCard.appendChild(img);
//       movieCard.appendChild(title);
//       movieCard.appendChild(rating);
  
//       container.appendChild(movieCard);
//     });
// }
  

// fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=1`)
//   .then(response => response.json())
//   .then(data => {
//     console.log("Full Response:", data); // Log the entire response
//     if (data.results && data.results.length > 0) {
//       displayMovies(data.results, "liked-movies");
//     } else {
//       document.getElementById("liked-movies").innerHTML = "<p>No liked movies found.</p>";
//     }
//   })
//   .catch(error => console.error("Error fetching liked movies:", error));


// fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${tmdbApiKey}&language=en-US&page=1`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//     console.log("Liked Movies:", data.results);
//     displayMovies(data.results, "liked-movies"); // Insert movies into HTML
//   })
//   .catch(error => console.error("Error fetching liked movies:", error));

// Displays Movies in Target ID


// fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}&language=en-US&page=1`)
//   .then(response => response.json())
//   .then(data => {
//     const moviesContainer = document.getElementById("recent-movies");

//     data.results.forEach(movie => {
//       if (movie.poster_path) {
//         const movieDiv = document.createElement("div");
//         movieDiv.setAttribute('class','movie')
//         movieDiv.innerHTML = `
//           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" style="width:150px; margin:10px;">
//           <p><strong>${movie.title}</strong> (${movie.release_date})</p>
//           <p>⭐${movie.vote_average}</p>
//           <p>${movie.genre_ids.map(getGenreName).join(", ")}</p>
//         `;
//         moviesContainer.appendChild(movieDiv);
//       }
//     });
//   })
//   .catch(error => console.error("Error fetching recent movies:", error));

// // Function to convert genre IDs into genre names
// function getGenreName(genreId) {
//   const genres = {
//     28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
//     80: "Crime", 18: "Drama", 14: "Fantasy", 27: "Horror",
//     9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 53: "Thriller"
//   };
//   return genres[genreId] || /*"Unknown"*/"movie";
// }


// fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`)
//   .then(response => response.json())
//   .then(data => {
//     if (data.results.length > 0) {
//       const movie = data.results[0]; // Fetch the first movie in the list

//       const movieContainer = document.getElementById("recent-releases");
//       movieContainer.innerHTML = `
//         <h3>${movie.title} (${movie.release_date})</h3>
//         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" style="width:150px; margin:10px;">
//         <p>⭐ Rating: ${movie.vote_average}</p>
//         <p>🎭 Genre(s): ${movie.genre_ids.map(getGenreName).join(", ")}</p>
//       `;
//     }
//   })
//   .catch(error => console.error("Error fetching movie:", error));

// // Function to convert genre IDs into genre names
// function getGenreName(genreId) {
//   const genres = {
//     28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
//     80: "Crime", 18: "Drama", 14: "Fantasy", 27: "Horror",
//     9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 53: "Thriller"
//   };
//   return genres[genreId] || "Unknown";
// }


//const recentReleases = []

// fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}&language=en-US&page=1`)
//   .then(response => response.json())
//   .then(data => {
//     const moviesContainer = document.getElementById("recent-releases");
//     console.log(data)
//     data.results.forEach(movie => {
//       if (movie.poster_path) {
//         const movieCard = document.createElement("div");
//         movieCard.setAttribute('class','recent-movies-cards');

//         // Movie Poster
//         const img = document.createElement("img");
//         img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//         img.alt = movie.title;

//         // Movie Title
//         const title = document.createElement("h4");
//         title.innerText = movie.title;

//         // Movie Rating
//         const rating = document.createElement("p");
//         rating.innerText = `⭐ Rating: ${movie.vote_average.toFixed(1)} |`;

//         // Movie Release Date
//         const releaseDate = document.createElement("p");
//         releaseDate.innerText = `📅 Release: ${movie.release_date}`;

//         // Append elements to card
//         movieCard.appendChild(img);
//         movieCard.appendChild(title);
//         movieCard.appendChild(rating);
//         movieCard.appendChild(releaseDate);

//         // Append movie card to container
//         moviesContainer.appendChild(movieCard);
//       }
//     });
//   })
//   .catch(error => console.error("Error fetching recent movies:", error));
// ;



// fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}&language=en-US&page=1`)
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



// const tmdbApiKey = "bb62839"; // Your OMDb API key
// const movieTitle = "The Mandalorian"; // Change this to any movie you want

// fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apiKey=${tmdbApiKey}`)
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
