function searchMovies() {
    const searchText = document.getElementById('searchText').value.trim();
    if (!searchText) return alert("Please enter a movie name.");
  
    const apiKey = '5657bf65';
    const searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchText)}`;
  
    axios.get(searchUrl)
      .then(res => {
        if (res.data.Response === "False") throw new Error(res.data.Error);
        return Promise.all(res.data.Search.map(movie => 
          axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`)));
      })
      .then(details => {
        document.getElementById('result').innerHTML = details.map(detail => {
          const m = detail.data;
          return `
            <div class="movie">
              <img src="${m.Poster}" alt="${m.Title}" onerror="this.style.display='none'"/>
              <div class="movie-details">
                <h2>${m.Title} (${m.Year})</h2>
                <p><strong>Plot:</strong> ${m.Plot}</p>
              </div>
            </div>`;
        }).join('');
      })
      .catch(err => {
        document.getElementById('result').innerHTML = `<p>${err.message || "Error fetching data."}</p>`;
      });
  }
  