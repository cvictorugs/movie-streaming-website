function searchMovies() {
   const searchText = document.getElementById('searchText').value.trim();
   if (!searchText) {
     alert("Please enter a movie name.");
     return;
   }
    const apiKey = '5657bf65'; // Your OMDb API key
   const searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchText)}`;
    
   // First, fetch search results based on the movie title
   axios.get(searchUrl)
     .then(function(response) {
       if (response.data.Response === "False") {
         document.getElementById('result').innerHTML = `<p>${response.data.Error}</p>`;
        return;
      }
              const movies = response.data.Search;
      document.getElementById('result').innerHTML = "";    
       // Create an array of promises to fetch detailed data for each movie
       const detailPromises = movies.map(movie => {
         const detailUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`;
         return axios.get(detailUrl);
       });   
      // Once all details are fetched, display the data
      Promise.all(detailPromises)
        .then(function(detailResponses) {
          let html = '';
          detailResponses.forEach(detailResponse => {
            const movieDetail = detailResponse.data;
            html += `
              <div class="movie">
                <img src="${movieDetail.Poster}" alt="Poster for ${movieDetail.Title}" onerror="this.style.display='none'"/>
                <div class="movie-details">
                  <h2>${movieDetail.Title} (${movieDetail.Year})</h2>
                  <p><strong>Plot:</strong> ${movieDetail.Plot}</p>
                </div>
              </div>
             `;
           });
           document.getElementById('result').innerHTML = html;
         })
         .catch(function(error) {
           console.error("Error fetching movie details:", error);
           document.getElementById('result').innerHTML = `<p>Error fetching movie details. Please try again later.</p>`;
         });
        })
        .catch(function(error) {
        console.error("Error fetching search results:", error);
        document.getElementById('result').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
     });
 }
let openbar = document.getElementById("opennav");
let closebar = document.getElementById("closenav");
let container = document.getElementById("navcontent");

openbar.addEventListener("click", function() {
    container.style.display = "block";
    container.style.transition = "5s";
});
closebar.addEventListener("click", function() {
    container.style.display = "none";
});
