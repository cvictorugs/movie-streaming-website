const apiKey = "bb62839"; // Your OMDb API key
const movieTitle = "The Mandalorian"; // Change this to any movie you want

async function fetchMoviePoster() {
  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`);
    const data = await response.json();
    console.log(data)
    
    if (data.Poster) {
      // const highResPoster = data.Poster.rep0lace("SX300", "SX1080");
      const movieSlideshow = document.getElementById("movie-slideshow");
      movieSlideshow.style.backgroundImage = `url(${data.Poster})`;
      // movieSlideshow.style.backgroundSize = "cover"; // Adjust styling as needed
    } else {
      console.error("No poster found for this movie.");
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}

fetchMoviePoster();


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
